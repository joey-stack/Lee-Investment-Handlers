"use client";

import React, { use, useState, useEffect } from "react";
import { AdminGuard } from "@/components/layout/AdminGuard";
import { BlogEditor } from "@/components/sections/BlogEditor";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { InsightArticle } from "@/types";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const { id } = use(params);
  const [post, setPost] = useState<InsightArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as InsightArticle);
        }
      } catch (error) {
        console.error("Error loading post to edit:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  return (
    <div className="py-6 font-body">
      {loading ? (
        <div className="py-24 text-center flex flex-col items-center justify-center">
          <div className="h-8 w-8 border-2 border-brand-alternate/20 border-t-brand-alternate rounded-full animate-spin mb-4" />
          <span className="text-xs text-brand-secondary tracking-widest uppercase">Fetching Post Content...</span>
        </div>
      ) : post ? (
        <BlogEditor initialPost={post} />
      ) : (
        <div className="py-24 text-center">
          <h3 className="font-heading text-lg font-normal text-brand-primary mb-1">Post not found</h3>
          <p className="font-body text-sm text-brand-secondary font-light max-w-sm mx-auto leading-relaxed">
            The article you are trying to edit does not exist or has been deleted from the database.
          </p>
        </div>
      )}
    </div>
  );
}
