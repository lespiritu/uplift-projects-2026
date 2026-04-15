interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  className = "",
  variant,
  onClick,
  disabled = false,
  type = "button",
}: buttonProps) => {
  switch (variant) {
    case "primary":
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={` cursor-pointer rounded px-6 py-2 overflow-hidden group bg-linear-to-r from-primary to-primary relative hover:bg-linear-to-r hover:from-primary hover:to-primary text-text-dark2 transition-all ease-out duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        >
          <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-surface opacity-10 -skew-x-12 group-hover:-translate-x-30 ease"></span>
          <span className="relative font-semibold">{children}</span>
        </button>
      );
    case "primary-small":
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={` cursor-pointer rounded px-3 py-1 overflow-hidden group bg-linear-to-r from-primary to-primary relative hover:bg-linear-to-r hover:from-primary hover:to-primary text-text-dark2 transition-all ease-out duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        >
          <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-surface opacity-10 -skew-x-12 group-hover:-translate-x-30 ease"></span>
          <span className="relative font-semibold text-sm">{children}</span>
        </button>
      );
    case "light":
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={` cursor-pointer rounded px-6 py-2 overflow-hidden group bg-linear-to-r from-green-100 to-green-100 relative hover:bg-linear-to-r hover:from-green-100 hover:to-green-100 text-secondary transition-all ease-out duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        >
          <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-surface opacity-50 -skew-x-12 group-hover:-translate-x-30 ease"></span>
          <span className="relative font-semibold">{children}</span>
        </button>
      );
    case "light-small":
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`border px-3 border-1-green-200 cursor-pointer rounded py-1 overflow-hidden group bg-linear-to-r from-green-100 to-green-100 relative hover:bg-linear-to-r hover:from-green-100 hover:to-green-100 text-secondary transition-all ease-out duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        >
          <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-50 -skew-x-12 group-hover:-translate-x-30 ease"></span>
          <span className="relative font-semibold text-sm">{children}</span>
        </button>
      );

    case "secondary":
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`relative cursor-pointer rounded px-6 py-2 overflow-hidden group bg-linear-to-r from-secondary to-secondary  hover:bg-linear-to-r hover:from-secondary hover:to-secondary text-white transition-all ease-out duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        >
          <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-30 ease"></span>
          <span className="relative font-semibold">{children}</span>
        </button>
      );

    case "secondary-small":
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`relative cursor-pointer rounded px-3 py-1 overflow-hidden group bg-linear-to-r from-secondary to-secondary  hover:bg-linear-to-r hover:from-secondary hover:to-secondary text-white transition-all ease-out duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        >
          <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-30 ease"></span>
          <span className="relative font-semibold text-sm">{children}</span>
        </button>
      );
    case "outline":
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`relative cursor-pointer rounded bg-secondary/14  px-6 py-2 overflow-hidden group  hover:bg-linear-to-r border border-primary  text-primary transition-all ease-out duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        >
          <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-primary opacity-10 -skew-x-12 group-hover:-translate-x-30 ease"></span>
          <span className="relative ">{children}</span>
        </button>
      );
    case "outline-small":
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`relative cursor-pointer rounded px-3 py-1 overflow-hidden group  hover:bg-linear-to-r border border-primary font-light text-primary transition-all ease-out duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        >
          <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-primary opacity-10 -skew-x-12 group-hover:-translate-x-30 ease"></span>
          <span className="relative font-semibold text-sm">{children}</span>
        </button>
      );
    default:
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={` cursor-pointer rounded px-6 py-2 overflow-hidden group bg-linear-to-r from-primary to-primary relative hover:bg-linear-to-r hover:from-primary hover:to-primary text-white transition-all ease-out duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        >
          <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-30 ease"></span>
          <span className="relative font-semibold">{children}</span>
        </button>
      );
  }
};

export default Button;
