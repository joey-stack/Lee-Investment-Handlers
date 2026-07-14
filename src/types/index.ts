export interface ServiceMetric {
  value: string;
  label: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  includes: string[];
  icon: string;
  metrics?: ServiceMetric[];
}

export interface Pillar {
  id: string;
  title: string;
  body: string;
  icon?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  bioShort: string;
  image: string;
  linkedin?: string;
  experienceHighlight?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  attribution: string;
  role: string;
  rating: number;
  metric?: string;
  metricLabel?: string;
  featured?: boolean;
  featuredAt?: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  slug: string;
  featured?: boolean;
  image: string;
  content?: string[] | string;
  author?: string;
  readTime?: string;
  tags?: string[];
}

export interface PerformanceBar {
  year: string;
  value: number;
  label: string;
}

export interface CareerValue {
  title: string;
  description: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  investmentGoals: string;
  message?: string;
}

export interface ServiceResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

