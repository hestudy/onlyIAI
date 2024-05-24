import { Loader } from "lucide-react";

const AiLoading = () => {
  return (
    <div className="flex items-center space-x-1">
      <Loader className="animate-spin size-4" />
      <div className="text-[12px]">努力思考中...</div>
    </div>
  );
};

export default AiLoading;
