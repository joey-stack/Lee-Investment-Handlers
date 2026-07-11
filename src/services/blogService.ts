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
import { InsightArticle } from "@/types";
import { insights as staticInsights } from "@/lib/content/insights";

const COLLECTION_NAME = "posts";

// Helper to determine if Firebase is configured
const isFirebaseConfigured = (): boolean => {
  return !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
         process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "placeholder_api_key";
};

// Seed Firestore with static insights if the collection is empty
export async function seedInsightsIfEmpty(): Promise<void> {
  if (!isFirebaseConfigured()) return;

  try {
    const postsCol = collection(db, COLLECTION_NAME);
    const snapshot = await getDocsFromServer(postsCol);

    if (snapshot.empty) {
      console.log("Firestore posts collection is empty. Seeding static insights...");
      for (const item of staticInsights) {
        // Use slug as the document ID for clean lookups and indexing
        await setDoc(doc(db, COLLECTION_NAME, item.slug), {
          ...item,
          // Convert array content to string paragraphs for WYSIWYG compliance if needed
          content: Array.isArray(item.content) 
            ? item.content.map(p => `<p>${p}</p>`).join("") 
            : (item.content || ""),
          tags: item.tags || [item.category],
          createdAt: new Date().toISOString()
        });
      }
      console.log("Static insights successfully seeded to Firestore.");
    }
  } catch (error) {
    console.error("Error seeding static insights:", error);
  }
}

// Fetch all posts from Firestore, with fallback to static copy
export async function getPosts(): Promise<InsightArticle[]> {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase not configured. Falling back to static insights.");
    return staticInsights;
  }

  try {
    // Attempt seeding first if empty
    await seedInsightsIfEmpty();

    const postsCol = collection(db, COLLECTION_NAME);
    const postsQuery = query(postsCol, orderBy("date", "desc"));
    const snapshot = await getDocsFromServer(postsQuery);

    if (snapshot.empty) {
      return staticInsights;
    }

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        excerpt: data.excerpt || "",
        category: data.category || "Insights",
        date: data.date || "",
        slug: data.slug || doc.id,
        featured: !!data.featured,
        image: data.image || "/insights/strategy-execution.jpg",
        content: data.content || "",
        author: data.author || staticInsights.find((item) => item.slug === (data.slug || doc.id))?.author || "Osazuwa Omoregie",
        readTime: data.readTime || "5 min read",
        tags: data.tags || []
      } as InsightArticle;
    });
  } catch (error) {
    console.error("Failed to fetch posts from Firestore. Falling back to static data:", error);
    return staticInsights;
  }
}

// Fetch a single post by slug, with fallback to static copy
export async function getPostBySlug(slug: string): Promise<InsightArticle | null> {
  if (!isFirebaseConfigured()) {
    return staticInsights.find((item) => item.slug === slug) || null;
  }

  try {
    const postsCol = collection(db, COLLECTION_NAME);
    const q = query(postsCol, where("slug", "==", slug));
    const snapshot = await getDocsFromServer(q);

    if (snapshot.empty) {
      // Fallback check in static data
      return staticInsights.find((item) => item.slug === slug) || null;
    }

    const docSnap = snapshot.docs[0];
    if (!docSnap) {
      return staticInsights.find((item) => item.slug === slug) || null;
    }
    const data = docSnap.data();
    return {
      id: docSnap.id,
      title: data.title || "",
      excerpt: data.excerpt || "",
      category: data.category || "Insights",
      date: data.date || "",
      slug: data.slug || docSnap.id,
      featured: !!data.featured,
      image: data.image || "/insights/strategy-execution.jpg",
      content: data.content || "",
      author: data.author || staticInsights.find((item) => item.slug === (data.slug || docSnap.id))?.author || "Osazuwa Omoregie",
      readTime: data.readTime || "5 min read",
      tags: data.tags || []
    } as InsightArticle;
  } catch (error) {
    console.error(`Failed to fetch post by slug: ${slug}. Falling back to static data:`, error);
    return staticInsights.find((item) => item.slug === slug) || null;
  }
}

// Create a new post in Firestore
export async function createPost(postData: Omit<InsightArticle, "id">): Promise<string> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  // Set the document reference with slug as key for indexing
  const docRef = doc(db, COLLECTION_NAME, postData.slug);
  await setDoc(docRef, {
    ...postData,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

// Update an existing post in Firestore
export async function updatePost(id: string, postData: Partial<InsightArticle>): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...postData,
    updatedAt: new Date().toISOString()
  });
}

// Delete a post in Firestore
export async function deletePost(id: string): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

const AUTHORS_COLLECTION = "authors";

const DEFAULT_AUTHORS = [
  "Osazuwa Omoregie",
  "Judith Okafor",
  "Excel Joel",
  "Sarah Mitchell",
  "Michael Chen",
  "David Lee",
  "Uyi Loveday E.",
  "Barr. Adaora Nkem Okafor",
  "Chinedu Alexander Eze",
  "Alessandro Ricci"
];

// Seed Firestore with default authors if the collection is empty
export async function seedAuthorsIfEmpty(): Promise<void> {
  if (!isFirebaseConfigured()) return;

  try {
    const colRef = collection(db, AUTHORS_COLLECTION);
    const snapshot = await getDocsFromServer(colRef);

    if (snapshot.empty) {
      console.log("Firestore authors collection is empty. Seeding default authors...");
      for (const name of DEFAULT_AUTHORS) {
        const docId = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
        await setDoc(doc(db, AUTHORS_COLLECTION, docId), {
          name,
          createdAt: new Date().toISOString()
        });
      }
      console.log("Authors successfully seeded to Firestore.");
    }
  } catch (error) {
    console.error("Error seeding authors:", error);
  }
}

// Fetch all authors from Firestore, with fallback to default list
export async function getAuthors(): Promise<string[]> {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase not configured. Falling back to default authors list.");
    return DEFAULT_AUTHORS;
  }

  try {
    await seedAuthorsIfEmpty();

    const colRef = collection(db, AUTHORS_COLLECTION);
    const snapshot = await getDocsFromServer(colRef);

    if (snapshot.empty) {
      return DEFAULT_AUTHORS;
    }

    const list: string[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.name) {
        list.push(data.name);
      }
    });

    // Sort alphabetically
    return list.sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error("Failed to fetch authors from Firestore. Falling back to default list:", error);
    return DEFAULT_AUTHORS;
  }
}

// Add a new author to Firestore
export async function addAuthor(name: string): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Cannot perform write operations.");
  }

  if (!name || !name.trim()) {
    throw new Error("Author name cannot be empty.");
  }

  const trimmedName = name.trim();
  const docId = trimmedName.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const docRef = doc(db, AUTHORS_COLLECTION, docId);

  await setDoc(docRef, {
    name: trimmedName,
    createdAt: new Date().toISOString()
  });
}

