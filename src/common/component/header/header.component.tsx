interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className: string;
}

export const Header = ({ children, ...rest }: HeaderProps) => <header {...rest}>{children}</header>;
