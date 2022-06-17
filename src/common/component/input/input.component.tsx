import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
}

export const Input = ({ label, icon, ...rest }: InputProps) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const set = () => {
    const type = (ref.current as HTMLInputElement).type === 'password' ? 'text' : 'password';
    (ref.current as HTMLInputElement).type = type;
  };
  return (
    <label className={`input-component${icon ? ' with-icon' : ''}`}>
      <input type="text" {...rest} required ref={ref} />
      <span>{label}</span>
      {icon && <i className={`icon icon-${icon}`} onClick={set} />}
    </label>
  );
};
