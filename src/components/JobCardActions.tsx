
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart, Bookmark, Building2, Trash, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Job = Database['public']['Tables']['jobs']['Row'];

interface JobCardActionsProps {
  job: Job;
  onDelete: () => void;
  onEdit: () => void;
}

export const JobCardActions = ({ job, onDelete, onEdit }: JobCardActionsProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', job.id);

      if (error) throw error;
      
      toast({
        title: "Job deleted",
        description: "Job has been successfully deleted.",
      });
      
      onDelete();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-brand-500">
        <Heart className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-brand-500">
        <Bookmark className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-brand-500" onClick={onEdit}>
        <Edit className="w-5 h-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-gray-500 hover:text-red-500"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <Trash className="w-5 h-5" />
      </Button>
    </div>
  );
};
