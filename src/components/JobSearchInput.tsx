
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const JobSearchInput = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for jobs..."
          className="pl-4 pr-12 py-6 w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200"
        />
        <Button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-500 hover:bg-brand-600 text-white rounded-md py-2 px-4 transition-colors duration-200"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
