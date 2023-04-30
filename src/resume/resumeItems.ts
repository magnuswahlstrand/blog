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
          "Creator Studio is a part of the H&M Group and is a platform that allows creators all over the world to create and sell high-quality, locally sourced, print on-demand, merchandise.\nAs a member of the Payments & Reporting team, I'm responsible for the developing and operating the payment solutions for platform, as well as building systems to integrate with existing ERP solution and to create financial reports.",
        from: "Jan 2022",
        to: nowDate(),
        tags: [
          "Python",
          "Typescript",
          "Kafka",
          "Kubernetes",
          "GCP",
          "Adyen",
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
          "As part of the API Governance team, I was responsible for designing and developing the future API gateway solutions to be used by the bank. This included both on-premises and cloud-based solutions.\nOur team led the migration of the banks API Gateway from a proprietary API gateway to a more cost-effective and modern open-source variant. The project was completed on schedule, with minimal downtime for the bank's 100+ APIs.",
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
          "We built a mobile-first personal banking app to help our customers attain financial well-being. We developed every-day banking services and ensured that they were available for our customers 24/7.\nI was responsible for the platform architecture and evolution. I also led a key project for the company, replacing our existing card issuer and processor with a new provider.",
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
          "Initially, team lead for one of the five teams that led Ericsson's first 5G rollouts in China. Then I took led a project with 12 developer teams located in Sweden, Poland, China, and Korea, developing virtualized radio access network solution for larger-scale 5G rollout, again in China.",
        from: "Oct 2016",
        to: "May 2019",
        tags: ["Go", "Python", "OpenStack", "RabbitMQ", "C++"],
      },
      {
        location: "Stockholm, Sweden",
        title: "Developer & Team Lead",
        description:
          "Member of a team that developed control systems and automated tests for GSM and WCDMA base stations. As a team leader and scrum master, I was responsible for team planning and coordination with other parts of the project.\nI also took the initiative to develop and maintain a tool for visualizing test results. This web-based tool was used daily by over 500 project members.",
        from: "Aug 2013",
        to: "Oct 2016",
        tags: ["C++", "Java", "Python", "UML modelling", "Linux"],
      },
      {
        location: "Linköping, Sweden",
        title: "Junior Developer",
        description:
          "Part of a team that developed features for Ericsson's 4G base stations. The team focus was automatic system configuration and early warning systems.",
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
