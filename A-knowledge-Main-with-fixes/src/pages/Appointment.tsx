import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, Phone, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import SEOHead from '../components/SEOHead';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  selectedDate: Date | null;
  selectedTime: string | null;
}

const MORNING_SLOTS = ['09:00', '10:00', '11:00'];
const AFTERNOON_SLOTS = ['14:00', '15:00', '16:00', '17:00'];

const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = dimanche, 6 = samedi
};

const isPastDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

const isFridayAfternoon = (date: Date, time: string) => {
  return date.getDay() === 5 && parseInt(time.split(':')[0]) >= 12;
};

const HOLIDAYS_2024 = [
  '2024-01-01', // Jour de l'an
  '2024-04-01', // Lundi de Pâques
  '2024-05-01', // Fête du Travail
  '2024-05-08', // Victoire 1945
  '2024-05-09', // Ascension
  '2024-05-20', // Lundi de Pentecôte
  '2024-07-14', // Fête Nationale
  '2024-08-15', // Assomption
  '2024-11-01', // Toussaint
  '2024-11-11', // Armistice
  '2024-12-25', // Noël
];

const isHoliday = (date: Date) => {
  const dateString = date.toISOString().split('T')[0];
  return HOLIDAYS_2024.includes(dateString);
};

export default function Appointment() {
  const { t, i18n } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    selectedDate: null,
    selectedTime: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phoneCountryCode, setPhoneCountryCode] = useState('+33');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const countryCodes = [
    { code: '+33', country: 'FR' },
    { code: '+32', country: 'BE' },
    { code: '+41', country: 'CH' },
    { code: '+352', country: 'LU' },
    { code: '+1', country: 'US' },
    { code: '+44', country: 'UK' },
    { code: '+972', country: 'IL' },
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);
    const days = [];

    // Adjust for Monday as first day of week
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getTimeSlots = (date: Date) => {
    const slots: TimeSlot[] = [];
    const isFriday = date.getDay() === 5;

    MORNING_SLOTS.forEach(time => {
      slots.push({ time, available: true });
    });

    if (!isFriday) {
      AFTERNOON_SLOTS.forEach(time => {
        slots.push({ time, available: true });
      });
    }

    return slots;
  };

  const handleDateClick = (date: Date) => {
    if (!isWeekend(date) && !isHoliday(date) && !isPastDate(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleTimeClick = (time: string) => {
    if (selectedDate && !isFridayAfternoon(selectedDate, time)) {
      setSelectedTime(time);
      setFormData(prev => ({ ...prev, selectedDate, selectedTime: time }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = t('appointment.validation.firstNameRequired');
    if (!formData.lastName.trim()) newErrors.lastName = t('appointment.validation.lastNameRequired');
    if (!formData.email.trim()) {
      newErrors.email = t('appointment.validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('appointment.validation.emailInvalid');
    }
    if (!formData.phone.trim()) newErrors.phone = t('appointment.validation.phoneRequired');
    if (!selectedDate) newErrors.date = t('appointment.validation.dateRequired');
    if (!selectedTime) newErrors.time = t('appointment.validation.timeRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDateForEmail = (date: Date, locale: string) => {
    return date.toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);

        // Prepare email template parameters
        const templateParams = {
          date: selectedDate ? formatDateForEmail(selectedDate, 'fr-FR') : '',
          time: selectedTime || '',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: phoneCountryCode + formData.phone,
          message: formData.message || 'Aucun message',
          to_name: 'Service Alyah Knowledge',
          to_email: 'contact@alyah-knowledge.com'
        };

        // Send email to admin
        await emailjs.send(
          'service_alyah_knowledge',
          'template_bexcgxk',
          templateParams,
          'E5K2kF3SrUELo6U9C'
        );

        // Send confirmation email to client
        await emailjs.send(
          'service_alyah_knowledge',
          'template_prbe5zd',
          {
            to_email: formData.email,
            to_name: `${formData.firstName} ${formData.lastName}`,
            firstName: formData.firstName,
            date: selectedDate ? formatDateForEmail(selectedDate, i18n.language) : '',
            time: selectedTime || '',
            phone: phoneCountryCode + formData.phone
          },
          'E5K2kF3SrUELo6U9C'
        );

        // Show confirmation message
        setShowConfirmation(true);

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          selectedDate: null,
          selectedTime: null,
        });
        setSelectedDate(null);
        setSelectedTime(null);

        // Hide confirmation after 5 seconds
        setTimeout(() => {
          setShowConfirmation(false);
        }, 5000);
      } catch (error) {
        console.error('Error sending email:', error);
        setErrors(prev => ({
          ...prev,
          submit: t('appointment.validation.submitError')
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Prendre Rendez-vous avec Alyah Knowledge | Conseil Crypto"
        description="Planifiez une session avec nos experts pour bénéficier d’un accompagnement personnalisé en investissement et trading crypto."
        canonicalUrl="https://alyah-knowledge.com/appointment"
      />
      <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Show confirmation message */}
      {showConfirmation && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 flex items-center space-x-4 
            animate-slide-down border border-green-100">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t('appointment.confirmation.title')}</h3>
              <p className="text-gray-600">
                {t('appointment.confirmation.message')}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('appointment.title')}</h1>
          <p className="text-xl text-gray-600">
            {t('appointment.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calendar Section */}
          <div className="group bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110 hover:text-blue-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {currentDate.toLocaleDateString(i18n.language, { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110 hover:text-blue-600"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {t('appointment.calendar.days', { returnObjects: true }).map((day: string) => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 transition-colors duration-300 group-hover:text-blue-600">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 mb-8">
              {generateCalendarDays().map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} className="h-12" />;
                }

                const isSelected = selectedDate?.toDateString() === date.toDateString();
                const isDisabled = isWeekend(date) || isHoliday(date) || isPastDate(date);

                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => handleDateClick(date)}
                    disabled={isDisabled}
                    className={`
                      h-12 rounded-xl flex items-center justify-center text-sm
                      transition-all duration-300 relative transform
                      ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                        isSelected ? 'bg-blue-600 text-white shadow-lg scale-105 hover:bg-blue-700' :
                        'hover:bg-blue-50 hover:text-blue-600 hover:scale-105 text-gray-700'}
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <div className="mt-8 animate-fade-in-up">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {t('appointment.calendar.availableSlots', { 
                    date: selectedDate.toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'fr-FR', { dateStyle: 'long' })
                  })}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {getTimeSlots(selectedDate).map(({ time, available }) => {
                    const isTimeSelected = selectedTime === time;
                    const isDisabled = !available || isFridayAfternoon(selectedDate, time);

                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeClick(time)}
                        disabled={isDisabled}
                        className={`
                          py-2 px-4 rounded-xl text-sm font-medium
                          transition-all duration-300 transform
                          ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                            isTimeSelected ? 'bg-blue-600 text-white shadow-lg scale-105 hover:bg-blue-700' :
                            'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105 hover:shadow-md'}
                        `}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="group bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300 group-hover:text-blue-600">
                    {t('appointment.form.firstName')} {t('appointment.form.required')}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300 group-hover:text-blue-600">
                    {t('appointment.form.lastName')} {t('appointment.form.required')}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300 group-hover:text-blue-600">
                  {t('appointment.form.email')} {t('appointment.form.required')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300 group-hover:text-blue-600">
                  {t('appointment.form.phone')} {t('appointment.form.required')}
                </label>
                <div className="flex gap-2">
                  <select
                    value={phoneCountryCode}
                    onChange={(e) => setPhoneCountryCode(e.target.value)}
                    className="w-[72px] px-2 py-3 rounded-xl border border-gray-300 focus:ring-2 
                      focus:ring-blue-500 focus:border-transparent transition-all duration-300 
                      hover:border-blue-300 text-sm"
                  >
                    {countryCodes.map(({ code, country }) => (
                      <option key={code} value={code} className="text-sm">
                        {country}
                      </option>
                    ))}
                  </select>
                  <div className="flex-1 flex items-center px-3 py-3 rounded-xl border border-gray-300 bg-gray-50 transition-all duration-300 hover:border-blue-300">
                    <span className="text-gray-500 text-sm mr-2">{phoneCountryCode}</span>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`flex-1 bg-transparent focus:outline-none text-sm ${
                        errors.phone ? 'text-red-500' : 'text-gray-900'
                      }`}
                      placeholder={t('appointment.form.phoneNumber')}
                    />
                  </div>
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300 group-hover:text-blue-600">
                  {t('appointment.form.message')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition-all duration-300 
                    hover:border-blue-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-xl font-medium text-white 
                  transition-all duration-300 flex items-center justify-center transform
                  ${loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:-translate-y-1 hover:shadow-xl'
                  } shadow-lg`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    {t('appointment.form.sending')}
                  </>
                ) : (
                  t('appointment.form.confirmAppointment')
                )}
              </button>

              {errors.submit && (
                <p className="mt-2 text-sm text-red-600 text-center">{errors.submit}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}