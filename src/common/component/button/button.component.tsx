interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className, ...rest }: ButtonProps) => (
  <button className={`button ${className}`} {...rest}>
    {children}
  </button>
);
