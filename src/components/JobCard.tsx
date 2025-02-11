
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Bookmark, Building2 } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  postedDate: string;
  status?: "new" | "applied" | "viewed" | "saved";
}

export const JobCard = ({
  title,
  company,
  location,
  salary,
  description,
  postedDate,
  status = "new",
}: JobCardProps) => {
  const statusColors = {
    new: "bg-green-500",
    applied: "bg-blue-500",
    viewed: "bg-gray-500",
    saved: "bg-purple-500",
  };

  return (
    <Card className="group p-6 bg-white/80 backdrop-blur-sm hover:bg-white/90 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 animate-fadeIn">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <Badge variant="secondary" className={`${statusColors[status]} text-white`}>
              {status}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="w-4 h-4" />
            <span>{company}</span>
            <span>•</span>
            <span>{location}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-brand-500">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-brand-500">
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium text-gray-900">{salary}</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{postedDate}</span>
          <Button className="bg-brand-500 hover:bg-brand-600 text-white">
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
