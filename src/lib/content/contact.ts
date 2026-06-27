export interface ContactPageHero {
  headline: string;
  subtext: string;
}

export interface ContactFormCopy {
  labelName: string;
  labelEmail: string;
  labelPhone: string;
  labelGoals: string;
  labelMessage: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderPhone: string;
  placeholderGoals: string;
  placeholderMessage: string;
  buttonSubmit: string;
  buttonLoading: string;
  successTitle: string;
  successText: string;
}

export interface ContactProcessCopy {
  title: string;
  subtitle: string;
}

export const contactPageHero: ContactPageHero = {
  headline: "How To Start Your Free Consultation Today",
  subtext: "Please contact our offices in Lagos or Venice to schedule a private consultation with a senior financial advisor.",
};

export const contactFormCopy: ContactFormCopy = {
  labelName: "Full Name",
  labelEmail: "Email Address",
  labelPhone: "Phone Number",
  labelGoals: "Your Investment Goal",
  labelMessage: "State Your Main Financial Goals (Optional)",
  placeholderName: "e.g. David Lee",
  placeholderEmail: "e.g. david@example.com",
  placeholderPhone: "e.g. +234 803 123 4567",
  placeholderGoals: "Choose your main wealth goal...",
  placeholderMessage: "Describe your financial plans, target timeline, or your specific investment goals...",
  buttonSubmit: "Schedule a Consultation",
  buttonLoading: "Submitting Request...",
  successTitle: "Consultation Request Received",
  successText: "Thank you for writing. A senior advisor from our firm will call you within one business day to analyze your strategic wealth goals.",
};

export const contactProcessCopy: ContactProcessCopy = {
  title: "How We Work With You Next",
  subtitle: "Our Onboarding Process",
};
