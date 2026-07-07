"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getPosts, deletePost } from "@/services/blogService";
import { 
  getAllReviews, 
  approveReview, 
  disapproveReview, 
  deleteReview, 
  createReview, 
  updateReview 
} from "@/services/reviewService";
import { InsightArticle } from "@/types";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { 
  Plus, 
  LogOut, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  ExternalLink,
  BookOpen,
  FileText,
  Star,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Check,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { logout } = useAuth();
  
  // Tab State
  const [activeTab, setActiveTab] = useState<"articles" | "reviews">("articles");

  // Blog Articles State
  const [posts, setPosts] = useState<InsightArticle[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsSearchQuery, setPostsSearchQuery] = useState("");
  const [postsCategoryFilter, setPostsCategoryFilter] = useState("All");
  const [postDeleteConfirmId, setPostDeleteConfirmId] = useState<string | null>(null);
  const [isPostDeleting, setIsPostDeleting] = useState(false);

  // Client Reviews State
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsSearchQuery, setReviewsSearchQuery] = useState("");
  const [reviewsFilter, setReviewsFilter] = useState("All"); // "All" | "Approved" | "Pending"
  const [reviewDeleteConfirmId, setReviewDeleteConfirmId] = useState<string | null>(null);
  const [isReviewDeleting, setIsReviewDeleting] = useState(false);

  // Admin Review Creator/Editor States
  const [isReviewCreateOpen, setIsReviewCreateOpen] = useState(false);
  const [isReviewEditOpen, setIsReviewEditOpen] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [reviewFormName, setReviewFormName] = useState("");
  const [reviewFormRating, setReviewFormRating] = useState(5);
  const [reviewFormComment, setReviewFormComment] = useState("");
  const [reviewFormApproved, setReviewFormApproved] = useState(true);
  const [reviewFormIsSubmitting, setReviewFormIsSubmitting] = useState(false);
  const [reviewFormError, setReviewFormError] = useState<string | null>(null);

  // Global Notification State
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchBlogPosts();
    fetchReviews();
  }, []);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Blog Handlers
  const fetchBlogPosts = async () => {
    setPostsLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching admin posts:", error);
    } finally {
      setPostsLoading(false);
    }
  };

  const handlePostDelete = async (id: string) => {
    setIsPostDeleting(true);
    try {
      await deletePost(id);
      showNotification("success", "Article successfully deleted.");
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Delete article failure:", error);
      showNotification("error", "Failed to delete article. Please try again.");
    } finally {
      setIsPostDeleting(false);
      setPostDeleteConfirmId(null);
    }
  };

  // Reviews Handlers
  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const data = await getAllReviews();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching admin reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleReviewDelete = async (id: string) => {
    setIsReviewDeleting(true);
    try {
      await deleteReview(id);
      showNotification("success", "Review permanently deleted.");
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Delete review failure:", error);
      showNotification("error", "Failed to delete review. Please try again.");
    } finally {
      setIsReviewDeleting(false);
      setReviewDeleteConfirmId(null);
    }
  };

  const handleToggleApproval = async (id: string, currentApproved: boolean) => {
    try {
      if (currentApproved) {
        await disapproveReview(id);
        showNotification("success", "Review status changed to pending.");
      } else {
        await approveReview(id);
        showNotification("success", "Review status approved. Visible on site.");
      }
      setReviews(reviews.map((r) => r.id === id ? { ...r, approved: !currentApproved } : r));
    } catch (error) {
      console.error("Approval toggle failure:", error);
      showNotification("error", "Failed to update review status.");
    }
  };

  const openCreateReviewModal = () => {
    setReviewFormName("");
    setReviewFormRating(5);
    setReviewFormComment("");
    setReviewFormApproved(true);
    setReviewFormError(null);
    setIsReviewCreateOpen(true);
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewFormName.trim() || !reviewFormComment.trim()) {
      setReviewFormError("Please fill out all fields.");
      return;
    }

    setReviewFormIsSubmitting(true);
    setReviewFormError(null);

    try {
      await createReview({
        name: reviewFormName.trim(),
        rating: reviewFormRating,
        comment: reviewFormComment.trim(),
        approved: reviewFormApproved
      });
      showNotification("success", "Review successfully created.");
      setIsReviewCreateOpen(false);
      fetchReviews();
    } catch (error) {
      console.error("Create review failure:", error);
      setReviewFormError("Failed to create review. Please try again.");
    } finally {
      setReviewFormIsSubmitting(false);
    }
  };

  const openEditReviewModal = (review: any) => {
    setEditingReviewId(review.id);
    setReviewFormName(review.name);
    setReviewFormRating(review.rating);
    setReviewFormComment(review.comment);
    setReviewFormApproved(review.approved);
    setReviewFormError(null);
    setIsReviewEditOpen(true);
  };

  const handleUpdateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReviewId) return;
    if (!reviewFormName.trim() || !reviewFormComment.trim()) {
      setReviewFormError("Please fill out all fields.");
      return;
    }

    setReviewFormIsSubmitting(true);
    setReviewFormError(null);

    try {
      await updateReview(editingReviewId, {
        name: reviewFormName.trim(),
        rating: reviewFormRating,
        comment: reviewFormComment.trim(),
        approved: reviewFormApproved
      });
      showNotification("success", "Review successfully updated.");
      setIsReviewEditOpen(false);
      setEditingReviewId(null);
      fetchReviews();
    } catch (error) {
      console.error("Update review failure:", error);
      setReviewFormError("Failed to update review.");
    } finally {
      setReviewFormIsSubmitting(false);
    }
  };

  // Filters
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(postsSearchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(postsSearchQuery.toLowerCase());
    const matchesCategory = 
      postsCategoryFilter === "All" || post.category.toLowerCase() === postsCategoryFilter.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = 
      review.name.toLowerCase().includes(reviewsSearchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(reviewsSearchQuery.toLowerCase());
    
    const matchesFilter = 
      reviewsFilter === "All" ||
      (reviewsFilter === "Approved" && review.approved) ||
      (reviewsFilter === "Pending" && !review.approved);

    return matchesSearch && matchesFilter;
  });

  const categories = ["All", "Insights", "News"];
  const reviewFilterOptions = ["All", "Approved", "Pending"];

  return (
    <div className="py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* Navigation Tabs Switcher */}
        <div className="flex border-b border-brand-border/60 mb-10">
          <button
            onClick={() => setActiveTab("articles")}
            className={cn(
              "px-6 py-3.5 text-xs font-heading font-medium tracking-widest uppercase border-b-2 transition-all duration-200 cursor-pointer select-none -mb-[2px]",
              activeTab === "articles" 
                ? "border-brand-alternate text-brand-alternate font-bold" 
                : "border-transparent text-brand-secondary hover:text-brand-primary"
            )}
          >
            Blog Articles
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={cn(
              "px-6 py-3.5 text-xs font-heading font-medium tracking-widest uppercase border-b-2 transition-all duration-200 cursor-pointer select-none -mb-[2px]",
              activeTab === "reviews" 
                ? "border-brand-alternate text-brand-alternate font-bold" 
                : "border-transparent text-brand-secondary hover:text-brand-primary"
            )}
          >
            Client Reviews
          </button>
        </div>

        {/* Global Notifications */}
        {notification && (
          <div className={cn(
            "mb-8 p-4 rounded-[6px] border flex items-center gap-3 text-sm animate-fade-up",
            notification.type === "success" 
              ? "bg-green-50 border-green-200 text-green-700" 
              : "bg-red-50 border-red-200 text-red-700"
          )}>
            {notification.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span className="font-light">{notification.message}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 1: ARTICLES VIEW */}
        {/* ========================================================================= */}
        {activeTab === "articles" && (
          <div>
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
              <div>
                <h1 className="font-heading text-3xl font-normal leading-tight tracking-tight text-brand-primary">
                  Blog Article Management
                </h1>
                <p className="text-sm text-brand-secondary mt-1 font-light leading-relaxed">
                  Create, edit, and publish economic insights and press releases.
                </p>
              </div>
              <Link href="/admin/dashboard/new">
                <Button
                  variant="primary"
                  className="flex items-center gap-2 select-none h-12 shadow-[0px_4px_12px_rgba(200,169,110,0.15)] text-brand-primary font-medium"
                >
                  <Plus size={16} />
                  <span>Create New Post</span>
                </Button>
              </Link>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-brand-bg-primary border border-brand-border rounded-[6px] p-6 flex items-center gap-5">
                <div className="h-12 w-12 bg-brand-alternate/10 text-brand-alternate flex items-center justify-center border border-brand-alternate/20">
                  <FileText size={20} />
                </div>
                <div>
                  <span className="block text-xs font-medium text-brand-secondary uppercase tracking-wider">Total Articles</span>
                  <span className="text-2xl font-semibold text-brand-primary">{posts.length}</span>
                </div>
              </div>

              <div className="bg-brand-bg-primary border border-brand-border rounded-[6px] p-6 flex items-center gap-5">
                <div className="h-12 w-12 bg-green-500/10 text-green-600 flex items-center justify-center border border-green-500/20">
                  <Star size={20} />
                </div>
                <div>
                  <span className="block text-xs font-medium text-brand-secondary uppercase tracking-wider">Featured Posts</span>
                  <span className="text-2xl font-semibold text-brand-primary">
                    {posts.filter(p => p.featured).length}
                  </span>
                </div>
              </div>

              <div className="bg-brand-bg-primary border border-brand-border rounded-[6px] p-6 flex items-center gap-5">
                <div className="h-12 w-12 bg-blue-500/10 text-blue-600 flex items-center justify-center border border-blue-500/20">
                  <BookOpen size={20} />
                </div>
                <div>
                  <span className="block text-xs font-medium text-brand-secondary uppercase tracking-wider">Active Categories</span>
                  <span className="text-2xl font-semibold text-brand-primary">
                    {new Set(posts.map(p => p.category)).size}
                  </span>
                </div>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-brand-bg-primary border border-brand-border rounded-[6px] p-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-secondary/60">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  value={postsSearchQuery}
                  onChange={(e) => setPostsSearchQuery(e.target.value)}
                  placeholder="Search articles by title or content..."
                  className="w-full h-11 pl-10 pr-4 bg-brand-bg-secondary text-brand-primary border border-brand-border rounded-[6px] text-sm focus:outline-none focus:border-brand-primary transition-colors duration-250 placeholder-brand-secondary/50 font-medium"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-brand-secondary uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                  <Filter size={12} />
                  Filter by Category
                </span>
                <div className="flex border border-brand-border rounded-[6px] overflow-hidden bg-brand-bg-secondary p-0.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setPostsCategoryFilter(cat)}
                      className={`px-4 py-1.5 text-xs font-semibold rounded-[4px] cursor-pointer select-none transition-all duration-200 ${
                        postsCategoryFilter === cat
                          ? "bg-brand-bg-primary text-brand-primary shadow-[0_2px_4px_rgba(0,0,0,0.04)]"
                          : "text-brand-secondary hover:text-brand-primary"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Articles Table */}
            <div className="bg-brand-bg-primary border border-brand-border rounded-[6px] overflow-hidden shadow-[0px_4px_16px_rgba(0,0,0,0.02)]">
              {postsLoading ? (
                <div className="py-24 text-center flex flex-col items-center justify-center">
                  <div className="h-8 w-8 border-2 border-brand-alternate/20 border-t-brand-alternate rounded-full animate-spin mb-4" />
                  <span className="text-xs text-brand-secondary tracking-widest uppercase">Loading database...</span>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="py-24 text-center">
                  <FileText className="mx-auto text-brand-secondary/40 mb-4" size={40} strokeWidth={1.5} />
                  <h3 className="font-heading text-lg font-normal text-brand-primary mb-1">No articles found</h3>
                  <p className="font-body text-sm text-brand-secondary font-light max-w-sm mx-auto leading-relaxed">
                    {postsSearchQuery || postsCategoryFilter !== "All"
                      ? "Try adjusting your search keywords or removing active category filters."
                      : "Your blog collection is empty. Click 'Create New Post' to populate the feed."}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-brand-border bg-brand-bg-secondary/40">
                        <th className="py-4 px-6 text-xs font-semibold text-brand-secondary uppercase tracking-wider">Article Title</th>
                        <th className="py-4 px-6 text-xs font-semibold text-brand-secondary uppercase tracking-wider">Category</th>
                        <th className="py-4 px-6 text-xs font-semibold text-brand-secondary uppercase tracking-wider font-body">Author</th>
                        <th className="py-4 px-6 text-xs font-semibold text-brand-secondary uppercase tracking-wider text-center">Featured</th>
                        <th className="py-4 px-6 text-xs font-semibold text-brand-secondary uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/60">
                      {filteredPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-brand-bg-secondary/20 transition-colors duration-150">
                          <td className="py-4 px-6">
                            <div className="max-w-md">
                              <span className="block font-body font-semibold text-brand-primary text-sm line-clamp-1">
                                {post.title}
                              </span>
                              <span className="block font-body text-xs text-brand-secondary line-clamp-1 mt-0.5 font-light">
                                {post.excerpt}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <span className={cn(
                              "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold select-none border",
                              post.category.toLowerCase() === "news" 
                                ? "bg-amber-50 text-amber-700 border-amber-200/50" 
                                : "bg-emerald-50 text-emerald-700 border-emerald-200/50"
                            )}>
                              {post.category}
                            </span>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm text-brand-primary font-medium">
                            {post.author || "Osazuwa Omoregie"}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-center">
                            {post.featured ? (
                              <span className="inline-flex text-brand-alternate" title="Featured Article">
                                <Star size={16} fill="currentColor" />
                              </span>
                            ) : (
                              <span className="text-brand-secondary/30">—</span>
                            )}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-2.5">
                              <Link href={`/insights/${post.slug}`} target="_blank">
                                <button className="p-1.5 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded cursor-pointer transition-all" title="View Public Post">
                                  <ExternalLink size={15} />
                                </button>
                              </Link>
                              <Link href={`/admin/dashboard/edit/${post.id}`}>
                                <button className="p-1.5 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded cursor-pointer transition-all" title="Edit Post">
                                  <Edit3 size={15} />
                                </button>
                              </Link>
                              <button 
                                onClick={() => setPostDeleteConfirmId(post.id)}
                                className="p-1.5 text-brand-secondary hover:text-red-600 hover:bg-red-50 rounded cursor-pointer transition-all"
                                title="Delete Post"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CLIENT REVIEWS VIEW */}
        {/* ========================================================================= */}
        {activeTab === "reviews" && (
          <div>
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
              <div>
                <h1 className="font-heading text-3xl font-normal leading-tight tracking-tight text-brand-primary">
                  Client Reviews Moderation
                </h1>
                <p className="text-sm text-brand-secondary mt-1 font-light leading-relaxed">
                  Approve client-submitted reviews to render them live on the public homepage, or manually input reviews.
                </p>
              </div>
              <Button
                variant="primary"
                onClick={openCreateReviewModal}
                className="flex items-center gap-2 select-none h-12 shadow-[0px_4px_12px_rgba(200,169,110,0.15)] text-brand-primary font-medium"
              >
                <Plus size={16} />
                <span>Create New Review</span>
              </Button>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-brand-bg-primary border border-brand-border rounded-[6px] p-6 flex items-center gap-5">
                <div className="h-12 w-12 bg-brand-alternate/10 text-brand-alternate flex items-center justify-center border border-brand-alternate/20">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <span className="block text-xs font-medium text-brand-secondary uppercase tracking-wider">Total Reviews</span>
                  <span className="text-2xl font-semibold text-brand-primary">{reviews.length}</span>
                </div>
              </div>

              <div className="bg-brand-bg-primary border border-brand-border rounded-[6px] p-6 flex items-center gap-5">
                <div className="h-12 w-12 bg-green-500/10 text-green-600 flex items-center justify-center border border-green-500/20">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <span className="block text-xs font-medium text-brand-secondary uppercase tracking-wider">Approved Live</span>
                  <span className="text-2xl font-semibold text-brand-primary">
                    {reviews.filter(r => r.approved).length}
                  </span>
                </div>
              </div>

              <div className="bg-brand-bg-primary border border-brand-border rounded-[6px] p-6 flex items-center gap-5">
                <div className="h-12 w-12 bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <span className="block text-xs font-medium text-brand-secondary uppercase tracking-wider">Pending Review</span>
                  <span className="text-2xl font-semibold text-brand-primary">
                    {reviews.filter(r => !r.approved).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-brand-bg-primary border border-brand-border rounded-[6px] p-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-secondary/60">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  value={reviewsSearchQuery}
                  onChange={(e) => setReviewsSearchQuery(e.target.value)}
                  placeholder="Search reviews by client name or comments..."
                  className="w-full h-11 pl-10 pr-4 bg-brand-bg-secondary text-brand-primary border border-brand-border rounded-[6px] text-sm focus:outline-none focus:border-brand-primary transition-colors duration-250 placeholder-brand-secondary/50 font-medium"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-brand-secondary uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                  <Filter size={12} />
                  Filter by Status
                </span>
                <div className="flex border border-brand-border rounded-[6px] overflow-hidden bg-brand-bg-secondary p-0.5">
                  {reviewFilterOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setReviewsFilter(opt)}
                      className={`px-4 py-1.5 text-xs font-semibold rounded-[4px] cursor-pointer select-none transition-all duration-200 ${
                        reviewsFilter === opt
                          ? "bg-brand-bg-primary text-brand-primary shadow-[0_2px_4px_rgba(0,0,0,0.04)]"
                          : "text-brand-secondary hover:text-brand-primary"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Table */}
            <div className="bg-brand-bg-primary border border-brand-border rounded-[6px] overflow-hidden shadow-[0px_4px_16px_rgba(0,0,0,0.02)]">
              {reviewsLoading ? (
                <div className="py-24 text-center flex flex-col items-center justify-center">
                  <div className="h-8 w-8 border-2 border-brand-alternate/20 border-t-brand-alternate rounded-full animate-spin mb-4" />
                  <span className="text-xs text-brand-secondary tracking-widest uppercase">Loading database...</span>
                </div>
              ) : filteredReviews.length === 0 ? (
                <div className="py-24 text-center">
                  <MessageSquare className="mx-auto text-brand-secondary/40 mb-4" size={40} strokeWidth={1.5} />
                  <h3 className="font-heading text-lg font-normal text-brand-primary mb-1">No reviews found</h3>
                  <p className="font-body text-sm text-brand-secondary font-light max-w-sm mx-auto leading-relaxed">
                    {reviewsSearchQuery || reviewsFilter !== "All"
                      ? "Try adjusting your search keywords or removing active status filters."
                      : "Your review collection is empty. Submit a review from the client side first."}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-brand-border bg-brand-bg-secondary/40">
                        <th className="py-4 px-6 text-xs font-semibold text-brand-secondary uppercase tracking-wider">Client Details</th>
                        <th className="py-4 px-6 text-xs font-semibold text-brand-secondary uppercase tracking-wider text-center">Rating</th>
                        <th className="py-4 px-6 text-xs font-semibold text-brand-secondary uppercase tracking-wider">Review Text</th>
                        <th className="py-4 px-6 text-xs font-semibold text-brand-secondary uppercase tracking-wider text-center">Approval</th>
                        <th className="py-4 px-6 text-xs font-semibold text-brand-secondary uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/60">
                      {filteredReviews.map((review) => (
                        <tr key={review.id} className="hover:bg-brand-bg-secondary/20 transition-colors duration-150">
                          {/* Client name / date */}
                          <td className="py-4 px-6 whitespace-nowrap">
                            <span className="block font-body font-semibold text-brand-primary text-sm">
                              {review.name}
                            </span>
                            <span className="block font-body text-[10px] text-brand-secondary/70 font-light mt-0.5">
                              {new Date(review.createdAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                              })}
                            </span>
                          </td>

                          {/* Star rating display */}
                          <td className="py-4 px-6 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center gap-0.5 text-brand-alternate">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} size={12} className="fill-brand-alternate text-brand-alternate" />
                              ))}
                              {Array.from({ length: 5 - review.rating }).map((_, i) => (
                                <Star key={i} size={12} className="text-brand-border" />
                              ))}
                            </div>
                          </td>

                          {/* Review comment text */}
                          <td className="py-4 px-6">
                            <p className="font-body text-xs md:text-sm text-brand-secondary max-w-sm line-clamp-2 leading-relaxed">
                              {review.comment}
                            </p>
                          </td>

                          {/* Status / Toggle button */}
                          <td className="py-4 px-6 whitespace-nowrap text-center">
                            <button
                              onClick={() => handleToggleApproval(review.id, review.approved)}
                              className={cn(
                                "px-3 py-1 rounded-[4px] text-[10px] font-semibold tracking-wider uppercase select-none border transition-colors cursor-pointer",
                                review.approved 
                                  ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                                  : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                              )}
                            >
                              {review.approved ? "Approved" : "Pending"}
                            </button>
                          </td>

                          {/* Actions: Edit, Delete */}
                          <td className="py-4 px-6 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-2.5">
                              <button 
                                onClick={() => openEditReviewModal(review)}
                                className="p-1.5 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded cursor-pointer transition-all"
                                title="Edit Review Content"
                              >
                                <Edit3 size={15} />
                              </button>
                              <button 
                                onClick={() => setReviewDeleteConfirmId(review.id)}
                                className="p-1.5 text-brand-secondary hover:text-red-600 hover:bg-red-50 rounded cursor-pointer transition-all"
                                title="Delete Review permanently"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* DIALOG 1: BLOG ARTICLE DELETE MODAL */}
      {/* ========================================================================= */}
      {postDeleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setPostDeleteConfirmId(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer" 
          />
          <div className="relative bg-white w-full max-w-sm rounded-[6px] shadow-[0px_24px_64px_rgba(0,0,0,0.16)] p-6 md:p-8 z-10 text-brand-primary select-none font-body">
            <h3 className="font-heading text-xl font-normal leading-tight text-brand-primary mb-3">
              Confirm Article Deletion
            </h3>
            <p className="text-sm text-brand-secondary leading-relaxed font-light mb-6">
              Are you sure you want to permanently delete this article? This action is irreversible.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setPostDeleteConfirmId(null)}
                className="px-5 py-2 text-xs h-auto"
                disabled={isPostDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handlePostDelete(postDeleteConfirmId)}
                className="px-5 py-2 text-xs bg-red-600 text-white hover:bg-red-700 shadow-none border-none font-semibold"
                disabled={isPostDeleting}
              >
                {isPostDeleting ? "Deleting..." : "Permanently Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIALOG 2: CLIENT REVIEW DELETE MODAL */}
      {/* ========================================================================= */}
      {reviewDeleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setReviewDeleteConfirmId(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer" 
          />
          <div className="relative bg-white w-full max-w-sm rounded-[6px] shadow-[0px_24px_64px_rgba(0,0,0,0.16)] p-6 md:p-8 z-10 text-brand-primary select-none font-body">
            <h3 className="font-heading text-xl font-normal leading-tight text-brand-primary mb-3">
              Confirm Review Deletion
            </h3>
            <p className="text-sm text-brand-secondary leading-relaxed font-light mb-6">
              Are you sure you want to permanently delete this client review? This will remove it from the home page.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setReviewDeleteConfirmId(null)}
                className="px-5 py-2 text-xs h-auto"
                disabled={isReviewDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleReviewDelete(reviewDeleteConfirmId)}
                className="px-5 py-2 text-xs bg-red-600 text-white hover:bg-red-700 shadow-none border-none font-semibold"
                disabled={isReviewDeleting}
              >
                {isReviewDeleting ? "Deleting..." : "Permanently Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIALOG 3: CREATE REVIEW MODAL (ADMIN) */}
      {/* ========================================================================= */}
      {isReviewCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsReviewCreateOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer" 
          />
          <div className="relative bg-brand-bg-secondary w-full max-w-md rounded-[6px] shadow-[0px_24px_64px_rgba(0,0,0,0.16)] z-10 text-brand-primary select-none font-body flex flex-col overflow-hidden max-h-[90vh]">
            <button 
              onClick={() => setIsReviewCreateOpen(false)}
              className="absolute top-4 right-4 text-brand-secondary hover:text-brand-primary p-1 cursor-pointer select-none"
            >
              <X size={20} />
            </button>
            <div className="p-6 border-b border-brand-border bg-white">
              <h3 className="font-heading text-xl font-normal leading-tight text-brand-primary">
                Add Client Review manually
              </h3>
              <p className="text-xs text-brand-secondary mt-1 font-light">
                Manually record a review from your offline or email submissions.
              </p>
            </div>
            
            <form onSubmit={handleCreateReview} className="p-6 space-y-4 overflow-y-auto">
              {reviewFormError && (
                <div className="p-3 bg-red-950/10 border border-red-900/20 text-red-400 text-xs rounded">
                  {reviewFormError}
                </div>
              )}

              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-secondary uppercase">Client Name</label>
                <input
                  type="text"
                  value={reviewFormName}
                  onChange={(e) => setReviewFormName(e.target.value)}
                  placeholder="Enter client's full name"
                  className="w-full h-11 px-4 bg-brand-bg-primary text-brand-primary border border-brand-border rounded-[6px] text-sm focus:outline-none focus:border-brand-primary transition-colors placeholder-[#BFAB9C]/30"
                />
              </div>

              {/* Rating */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-secondary uppercase block mb-1">Rating (Stars)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setReviewFormRating(starVal)}
                      className="text-brand-alternate p-0.5 cursor-pointer"
                    >
                      <Star size={24} className={starVal <= reviewFormRating ? "fill-brand-alternate text-brand-alternate" : "text-brand-border"} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review content */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-secondary uppercase">Review Comment</label>
                <textarea
                  rows={3}
                  value={reviewFormComment}
                  onChange={(e) => setReviewFormComment(e.target.value)}
                  placeholder="Enter client's testimonial text..."
                  className="w-full h-24 px-4 py-2 bg-brand-bg-primary text-brand-primary border border-brand-border rounded-[6px] text-sm focus:outline-none focus:border-brand-primary transition-colors resize-none placeholder-[#BFAB9C]/30"
                />
              </div>

              {/* Toggle approved */}
              <div className="flex items-center gap-2 pt-2 pb-1">
                <input
                  id="create-approved"
                  type="checkbox"
                  checked={reviewFormApproved}
                  onChange={(e) => setReviewFormApproved(e.target.checked)}
                  className="h-4 w-4 border-brand-border rounded text-brand-alternate focus:ring-brand-primary"
                />
                <label htmlFor="create-approved" className="text-xs font-semibold text-brand-primary uppercase cursor-pointer">
                  Approve for public feed immediately
                </label>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-full font-medium h-12 shadow-none select-none"
                disabled={reviewFormIsSubmitting}
              >
                {reviewFormIsSubmitting ? "Creating..." : "Save Review"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIALOG 4: EDIT REVIEW MODAL (ADMIN) */}
      {/* ========================================================================= */}
      {isReviewEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsReviewEditOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer" 
          />
          <div className="relative bg-brand-bg-secondary w-full max-w-md rounded-[6px] shadow-[0px_24px_64px_rgba(0,0,0,0.16)] z-10 text-brand-primary select-none font-body flex flex-col overflow-hidden max-h-[90vh]">
            <button 
              onClick={() => setIsReviewEditOpen(false)}
              className="absolute top-4 right-4 text-brand-secondary hover:text-brand-primary p-1 cursor-pointer select-none"
            >
              <X size={20} />
            </button>
            <div className="p-6 border-b border-brand-border bg-white">
              <h3 className="font-heading text-xl font-normal leading-tight text-brand-primary">
                Edit Client Review Details
              </h3>
              <p className="text-xs text-brand-secondary mt-1 font-light">
                Update review text, client identity, or overall star rating.
              </p>
            </div>
            
            <form onSubmit={handleUpdateReview} className="p-6 space-y-4 overflow-y-auto">
              {reviewFormError && (
                <div className="p-3 bg-red-950/10 border border-red-900/20 text-red-400 text-xs rounded">
                  {reviewFormError}
                </div>
              )}

              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-secondary uppercase">Client Name</label>
                <input
                  type="text"
                  value={reviewFormName}
                  onChange={(e) => setReviewFormName(e.target.value)}
                  placeholder="Enter client's full name"
                  className="w-full h-11 px-4 bg-brand-bg-primary text-brand-primary border border-brand-border rounded-[6px] text-sm focus:outline-none focus:border-brand-primary transition-colors placeholder-[#BFAB9C]/30"
                />
              </div>

              {/* Rating */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-secondary uppercase block mb-1">Rating (Stars)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setReviewFormRating(starVal)}
                      className="text-brand-alternate p-0.5 cursor-pointer"
                    >
                      <Star size={24} className={starVal <= reviewFormRating ? "fill-brand-alternate text-brand-alternate" : "text-brand-border"} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review content */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-secondary uppercase">Review Comment</label>
                <textarea
                  rows={3}
                  value={reviewFormComment}
                  onChange={(e) => setReviewFormComment(e.target.value)}
                  placeholder="Enter client's testimonial text..."
                  className="w-full h-24 px-4 py-2 bg-brand-bg-primary text-brand-primary border border-brand-border rounded-[6px] text-sm focus:outline-none focus:border-brand-primary transition-colors resize-none placeholder-[#BFAB9C]/30"
                />
              </div>

              {/* Toggle approved */}
              <div className="flex items-center gap-2 pt-2 pb-1">
                <input
                  id="edit-approved"
                  type="checkbox"
                  checked={reviewFormApproved}
                  onChange={(e) => setReviewFormApproved(e.target.checked)}
                  className="h-4 w-4 border-brand-border rounded text-brand-alternate focus:ring-brand-primary"
                />
                <label htmlFor="edit-approved" className="text-xs font-semibold text-brand-primary uppercase cursor-pointer">
                  Approve for public feed immediately
                </label>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-full font-medium h-12 shadow-none select-none"
                disabled={reviewFormIsSubmitting}
              >
                {reviewFormIsSubmitting ? "Updating..." : "Save Review Changes"}
              </Button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
