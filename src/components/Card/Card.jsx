import React from 'react';

export const Card = ({
  children,
  title,
  subtitle,
  action = null,
  className = '',
}) => {
  return (
    <div className={`bg-surface border border-border rounded-[22px] p-6 shadow-sm ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
          <div>
            {title && <h3 className="text-sm font-black text-text">{title}</h3>}
            {subtitle && <p className="text-[11px] text-muted mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Card;