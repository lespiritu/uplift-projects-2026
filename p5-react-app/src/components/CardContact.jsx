const CardContact = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg p-8 border border-amber-100 ${className}`}
    >
      {children}
    </div>
  );
};

export default CardContact;
