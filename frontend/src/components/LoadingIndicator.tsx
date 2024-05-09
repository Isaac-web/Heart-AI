const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center py-10 w-full">
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball loading-md"></span>
      <span className="loading loading-ball loading-lg"></span>
    </div>
  );
};

export default LoadingIndicator;
