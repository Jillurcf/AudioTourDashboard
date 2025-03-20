import React from 'react';

interface ButtonsProps {
  onClick?: () => void;
  className?: string; // Adding the className prop
  children: React.ReactNode;
}

const Buttons: React.FC<ButtonsProps> = ({ onClick, className, children }) => {
  return (
    <button 
      className={`flex items-center ${className}`} // Apply the className prop here
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Buttons;
