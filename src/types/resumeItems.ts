export type ResumeItem = {
  company: {
    name: string;
    linkedin: string;
  };
  isOngoing?: boolean;
  type: "Freelance" | "Full-time";
  roles: {
    location?: string;
    title: string;
    description: string;
    from: string;
    to: string;
    tags: string[];
  }[];
};
