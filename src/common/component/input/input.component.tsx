import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  iconLeft?: string;
  iconRight?: string;
  ref?: React.MutableRefObject<HTMLInputElement>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, iconLeft, iconRight, ...rest }, forwardedRef) => {
  const set = () => {
    const ref = forwardedRef && typeof forwardedRef !== 'function' && forwardedRef?.current;
    (ref as HTMLInputElement).type = ref && ref.type === 'password' ? 'text' : 'password';
  };
  return (
    <label className={`input-component${iconLeft ? ' icon-left with-icon' : iconRight ? ' icon-right with-icon' : ''}`}>
      <input type="text" {...rest} required ref={forwardedRef} />
      <span>{label}</span>
      {(iconLeft || iconRight) && <i className={`icon icon-${iconLeft || iconRight}`} onClick={set} />}
    </label>
  );
});

/*
export const Input = ({ label, iconLeft, iconRight, ...rest }: InputProps) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const set = () => {
    const type = (ref.current as HTMLInputElement).type === 'password' ? 'text' : 'password';
    (ref.current as HTMLInputElement).type = type;
  };
  return (
    <label className={`input-component${iconLeft ? ' icon-left with-icon' : iconRight ? ' icon-right with-icon' : ''}`}>
      <input type="text" {...rest} required ref={ref} />
      <span>{label}</span>
      {(iconLeft || iconRight) && <i className={`icon icon-${iconLeft || iconRight}`} onClick={set} />}
    </label>
  );
};
*/
