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

// Async timeout helper to prevent database operations from hanging the browser UI
async function runWithTimeout<T>(promise: Promise<T>, timeoutMs = 8000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Database operation timed out. Please check your internet connection.")), timeoutMs)
    )
  ]);
}

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
          featured: false,
          featuredAt: null,
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
    const q = query(reviewsCol, where("approved", "==", true));
    const snapshot = await getDocsFromServer(q);

    if (snapshot.empty) {
      return [];
    }

    const docs = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        quote: data.comment || "",
        attribution: data.name || "Anonymous",
        role: "", // Role is deprecated on the frontend card rendering
        rating: typeof data.rating === "number" ? data.rating : 5,
        createdAt: data.createdAt || new Date().toISOString(),
        featured: !!data.featured,
        featuredAt: data.featuredAt || ""
      };
    });

    // Sort in-memory by createdAt descending to bypass composite index requirement
    docs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return docs as Testimonial[];
  } catch (error) {
    console.error("Failed to fetch approved reviews from Firestore. Falling back to static data:", error);
    return staticTestimonials;
  }
}

// Fetch exactly the 2 most recently featured reviews for the homepage
export async function getFeaturedReviews(): Promise<Testimonial[]> {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase not configured. Falling back to static testimonials.");
    return staticTestimonials;
  }

  try {
    await seedReviewsIfEmpty();

    const reviewsCol = collection(db, COLLECTION_NAME);
    const q = query(reviewsCol, where("approved", "==", true), where("featured", "==", true));
    const snapshot = await getDocsFromServer(q);

    if (snapshot.empty) {
      // Fallback: If no reviews are featured, return the 2 most recent approved reviews
      const approved = await getApprovedReviews();
      return approved.slice(0, 2);
    }

    const docs = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        quote: data.comment || "",
        attribution: data.name || "Anonymous",
        role: "",
        rating: typeof data.rating === "number" ? data.rating : 5,
        createdAt: data.createdAt || new Date().toISOString(),
        featured: true,
        featuredAt: data.featuredAt || data.createdAt || new Date().toISOString()
      };
    });

    // Sort in-memory by featuredAt descending
    docs.sort((a, b) => b.featuredAt.localeCompare(a.featuredAt));

    return docs.slice(0, 2) as Testimonial[];
  } catch (error) {
    console.error("Failed to fetch featured reviews. Falling back to static data:", error);
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
        featured: !!data.featured,
        featuredAt: data.featuredAt || "",
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
  await runWithTimeout(addDoc(reviewsCol, {
    name,
    rating,
    comment,
    approved: false, // Moderated by default
    featured: false,
    featuredAt: null,
    createdAt: new Date().toISOString()
  }));
}

// Approve a review
export async function approveReview(id: string): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  await runWithTimeout(updateDoc(docRef, {
    approved: true
  }));
}

// Disapprove a review (back to pending)
export async function disapproveReview(id: string): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  await runWithTimeout(updateDoc(docRef, {
    approved: false,
    featured: false, // Automatically unfeature if unapproved
    featuredAt: null
  }));
}

// Toggle featured status of a review
export async function toggleFeatured(id: string, makeFeatured: boolean): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  const docRef = doc(db, COLLECTION_NAME, id);

  if (makeFeatured) {
    // 1. Get all currently featured approved reviews
    const reviewsCol = collection(db, COLLECTION_NAME);
    const q = query(reviewsCol, where("approved", "==", true), where("featured", "==", true));
    const snapshot = await getDocsFromServer(q);

    // Map and sort ascending by featuredAt (oldest first)
    const featuredReviews = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        featuredAt: data.featuredAt || data.createdAt || new Date().toISOString()
      };
    });
    featuredReviews.sort((a, b) => a.featuredAt.localeCompare(b.featuredAt));

    // 2. If count is 2 or more, evict the oldest one
    if (featuredReviews.length >= 2) {
      const oldest = featuredReviews[0];
      if (oldest) {
        const oldestDocRef = doc(db, COLLECTION_NAME, oldest.id);
        await runWithTimeout(updateDoc(oldestDocRef, {
          featured: false,
          featuredAt: null
        }));
      }
    }

    // 3. Mark the target review as featured (and ensure approved is true)
    await runWithTimeout(updateDoc(docRef, {
      approved: true,
      featured: true,
      featuredAt: new Date().toISOString()
    }));
  } else {
    // Unfeature
    await runWithTimeout(updateDoc(docRef, {
      featured: false,
      featuredAt: null
    }));
  }
}

// Delete a review permanently
export async function deleteReview(id: string): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  await runWithTimeout(deleteDoc(docRef));
}

// Create a review manually (admin CRUD)
export async function createReview(reviewData: { name: string; rating: number; comment: string; approved: boolean; featured?: boolean }): Promise<string> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  // If new review is marked as featured, apply queue eviction logic first
  if (reviewData.featured && reviewData.approved) {
    const reviewsCol = collection(db, COLLECTION_NAME);
    const q = query(reviewsCol, where("approved", "==", true), where("featured", "==", true));
    const snapshot = await getDocsFromServer(q);

    const featuredReviews = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        featuredAt: data.featuredAt || data.createdAt || new Date().toISOString()
      };
    });
    featuredReviews.sort((a, b) => a.featuredAt.localeCompare(b.featuredAt));

    if (featuredReviews.length >= 2) {
      const oldest = featuredReviews[0];
      if (oldest) {
        const oldestDocRef = doc(db, COLLECTION_NAME, oldest.id);
        await runWithTimeout(updateDoc(oldestDocRef, {
          featured: false,
          featuredAt: null
        }));
      }
    }
  }

  const reviewsCol = collection(db, COLLECTION_NAME);
  const docRef = await runWithTimeout(addDoc(reviewsCol, {
    name: reviewData.name,
    rating: reviewData.rating,
    comment: reviewData.comment,
    approved: !!reviewData.approved,
    featured: !!reviewData.featured,
    featuredAt: reviewData.featured ? new Date().toISOString() : null,
    createdAt: new Date().toISOString()
  }));
  return docRef.id;
}

// Update an existing review (admin CRUD)
export async function updateReview(id: string, reviewData: { name?: string; rating?: number; comment?: string; approved?: boolean; featured?: boolean }): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  // If toggling featured to true, apply queue eviction logic
  if (reviewData.featured && (reviewData.approved !== false)) {
    const reviewsCol = collection(db, COLLECTION_NAME);
    const q = query(reviewsCol, where("approved", "==", true), where("featured", "==", true));
    const snapshot = await getDocsFromServer(q);

    const featuredReviews = snapshot.docs
      .filter((doc) => doc.id !== id) // Exclude current doc
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          featuredAt: data.featuredAt || data.createdAt || new Date().toISOString()
        };
      });
    featuredReviews.sort((a, b) => a.featuredAt.localeCompare(b.featuredAt));

    if (featuredReviews.length >= 2) {
      const oldest = featuredReviews[0];
      if (oldest) {
        const oldestDocRef = doc(db, COLLECTION_NAME, oldest.id);
        await runWithTimeout(updateDoc(oldestDocRef, {
          featured: false,
          featuredAt: null
        }));
      }
    }
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  const updateData: any = { ...reviewData };
  if (reviewData.featured !== undefined) {
    updateData.featured = !!reviewData.featured;
    updateData.featuredAt = reviewData.featured ? new Date().toISOString() : null;
  }
  updateData.updatedAt = new Date().toISOString();

  await runWithTimeout(updateDoc(docRef, updateData));
}
