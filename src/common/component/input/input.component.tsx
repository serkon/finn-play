import React, { useEffect, useImperativeHandle, useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  iconLeft?: string;
  iconRight?: string;
  ref?: React.MutableRefObject<HTMLInputElement>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, iconLeft, iconRight, ...rest }, forwardedRef) => {
  const [type, SetType] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const showEye = () => {
    if (type) {
      const ref = inputRef.current as HTMLInputElement;
      ref.type = ref.type === 'password' ? 'text' : 'password';
    }
  };

  useEffect(() => {
    const ref = inputRef.current as HTMLInputElement;
    SetType(ref.type === 'password');
  }, []);

  useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

  return (
    <label className={`input-component${iconLeft ? ' icon-left with-icon' : iconRight ? ' icon-right with-icon' : ''}`}>
      <input type="text" {...rest} required ref={inputRef} />
      <span>{label}</span>
      {(iconLeft || iconRight) && <i className={`icon icon-${iconLeft || iconRight}`} onClick={showEye} />}
    </label>
  );
});
