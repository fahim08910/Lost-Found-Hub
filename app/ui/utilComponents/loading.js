import { CircularProgress } from "@nextui-org/react";

const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default LoadingIndicator;
