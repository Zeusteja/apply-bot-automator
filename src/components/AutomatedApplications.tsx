
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type AutomatedApplication = Database['public']['Tables']['automated_applications']['Row'];
type Job = Database['public']['Tables']['jobs']['Row'];

interface ApplicationWithJob extends AutomatedApplication {
  jobs: Job;
}

export const AutomatedApplications = () => {
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to view applications",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('automated_applications')
        .select(`
          *,
          jobs (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      setApplications(data as ApplicationWithJob[]);
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

  const handleCancel = async (applicationId: string) => {
    try {
      const { error } = await supabase
        .from('automated_applications')
        .delete()
        .eq('id', applicationId);

      if (error) throw error;

      toast({
        title: "Application cancelled",
        description: "The automated application has been cancelled.",
      });

      fetchApplications();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading applications...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No automated applications set up yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Automated Applications</h2>
      {applications.map((application) => (
        <Card key={application.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">{application.jobs.title}</h3>
              <p className="text-gray-600">{application.jobs.company}</p>
              <div className="mt-2">
                <Badge variant="secondary" className="mr-2">
                  {application.status}
                </Badge>
                {application.linkedin_profile && (
                  <Badge variant="outline">LinkedIn Profile Added</Badge>
                )}
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={() => handleCancel(application.id)}
            >
              Cancel
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
