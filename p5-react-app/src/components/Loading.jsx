const Loading = () => {
  return (
    <div className="flex justify-center items-center py-16">
      <div
        className="h-20 w-20 border-6 border-dark-leon-400/20 border-t-transparent rounded-full animate-spin flex justify-center items-center"
        aria-label="Loading"
      >
        <div
          className="h-12 w-12 border-2 border-dark-leon-400/20 border-t-transparent rounded-full animate-spin"
          aria-label="Loading"
        ></div>
      </div>
    </div>
  );
};

export default Loading;
