
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Robot } from "lucide-react";
import { JobCardActions } from "./JobCardActions";
import { useState } from "react";
import { AutomatedApplicationForm } from "./AutomatedApplicationForm";
import type { Database } from "@/integrations/supabase/types";

type Job = Database['public']['Tables']['jobs']['Row'];

interface JobCardProps {
  job: Job;
  onDelete: () => void;
  onEdit: () => void;
}

export const JobCard = ({ job, onDelete, onEdit }: JobCardProps) => {
  const [automatedFormOpen, setAutomatedFormOpen] = useState(false);
  
  const statusColors: Record<string, string> = {
    new: "bg-green-500",
    applied: "bg-blue-500",
    interviewing: "bg-yellow-500",
    offered: "bg-purple-500",
    rejected: "bg-red-500",
    accepted: "bg-teal-500",
  };

  return (
    <>
      <Card className="group p-6 bg-white/80 backdrop-blur-sm hover:bg-white/90 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 animate-fadeIn">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
              <Badge 
                variant="secondary" 
                className={`${statusColors[job.status || 'new']} text-white`}
              >
                {job.status || 'new'}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="w-4 h-4" />
              <span>{job.company}</span>
              {job.location && (
                <>
                  <span>•</span>
                  <span>{job.location}</span>
                </>
              )}
            </div>
          </div>
          <JobCardActions job={job} onDelete={onDelete} onEdit={onEdit} />
        </div>
        {job.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
        )}
        <div className="flex justify-between items-center">
          {job.salary && (
            <span className="text-lg font-medium text-gray-900">{job.salary}</span>
          )}
          <div className="flex items-center gap-4">
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setAutomatedFormOpen(true)}
            >
              <Robot className="w-4 h-4" />
              Automate Application
            </Button>
            <Button className="bg-brand-500 hover:bg-brand-600 text-white">
              Apply Now
            </Button>
          </div>
        </div>
      </Card>
      
      <AutomatedApplicationForm
        open={automatedFormOpen}
        onClose={() => setAutomatedFormOpen(false)}
        job={job}
      />
    </>
  );
};
