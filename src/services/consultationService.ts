import { ContactFormData, ServiceResponse } from "@/types";
import { collection, getDocsFromServer, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

/**
 * Fetches all consultation requests from Firestore for the admin dashboard.
 */
export async function getConsultations(): Promise<any[]> {
  try {
    if (!db) {
      console.warn("Firestore db not initialized, cannot fetch consultations.");
      return [];
    }
    const consultationsCol = collection(db, "consultations");
    const q = query(consultationsCol, orderBy("createdAt", "desc"));
    const snapshot = await getDocsFromServer(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (err) {
    console.error("Failed to fetch consultations from Firestore:", err);
    return [];
  }
}

/**
 * Deletes a consultation request by ID in Firestore.
 */
export async function deleteConsultation(id: string): Promise<void> {
  try {
    if (!db) {
      throw new Error("Firestore db not initialized.");
    }
    const docRef = doc(db, "consultations", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error(`Failed to delete consultation ${id}:`, err);
    throw err;
  }
}

