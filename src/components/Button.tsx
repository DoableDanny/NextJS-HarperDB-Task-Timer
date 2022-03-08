interface Props {
  children: React.ReactNode;
  color: 'primary' | 'success' | 'secondary' | 'warning' | 'danger';
  handleClick?: () => void;
  type?: 'button' | 'submit';
  extraClasses?: string;
}

const Button: React.FC<Props> = ({
  children,
  color,
  handleClick,
  type,
  extraClasses,
}) => {
  let colors: string;
  switch (color) {
    case 'primary':
      colors = 'bg-blue-500 hover:bg-blue-600';
      break;
    case 'success':
      colors = 'bg-green-500 hover:bg-green-600';
      break;
    case 'warning':
      colors = 'bg-yellow-300 hover:bg-yellow-400 text-black';
      break;
    case 'secondary':
      colors = 'bg-pink-500 hover:bg-pink-600';
      break;
    default:
      colors = 'bg-red-500 hover:bg-red-600';
  }
  const classes = `rounded text-white py-2 px-4 ${colors} ${extraClasses}`;

  return (
    <button className={classes} onClick={handleClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
