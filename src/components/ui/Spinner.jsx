import { Loader2 } from "lucide-react";

function Spinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <Loader2 className="w-6 h-6 text-accent animate-spin" />
    </div>
  );
}

export default Spinner;
