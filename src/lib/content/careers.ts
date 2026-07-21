import { CareerValue } from "@/types";

export const careerValues: CareerValue[] = [
  {
    title: "Meaningful Work",
    description:
      "Every position at LEE Investment Handlers contributes directly to our clients' financial security. The work you do here counts, and you will feel that impact from your first day.",
  },
  {
    title: "A High Performance Standard",
    description:
      "We maintain high standards across our research, client services, and team culture. We hire professionals who value discipline and excel in a focused environment.",
  },
  {
    title: "Opportunities For Growth",
    description:
      "We are a growing firm with global targets. For capable professionals, this offers clear opportunities to expand your skills, take on responsibility, and build a lasting career with us.",
  },
  {
    title: "Capable Colleagues",
    description:
      "Our firm is focused enough that your contributions are recognized, and established enough that you will learn daily from experienced teammates.",
  },
];

export const careerQualities = [
  "Analytical discipline and respect for facts",
  "Plain, honest communication",
  "A long term mindset in investing and work",
  "Duty and clear responsibility",
  "Teamwork without pretense",
];

export const openPositions: never[] = [];

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
  subtext: "Join dedicated professionals committed to managing wealth, protecting family legacies, and delivering long term financial performance.",
};

export const openPositionsCopy: OpenPositionsCopy = {
  title: "Open Positions",
  subtitle: "Join Our Team",
  emptyStateTitle: "No Open Roles",
  emptyStateText: "We have no open positions at this moment, but we are always looking for exceptional talent. If your background and investment principles align with ours, please send us a general application for future consideration.",
};

export const careersCTA: CareersCTA = {
  headline: "Want To Join Our Team?",
  subtext: "Send your resume and background details directly to our recruitment team.",
  buttonText: "Submit Your Application",
  email: "leeinvestmenthandlers@gmail.com",
};
