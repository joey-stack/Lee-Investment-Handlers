import { ContactFormData, ServiceResponse } from "@/types";

/**
 * Submits the consultation request form data to the client-facing API endpoint.
 * This abstracts network fetch requests from component files.
 */
export async function submitConsultationRequest(
  data: ContactFormData
): Promise<ServiceResponse> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: responseData.error || "Failed to submit consultation request.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("submitConsultationRequest client error:", err);
    return {
      success: false,
      error: "A network error occurred. Please check your connection and try again.",
    };
  }
}
