import React from 'react';

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary, danger, outline
  disabled = false,
  className = '',
  icon: Icon = null,
  title = '',
}) => {
  const baseStyles = "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white shadow-sm hover:opacity-95",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    outline: "bg-surface-alt border border-border text-text hover:bg-border",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      title={title}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;