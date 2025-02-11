
import { JobSearchInput } from "@/components/JobSearchInput";
import { JobSearchFilters } from "@/components/JobSearchFilters";
import { JobCard } from "@/components/JobCard";

const SAMPLE_JOBS = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $180k",
    description:
      "We're looking for a Senior Frontend Developer to join our team. You'll be working on our main product, building new features and improving existing ones.",
    postedDate: "2 days ago",
    status: "new",
  },
  {
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$100k - $150k",
    description:
      "Join our fast-growing startup as a Full Stack Engineer. Work on challenging problems and help us scale our platform.",
    postedDate: "1 week ago",
    status: "applied",
  },
  {
    title: "React Developer",
    company: "InnovateWeb",
    location: "New York, NY",
    salary: "$90k - $130k",
    description:
      "Looking for a React Developer to help build modern web applications. Experience with TypeScript and Next.js is a plus.",
    postedDate: "3 days ago",
    status: "saved",
  },
] as const;

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Next Opportunity
          </h1>
          <p className="text-xl text-gray-600">
            Search through thousands of jobs tailored to your skills and experience
          </p>
        </div>

        <div className="space-y-8 animate-slideUp">
          <JobSearchInput />
          <JobSearchFilters />
          
          <div className="grid gap-6">
            {SAMPLE_JOBS.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
