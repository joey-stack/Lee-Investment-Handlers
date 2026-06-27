import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Phone number is required"),
  investmentGoals: z.string().min(1, "Please select your primary investment goal"),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const investmentGoalOptions = [
  "Wealth Preservation",
  "Long-Term Growth",
  "Retirement Planning",
  "Institutional Asset Management",
  "Alternative Investments",
  "Risk Management",
  "Not sure yet — I'd like guidance",
];
