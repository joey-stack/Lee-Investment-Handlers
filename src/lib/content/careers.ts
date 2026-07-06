import { CareerValue } from "@/types";

export const careerValues: CareerValue[] = [
  {
    title: "Meaningful Work",
    description:
      "Every position at LEE Investment Handlers contributes directly to our clients' financial security. The work you do here counts — and you'll feel that from day one.",
  },
  {
    title: "A High Performance Standard",
    description:
      "We maintain a very high standard — in our research process, our client services, and our office culture. We hire people who respect this strict discipline and will thrive under it.",
  },
  {
    title: "Opportunities For Growth",
    description:
      "We are a growing business with global targets. For the capable professionals, that offers real opportunities to take on more responsibility, expand your skills, and build your career with us.",
  },
  {
    title: "Capable Colleagues",
    description:
      "Our firm is small enough that your work is noticed and large enough that you will learn daily from colleagues who are exceptional at their jobs.",
  },
];

export const careerQualities = [
  "Analytical discipline and respect for facts",
  "Plain, honest talk",
  "A long-term mindset — in investing and in work",
  "Duty and responsibility",
  "Teamwork without pretense",
];

export const openPositions: never[] = [];
// Positions pending from client — will be populated when provided

export interface CareersPageHero {
  headline: string;
  subtext: string;
}

export interface CareersCTA {
  headline: string;
  subtext: string;
  buttonText: string;
  email: string;
}

export interface OpenPositionsCopy {
  title: string;
  subtitle: string;
  emptyStateTitle: string;
  emptyStateText: string;
}

export const careersPageHero: CareersPageHero = {
  headline: "Do Work That Pays",
  subtext: "Join disciplined professionals committed to managing wealth, preserving family legacies, and delivering excellence for years to come.",
};

export const openPositionsCopy: OpenPositionsCopy = {
  title: "Open Positions",
  subtitle: "Join Our Team",
  emptyStateTitle: "No Open Roles",
  emptyStateText: "We have no open positions at this moment, but we are always looking for exceptional, high-grade talent. If you believe your background and investment principles align with ours, please submit a general application for our future review.",
};

export const careersCTA: CareersCTA = {
  headline: "Want To Join Our Team?",
  subtext: "Send your CV, background history, and target area of expertise directly to our recruitment team.",
  buttonText: "Submit Your Application",
  email: "leeinvestmenthandlers@gmail.com",
};
