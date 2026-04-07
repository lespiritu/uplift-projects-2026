const Button = ({
  onClick,
  type = "button",
  className = "",
  version = "solid",
  buttonName,
}) => {
  const handleOnClick = typeof onClick === "function" ? onClick : undefined;
  const baseClassName =
    "cursor-pointer px-5 py-3 uppercase transition-colors duration-300";
  const versionClassName =
    version === "outline"
      ? "border border-amber-500 text-amber-600 hover:bg-amber-50"
      : "bg-amber-500 text-white hover:bg-amber-600";

  return (
    <button
      type={type}
      onClick={handleOnClick}
      className={`${baseClassName} ${versionClassName} ${className}`}
    >
      {buttonName}
    </button>
  );
};

export default Button;
