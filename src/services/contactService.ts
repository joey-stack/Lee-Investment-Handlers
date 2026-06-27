import { Resend } from "resend";
import { ContactFormData, ServiceResponse } from "@/types";

const resendApiKey = process.env.RESEND_API_KEY;
const contactEmailTo = process.env.CONTACT_EMAIL_TO;

// Lazily initialize Resend to prevent crashes during build if API key is not yet set
let resendInstance: Resend | null = null;
if (resendApiKey) {
  resendInstance = new Resend(resendApiKey);
}

export async function sendConsultationEmail(
  data: ContactFormData
): Promise<ServiceResponse> {
  const { fullName, email, phone, investmentGoals, message } = data;

  try {
    if (!resendInstance || !contactEmailTo) {
      console.warn(
        "Resend email service: RESEND_API_KEY or CONTACT_EMAIL_TO is missing in .env. Falling back to console log for debugging."
      );
      console.log("=== Consultation Request Log ===");
      console.log(`To: ${contactEmailTo || "Not configured"}`);
      console.log(`From Client: ${fullName} <${email}>`);
      console.log(`Phone: ${phone}`);
      console.log(`Investment Goals: ${investmentGoals}`);
      console.log(`Message: ${message || "None"}`);
      console.log("================================");
      
      // Simulate slight network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { success: true };
    }

    const emailHtml = `
      <h2>New Consultation Request</h2>
      <p>A new consultation request has been submitted from the LEE Investment Handlers website.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr style="background-color: #f7f6f4;">
          <th style="padding: 10px; border: 1px solid #e8e5e0; text-align: left; width: 200px;">Field</th>
          <th style="padding: 10px; border: 1px solid #e8e5e0; text-align: left;">Details</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e8e5e0; font-weight: bold;">Full Name</td>
          <td style="padding: 10px; border: 1px solid #e8e5e0;">${fullName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e8e5e0; font-weight: bold;">Email Address</td>
          <td style="padding: 10px; border: 1px solid #e8e5e0;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e8e5e0; font-weight: bold;">Phone Number</td>
          <td style="padding: 10px; border: 1px solid #e8e5e0;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e8e5e0; font-weight: bold;">Investment Goals</td>
          <td style="padding: 10px; border: 1px solid #e8e5e0;">${investmentGoals}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e8e5e0; font-weight: bold;">Message</td>
          <td style="padding: 10px; border: 1px solid #e8e5e0;">${message || "No message provided."}</td>
        </tr>
      </table>
      
      <p style="margin-top: 30px; font-size: 12px; color: #4a4a4a;">
        This email was sent automatically from the LEE Investment Handlers website consultation form.
      </p>
    `;

    const { error } = await resendInstance.emails.send({
      from: "LEE Investment Handlers <onboarding@resend.dev>", // Fallback sandbox domain or custom verified domain
      to: contactEmailTo,
      subject: `New Consultation Request: ${fullName}`,
      html: emailHtml,
      replyTo: email,
    });

    if (error) {
      console.error("Resend API returned error:", error);
      return {
        success: false,
        error: error.message || "Failed to dispatch consultation email via Resend.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("sendConsultationEmail unexpected error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected server error occurred.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
