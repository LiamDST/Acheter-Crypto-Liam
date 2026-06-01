import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function Modal({ isOpen, onClose, children, title, subtitle }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Handle escape key to close
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div 
        ref={modalRef}
        className="relative bg-white rounded-2xl w-full max-w-md mx-4 p-8 shadow-2xl
          transform transition-all duration-300 scale-100 opacity-100
          animate-fade-in-up"
        style={{
          maxHeight: 'calc(100vh - 4rem)',
          overflowY: 'auto'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 
            transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          aria-label={t('modal.closeAria')}
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>

        <div className="text-center mb-8">
          <h2 id="modal-title" className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-gray-600">{subtitle}</p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}