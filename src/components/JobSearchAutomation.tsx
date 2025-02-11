
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bot, Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface JobSearchCriteria {
  id: string;
  job_title: string;
  keywords: string[];
  required_skills: string[];
  min_salary: number | null;
  max_salary: number | null;
  location: string | null;
  remote_only: boolean;
  is_active: boolean;
  auto_apply: boolean;
  search_linkedin: boolean;
  search_indeed: boolean;
  search_glassdoor: boolean;
}

export const JobSearchAutomation = () => {
  const [searches, setSearches] = useState<JobSearchCriteria[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNewSearchOpen, setIsNewSearchOpen] = useState(false);
  const [newSearch, setNewSearch] = useState({
    job_title: "",
    keywords: [],
    location: "",
    is_active: true,
    search_linkedin: true,
    search_indeed: true,
    search_glassdoor: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSearches();
  }, []);

  const fetchSearches = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to use job search automation",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('job_search_automation')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      setSearches(data);
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

  const createSearch = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create a job search",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('job_search_automation')
        .insert({
          ...newSearch,
          user_id: user.id,
          keywords: newSearch.keywords,
          required_skills: [],
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job search automation created",
      });

      setIsNewSearchOpen(false);
      setNewSearch({
        job_title: "",
        keywords: [],
        location: "",
        is_active: true,
        search_linkedin: true,
        search_indeed: true,
        search_glassdoor: true,
      });
      await fetchSearches();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('job_search_automation')
        .update({ is_active: !currentValue })
        .eq('id', id);

      if (error) throw error;

      await fetchSearches();
      
      toast({
        title: "Success",
        description: `Job search ${!currentValue ? 'activated' : 'paused'}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteSearch = async (id: string) => {
    try {
      const { error } = await supabase
        .from('job_search_automation')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchSearches();
      
      toast({
        title: "Success",
        description: "Job search automation deleted",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading job search automation...</div>;
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Automated Job Search</h2>
          <Button 
            className="bg-brand-500 hover:bg-brand-600"
            onClick={() => setIsNewSearchOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Search
          </Button>
        </div>

        {searches.length === 0 ? (
          <Card className="p-6 text-center">
            <Bot className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">No automated searches yet</h3>
            <p className="text-gray-600 mb-4">
              Set up automated job searches to find opportunities matching your criteria
            </p>
            <Button 
              className="bg-brand-500 hover:bg-brand-600"
              onClick={() => setIsNewSearchOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Search
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {searches.map((search) => (
              <Card key={search.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium">{search.job_title}</h3>
                      <Badge variant={search.is_active ? "default" : "secondary"}>
                        {search.is_active ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {search.location && (
                        <p className="text-gray-600">📍 {search.location}</p>
                      )}
                      {search.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {search.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-4 text-sm text-gray-600">
                        {search.search_linkedin && <span>LinkedIn</span>}
                        {search.search_indeed && <span>Indeed</span>}
                        {search.search_glassdoor && <span>Glassdoor</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={search.is_active}
                      onCheckedChange={() => toggleActive(search.id, search.is_active)}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteSearch(search.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isNewSearchOpen} onOpenChange={setIsNewSearchOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Job Search</DialogTitle>
            <DialogDescription>
              Set up your automated job search criteria
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="job_title" className="text-sm font-medium text-gray-700">
                Job Title
              </label>
              <Input
                id="job_title"
                value={newSearch.job_title}
                onChange={(e) => setNewSearch({ ...newSearch, job_title: e.target.value })}
                placeholder="e.g., Frontend Developer"
              />
            </div>
            <div>
              <label htmlFor="keywords" className="text-sm font-medium text-gray-700">
                Keywords (comma-separated)
              </label>
              <Input
                id="keywords"
                value={newSearch.keywords.join(", ")}
                onChange={(e) => setNewSearch({ 
                  ...newSearch, 
                  keywords: e.target.value.split(",").map(k => k.trim()).filter(Boolean)
                })}
                placeholder="e.g., React, TypeScript, Node.js"
              />
            </div>
            <div>
              <label htmlFor="location" className="text-sm font-medium text-gray-700">
                Location
              </label>
              <Input
                id="location"
                value={newSearch.location}
                onChange={(e) => setNewSearch({ ...newSearch, location: e.target.value })}
                placeholder="e.g., San Francisco, CA"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNewSearchOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createSearch}>
                Create Search
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
