import React from 'react';

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`inline-block ${className}`}>
      <div
        className={`
          ${sizes[size] || sizes.md}
          border-brand-gray-200 border-t-brand-red rounded-full animate-spin
        `}
      />
    </div>
  );
};

export default Spinner;
