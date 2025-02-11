
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Job = Database['public']['Tables']['jobs']['Row'];

interface AutomatedApplicationFormProps {
  open: boolean;
  onClose: () => void;
  job: Job;
}

export const AutomatedApplicationForm = ({ open, onClose, job }: AutomatedApplicationFormProps) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to apply",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('automated_applications')
        .insert({
          job_id: job.id,
          user_id: user.id,
          cover_letter_template: coverLetter,
          linkedin_profile: linkedinProfile,
        });

      if (error) throw error;

      toast({
        title: "Application submitted",
        description: "Your automated application has been set up successfully.",
      });

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
          <DialogTitle>Set Up Automated Application</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Textarea
              placeholder="Cover Letter Template"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
          <div>
            <Input
              placeholder="LinkedIn Profile URL"
              type="url"
              value={linkedinProfile}
              onChange={(e) => setLinkedinProfile(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Setting up..." : "Start Automated Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
