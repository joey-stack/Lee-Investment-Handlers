export interface OfficeLocation {
  city: string;
  address: string;
  phone: string;
  email: string;
}

export interface SocialLink {
  platform: "linkedin" | "instagram" | "x";
  url: string;
}

export interface FooterContent {
  tagline: string;
  description: string;
  offices: OfficeLocation[];
  socialLinks: SocialLink[];
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
    successMessage: string;
  };
  complianceDisclaimer: string;
  copyrightTemplate: string;
}

export const footerContent: FooterContent = {
  tagline: "Secure Wealth. Outlive Inflation.",
  description: "LEE Investment Handlers is a wealth management firm dedicated to protecting and growing capital for individuals, families, and institutions across generations.",
  offices: [
    {
      city: "Lagos Office",
      address: "#12B Obadare Close, Santos Estate, Akowonjo, Lagos, Nigeria.",
      phone: "+234 9129243211",
      email: "info@leeinvestmenthandlers.com",
    },
    {
      city: "Venice Office",
      address: "Via Belfiore 23A, 30020, Italy.",
      phone: "+39 0421 200688",
      email: "leeinvestmenthandlers@gmail.com",
    },
  ],
  socialLinks: [
    {
      platform: "linkedin",
      url: "https://linkedin.com/company/lee-investment-handlers",
    },
    {
      platform: "x",
      url: "https://x.com/lee_investments",
    },
    {
      platform: "instagram",
      url: "https://instagram.com/lee_investments",
    },
  ],
  newsletter: {
    title: "Get Factual Briefings",
    description: "Receive our monthly economic analysis and investment updates directly in your inbox.",
    placeholder: "Enter your email address",
    buttonText: "Subscribe",
    successMessage: "Thank you for subscribing. We have added you to our mailing list.",
  },
  complianceDisclaimer: "LEE Investment Handlers operates as a professional investment management and advisory firm. All investments carry risks, including the potential loss of principal capital. Past results do not guarantee future growth. Investment products may not be suitable for all investors. Regulated under applicable investment authorities in respective jurisdictions.",
  copyrightTemplate: "© {year} LEE Investment Handlers. All rights reserved.",
};
