import type { ResumeItem } from "../types/resumeItems";

export function nowDate(): string {
  const now = new Date();
  return now.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export const resumeItems: ResumeItem[] = [
  {
    type: "Freelance",
    company: {
      name: "Creator Studio",
      linkedin: "https://www.linkedin.com/company/thisisyourstudio/mycompany/",
    },
    isOngoing: true,
    roles: [
      {
        location: "Stockholm, Sweden",
        title: "Senior Developer",
        description:
          "Part of the backend team for Creator Studio, an on-demand merch platform that manages production, printing, and e-commerce. As a backend developer, I develop and maintain the highly scalable platform that delivers on-demand merch for creators worldwide. Working at Creator Studio, which is part of the H&M Group, has given me the opportunity to work on a cutting-edge platform and use the latest technologies to create innovative solutions for on-demand merch.",
        from: "Jan 2022",
        to: nowDate(),
        tags: [
          "Python",
          "Kafka",
          "GCP",
          "Kubernetes",
          "PostgresSQL",
          "MongoDB",
        ],
      },
    ],
  },
  {
    type: "Freelance",
    company: {
      name: "SEB",
      linkedin: "https://www.linkedin.com/company/seb/",
    },
    roles: [
      {
        location: "Stockholm, Sweden",
        title: "Senior Software Engineer",
        description:
          "As part of the API Governance team, I was responsible for designing and developing the future API gateway solutions to be used by the bank. This included both on-premises and cloud-based solutions. In one project, we migrated the bank's 100+ APIs from a proprietary API gateway to a more cost-effective and modern open-source variant. The project was completed on schedule, with minimal downtime. Tools to enable this were written in Go and TypeScript and were operated on OpenShift and GCP.",
        from: "May 2021",
        to: "Jan 2022",
        tags: ["Go", "Typescript", "Openshift", "Kong", "GCP"],
      },
    ],
  },
  {
    type: "Full-time",
    company: {
      name: "P.F.C.",
      linkedin: "https://www.linkedin.com/company/getpfc/",
    },
    roles: [
      {
        location: "Stockholm, Sweden",
        title: "Senior Software Developer",
        description:
          "We built a mobile-first personal finance app to help our customers attain financial well-being. We provided a personalized experience that was tailored to each user's individual needs. We developed every-day banking services and ensured that they were available for our customers 24/7. I was responsible for the platform architecture and evolution.",
        from: "May 2019",
        to: "May 2021",
        tags: ["Go", "DevOps", "Docker", "PostgreSQL", "AWS", "Heroku"],
      },
    ],
  },
  {
    type: "Full-time",
    company: {
      name: "Ericsson",
      linkedin: "https://www.linkedin.com/company/ericsson/",
    },
    roles: [
      {
        location: "Stockholm, Sweden",
        title: "Project Manager & Team Lead",
        description:
          "Initally team lead for one of the five teams that led Ericsson's first 5G rollouts in China. Then I led a team of 12 software developers in Sweden, Poland, China, and Korea to develop a virtualized radio access network solution for the first large-scale 5G rollout in China. This included 3GPP compliant traffic applications, auto scaling and load balancing, as well as network configuration and monitoring tools.",
        from: "Oct 2016",
        to: "May 2019",
        tags: ["Go", "Python", "OpenStack", "RabbitMQ", "C++"],
      },
      {
        location: "Stockholm, Sweden",
        title: "Developer and Team Lead",
        description:
          "Member of a team that developed control systems and automated tests for GSM and WCDMA base stations. As a team leader and Scrum Master, I was responsible for team planning and coordination with other parts of the project. Magnus also took the initiative to develop and maintain a tool for visualizing test results. This web-based tool was used daily by over 500 project members.",
        from: "Aug 2013",
        to: "Oct 2016",
        tags: ["C++", "Java", "Python", "UML modelling", "Linux"],
      },
      {
        location: "Linköping, Sweden",
        title: "Junior developer",
        description:
          "Part of a team that developed features for Ericsson's 4G base stations. Focus on robust solutions for automatic system configuration.",
        from: "Jan 2012",
        to: "Aug 2013",
        tags: ["Java", "UML modelling", "ClearCase"],
      },
    ],
  },
];

export function calculateDuration(from: string, to: string): string {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const years = toDate.getFullYear() - fromDate.getFullYear();
  const months = toDate.getMonth() - fromDate.getMonth();

  const totalMonths = years * 12 + months;
  const numYears = Math.floor(totalMonths / 12);
  const numMonths = totalMonths % 12;

  const yearString =
    numYears > 0 ? `${numYears} year${numYears > 1 ? "s" : ""}` : "";
  const monthString =
    numMonths > 0 ? `${numMonths} month${numMonths > 1 ? "s" : ""}` : "";

  return `${yearString}${
    numYears > 0 && numMonths > 0 ? " " : ""
  }${monthString}`;
}
