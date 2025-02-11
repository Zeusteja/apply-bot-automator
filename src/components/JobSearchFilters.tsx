
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const JobSearchFilters = () => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center my-6">
      <Select>
        <SelectTrigger className="w-[180px] bg-white/80 backdrop-blur-sm">
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="full-time">Full Time</SelectItem>
          <SelectItem value="part-time">Part Time</SelectItem>
          <SelectItem value="contract">Contract</SelectItem>
          <SelectItem value="internship">Internship</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px] bg-white/80 backdrop-blur-sm">
          <SelectValue placeholder="Experience Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="entry">Entry Level</SelectItem>
          <SelectItem value="mid">Mid Level</SelectItem>
          <SelectItem value="senior">Senior Level</SelectItem>
          <SelectItem value="lead">Lead</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px] bg-white/80 backdrop-blur-sm">
          <SelectValue placeholder="Salary Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0-50k">$0 - $50k</SelectItem>
          <SelectItem value="50k-100k">$50k - $100k</SelectItem>
          <SelectItem value="100k-150k">$100k - $150k</SelectItem>
          <SelectItem value="150k+">$150k+</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
        More Filters
      </Button>
    </div>
  );
};
