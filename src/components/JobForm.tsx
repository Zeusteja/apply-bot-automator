
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Job = Database['public']['Tables']['jobs']['Row'];

interface JobFormProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  job?: Job;
}

export const JobForm = ({ open, onClose, onSave, job }: JobFormProps) => {
  const [title, setTitle] = useState(job?.title || "");
  const [company, setCompany] = useState(job?.company || "");
  const [location, setLocation] = useState(job?.location || "");
  const [salary, setSalary] = useState(job?.salary || "");
  const [description, setDescription] = useState(job?.description || "");
  const [url, setUrl] = useState(job?.url || "");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (job) {
        const { error } = await supabase
          .from('jobs')
          .update({
            title,
            company,
            location,
            salary,
            description,
            url,
            updated_at: new Date().toISOString(),
          })
          .eq('id', job.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('jobs')
          .insert([
            {
              title,
              company,
              location,
              salary,
              description,
              url,
            },
          ]);

        if (error) throw error;
      }

      toast({
        title: job ? "Job updated" : "Job created",
        description: job ? "Job has been successfully updated." : "Job has been successfully created.",
      });

      onSave();
      onClose();
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{job ? "Edit Job" : "Add New Job"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <div>
            <Textarea
              placeholder="Job Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div>
            <Input
              placeholder="Job URL"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : job ? "Update Job" : "Add Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
