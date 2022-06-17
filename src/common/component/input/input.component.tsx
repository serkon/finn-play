interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, ...rest }: InputProps) => (
  <label className="input-component">
    <input type="text" {...rest} required />
    <span>{label}</span>
  </label>
);
