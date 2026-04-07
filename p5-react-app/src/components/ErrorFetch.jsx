const ErrorFetch = ({ errorMessage }) => {
  return (
    <div>
      <p className="text-center font-bold text-red-700  p-8 text-4xl uppercase">
        {errorMessage}
      </p>
    </div>
  );
};

export default ErrorFetch;
