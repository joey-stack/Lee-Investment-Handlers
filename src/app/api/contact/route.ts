import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/contactSchema";
import { sendConsultationEmail } from "@/services/contactService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body structure with Zod schema
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      const errorMap: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        errorMap[fieldName] = issue.message;
      });
      return NextResponse.json(
        { success: false, errors: errorMap },
        { status: 400 }
      );
    }

    // Call Resend email delivery service
    const serviceResponse = await sendConsultationEmail(result.data);
    
    if (!serviceResponse.success) {
      return NextResponse.json(
        { success: false, error: serviceResponse.error || "Internal mail service failure." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("API route /api/contact exception:", err);
    return NextResponse.json(
      { success: false, error: "An internal server error occurred while processing your request." },
      { status: 500 }
    );
  }
}
