export type ResumeItem = {
  location: string;
  company: {
    name: string;
    linkedin: string;
    location: string;
  };
  isOngoing?: boolean;
  type: "Freelance" | "Full-time";
  roles: {
    title: string;
    description: string;
    from: string;
    to: string;
    tags: string[];
  }[];
};
