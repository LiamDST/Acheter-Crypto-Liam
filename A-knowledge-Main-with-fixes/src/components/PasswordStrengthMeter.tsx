import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthProps) {
  // Check password strength criteria
  const hasLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  // Calculate overall strength
  const strength = [hasLength, hasUppercase, hasNumber, hasSpecial].filter(Boolean).length;
  
  // Determine strength level
  let strengthLevel = 'Faible';
  let strengthColor = 'bg-red-500';
  let strengthWidth = '25%';
  
  if (strength === 4) {
    strengthLevel = 'Fort';
    strengthColor = 'bg-green-500';
    strengthWidth = '100%';
  } else if (strength === 3) {
    strengthLevel = 'Bon';
    strengthColor = 'bg-blue-500';
    strengthWidth = '75%';
  } else if (strength === 2) {
    strengthLevel = 'Moyen';
    strengthColor = 'bg-yellow-500';
    strengthWidth = '50%';
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Force du mot de passe :</span>
        <span className={`text-sm font-medium ${
          strength === 4 ? 'text-green-600' : 
          strength === 3 ? 'text-blue-600' : 
          strength === 2 ? 'text-yellow-600' : 
          'text-red-600'
        }`}>
          {strengthLevel}
        </span>
      </div>
      
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${strengthColor} transition-all duration-300`} 
          style={{ width: strengthWidth }}
        ></div>
      </div>
      
      <ul className="space-y-1">
        <li className="flex items-center text-sm">
          {hasLength ? (
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500 mr-2" />
          )}
          <span className={hasLength ? 'text-green-700' : 'text-gray-600'}>
            Au moins 8 caractères
          </span>
        </li>
        <li className="flex items-center text-sm">
          {hasUppercase ? (
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500 mr-2" />
          )}
          <span className={hasUppercase ? 'text-green-700' : 'text-gray-600'}>
            Au moins une lettre majuscule
          </span>
        </li>
        <li className="flex items-center text-sm">
          {hasNumber ? (
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500 mr-2" />
          )}
          <span className={hasNumber ? 'text-green-700' : 'text-gray-600'}>
            Au moins un chiffre
          </span>
        </li>
        <li className="flex items-center text-sm">
          {hasSpecial ? (
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500 mr-2" />
          )}
          <span className={hasSpecial ? 'text-green-700' : 'text-gray-600'}>
            Au moins un caractère spécial
          </span>
        </li>
      </ul>
    </div>
  );
}