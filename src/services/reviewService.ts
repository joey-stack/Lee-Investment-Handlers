import { 
  collection, 
  getDocsFromServer, 
  getDoc, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Testimonial } from "@/types";
import { testimonials as staticTestimonials } from "@/lib/content/testimonials";

const COLLECTION_NAME = "reviews";

// Helper to determine if Firebase is configured
const isFirebaseConfigured = (): boolean => {
  return !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
         process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "placeholder_api_key";
};

// Seed Firestore with static reviews if the collection is empty
export async function seedReviewsIfEmpty(): Promise<void> {
  if (!isFirebaseConfigured()) return;

  try {
    const reviewsCol = collection(db, COLLECTION_NAME);
    const snapshot = await getDocsFromServer(reviewsCol);

    if (snapshot.empty) {
      console.log("Firestore reviews collection is empty. Seeding static testimonials...");
      for (const item of staticTestimonials) {
        await setDoc(doc(db, COLLECTION_NAME, item.id), {
          name: item.attribution,
          rating: item.rating,
          comment: item.quote,
          approved: true,
          createdAt: new Date().toISOString()
        });
      }
      console.log("Static testimonials successfully seeded to Firestore reviews.");
    }
  } catch (error) {
    console.error("Error seeding static testimonials:", error);
  }
}

// Fetch all approved reviews from Firestore, with fallback to static copy
export async function getApprovedReviews(): Promise<Testimonial[]> {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase not configured. Falling back to static testimonials.");
    return staticTestimonials;
  }

  try {
    await seedReviewsIfEmpty();

    const reviewsCol = collection(db, COLLECTION_NAME);
    const q = query(reviewsCol, where("approved", "==", true), orderBy("createdAt", "desc"));
    const snapshot = await getDocsFromServer(q);

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        quote: data.comment || "",
        attribution: data.name || "Anonymous",
        role: "", // Role is deprecated on the frontend card rendering
        rating: typeof data.rating === "number" ? data.rating : 5
      } as Testimonial;
    });
  } catch (error) {
    console.error("Failed to fetch approved reviews from Firestore. Falling back to static data:", error);
    return staticTestimonials;
  }
}

// Fetch all reviews (approved & pending) for admin dashboard
export async function getAllReviews(): Promise<any[]> {
  if (!isFirebaseConfigured()) {
    return [];
  }

  try {
    await seedReviewsIfEmpty();

    const reviewsCol = collection(db, COLLECTION_NAME);
    const q = query(reviewsCol, orderBy("createdAt", "desc"));
    const snapshot = await getDocsFromServer(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "Anonymous",
        rating: data.rating || 5,
        comment: data.comment || "",
        approved: !!data.approved,
        createdAt: data.createdAt || new Date().toISOString()
      };
    });
  } catch (error) {
    console.error("Failed to fetch all reviews from Firestore:", error);
    return [];
  }
}

// Submit a new review from the public modal
export async function submitReview(name: string, rating: number, comment: string): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  const reviewsCol = collection(db, COLLECTION_NAME);
  await addDoc(reviewsCol, {
    name,
    rating,
    comment,
    approved: false, // Moderated by default
    createdAt: new Date().toISOString()
  });
}

// Approve a review
export async function approveReview(id: string): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    approved: true
  });
}

// Disapprove a review (back to pending)
export async function disapproveReview(id: string): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    approved: false
  });
}

// Delete a review permanently
export async function deleteReview(id: string): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

// Create a review manually (admin CRUD)
export async function createReview(reviewData: { name: string; rating: number; comment: string; approved: boolean }): Promise<string> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  const reviewsCol = collection(db, COLLECTION_NAME);
  const docRef = await addDoc(reviewsCol, {
    ...reviewData,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

// Update an existing review (admin CRUD)
export async function updateReview(id: string, reviewData: { name?: string; rating?: number; comment?: string; approved?: boolean }): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...reviewData,
    updatedAt: new Date().toISOString()
  });
}
