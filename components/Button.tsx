import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, label }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group px-12 py-4 
        bg-transparent overflow-hidden 
        border border-indigo-300/30 rounded-full
        transition-all duration-500 ease-out
        hover:border-indigo-400/60 hover:shadow-[0_0_30px_rgba(129,140,248,0.2)]
        disabled:opacity-50 disabled:cursor-not-allowed
        z-10
      `}
    >
      {/* Button background fill effect */}
      <div className="absolute inset-0 w-0 bg-indigo-500/10 transition-all duration-[250ms] ease-out group-hover:w-full opacity-0 group-hover:opacity-100" />
      
      <span className={`
        relative font-serif text-lg tracking-[0.2em] uppercase text-indigo-100/80
        group-hover:text-white transition-colors duration-300
        ${disabled ? 'animate-pulse' : ''}
      `}>
        {label}
      </span>
    </button>
  );
};

export default Button;