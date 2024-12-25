import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ 
  label,
  className = '', 
  ...props 
}: InputProps) {
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`
          block w-full px-4 
          rounded-lg border border-gray-300 
          shadow-sm
          placeholder:text-gray-400
          focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          disabled:bg-gray-50 disabled:text-gray-500
          transition-colors
          ${className}
        `}
        {...props}
      />
    </div>
  );
}