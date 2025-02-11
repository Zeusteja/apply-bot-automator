
import { useEffect, useState } from "react";
import { JobSearchInput } from "@/components/JobSearchInput";
import { JobSearchFilters } from "@/components/JobSearchFilters";
import { JobCard } from "@/components/JobCard";
import { JobForm } from "@/components/JobForm";
import { AutomatedApplications } from "@/components/AutomatedApplications";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Job = Database['public']['Tables']['jobs']['Row'];

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | undefined>();
  const { toast } = useToast();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setJobs(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setSelectedJob(undefined);
    setFormOpen(true);
  };

  const handleSave = () => {
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Next Opportunity
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Search through thousands of jobs tailored to your skills and experience
          </p>
          <Button onClick={handleAdd} className="bg-brand-500 hover:bg-brand-600">
            <Plus className="mr-2 h-4 w-4" /> Add New Job
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-slideUp">
            <JobSearchInput />
            <JobSearchFilters />
            
            <div className="grid gap-6">
              {loading ? (
                <p className="text-center text-gray-600">Loading jobs...</p>
              ) : jobs.length === 0 ? (
                <p className="text-center text-gray-600">No jobs found. Add your first job!</p>
              ) : (
                jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onDelete={fetchJobs}
                    onEdit={() => handleEdit(job)}
                  />
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <AutomatedApplications />
          </div>
        </div>

        <JobForm
          open={formOpen}
          onClose={() => {
            setFormOpen(false);
            setSelectedJob(undefined);
          }}
          onSave={handleSave}
          job={selectedJob}
        />
      </div>
    </div>
  );
};

export default Index;
