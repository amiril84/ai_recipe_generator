import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  isLoading?: boolean;
}

export function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  isLoading,
  disabled,
  ...props 
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400",
    secondary: "bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100"
  };

  return (
    <button
      className={`inline-flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin">⚡</div>
          <span>Generating...</span>
        </div>
      ) : children}
    </button>
  );
}