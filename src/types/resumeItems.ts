export type ResumeItem = {
  company: {
    name: string;
    linkedin: string;
    location: string;
  };
  title: string;
  description: string;
  type: string;
  from: string;
  to: string;
  tags: string[];
  isOngoing?: boolean;
};
