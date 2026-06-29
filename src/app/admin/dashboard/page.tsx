"use client";

import React, { useState, useEffect } from "react";
import { AdminGuard } from "@/components/layout/AdminGuard";
import { useAuth } from "@/context/AuthContext";
import { getPosts, deletePost } from "@/services/blogService";
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
  AlertCircle
} from "lucide-react";

export default function AdminDashboardPage() {
  const { logout, user } = useAuth();
  const [posts, setPosts] = useState<InsightArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching admin posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deletePost(id);
      setNotification({ type: "success", message: "Article successfully deleted." });
      setPosts(posts.filter((post) => post.id !== id));
      setTimeout(() => setNotification(null), 3000);
    } catch (error: any) {
      console.error("Delete failure:", error);
      setNotification({ type: "error", message: "Failed to delete article. Please try again." });
    } finally {
      setIsDeleting(false);
      setDeleteConfirmId(null);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      categoryFilter === "All" || post.category.toLowerCase() === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Insights", "News"];

  return (
    <div className="py-10">
      {/* Dashboard Shell */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          {/* Headline and Primary action */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
            <div>
              <h1 className="font-heading text-3xl md:text-[36px] font-normal leading-[1.2] text-brand-primary">
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

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-brand-bg-primary border border-brand-border rounded-[6px] p-6 flex items-center gap-5">
              <div className="h-12 w-12 bg-brand-alternate/10 text-brand-alternate flex items-center justify-center rounded-none border border-brand-alternate/20">
                <FileText size={20} />
              </div>
              <div>
                <span className="block text-xs font-medium text-brand-secondary uppercase tracking-wider">Total Articles</span>
                <span className="text-2xl font-semibold text-brand-primary">{posts.length}</span>
              </div>
            </div>

            <div className="bg-brand-bg-primary border border-brand-border rounded-[6px] p-6 flex items-center gap-5">
              <div className="h-12 w-12 bg-green-500/10 text-green-600 flex items-center justify-center rounded-none border border-green-500/20">
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
              <div className="h-12 w-12 bg-blue-500/10 text-blue-600 flex items-center justify-center rounded-none border border-blue-500/20">
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

          {/* Notifications */}
          {notification && (
            <div className={`mb-6 p-4 rounded-[6px] border flex items-center gap-3 text-sm ${
              notification.type === "success" 
                ? "bg-green-50 border-green-200 text-green-700" 
                : "bg-red-50 border-red-200 text-red-700"
            }`}>
              {notification.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span className="font-light">{notification.message}</span>
            </div>
          )}

          {/* Filters Bar */}
          <div className="bg-brand-bg-primary border border-brand-border rounded-[6px] p-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-secondary/60">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title or content..."
                className="w-full h-11 pl-10 pr-4 bg-brand-bg-secondary text-brand-primary border border-brand-border rounded-[6px] text-sm focus:outline-none focus:border-brand-primary transition-colors duration-250 placeholder-brand-secondary/50 font-medium"
              />
            </div>

            {/* Category selection */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-brand-secondary uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                <Filter size={12} />
                Filter by Category
              </span>
              <div className="flex border border-brand-border rounded-[6px] overflow-hidden bg-brand-bg-secondary p-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-[4px] cursor-pointer select-none transition-all duration-200 ${
                      categoryFilter === cat
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

          {/* Articles Management Table/List */}
          <div className="bg-brand-bg-primary border border-brand-border rounded-[6px] overflow-hidden shadow-[0px_4px_16px_rgba(0,0,0,0.02)]">
            {loading ? (
              <div className="py-24 text-center flex flex-col items-center justify-center">
                <div className="h-8 w-8 border-2 border-brand-alternate/20 border-t-brand-alternate rounded-full animate-spin mb-4" />
                <span className="text-xs text-brand-secondary tracking-widest uppercase">Loading database...</span>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="py-24 text-center">
                <FileText className="mx-auto text-brand-secondary/40 mb-4" size={40} strokeWidth={1.5} />
                <h3 className="font-heading text-lg font-normal text-brand-primary mb-1">No articles found</h3>
                <p className="font-body text-sm text-brand-secondary font-light max-w-sm mx-auto leading-relaxed">
                  {searchQuery || categoryFilter !== "All"
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
                      <th className="py-4 px-6 text-xs font-semibold text-brand-secondary uppercase tracking-wider">Published Date</th>
                      <th className="py-4 px-6 text-xs font-semibold text-brand-secondary uppercase tracking-wider text-center">Featured</th>
                      <th className="py-4 px-6 text-xs font-semibold text-brand-secondary uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/60">
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-brand-bg-secondary/20 transition-colors duration-150">
                        {/* Title */}
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

                        {/* Category */}
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold select-none ${
                            post.category.toLowerCase() === "news" 
                              ? "bg-amber-50 text-amber-700 border border-amber-200/50" 
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                          }`}>
                            {post.category}
                          </span>
                        </td>

                        {/* Author */}
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-brand-primary font-medium">
                          {post.author || "David Lee"}
                        </td>

                        {/* Date */}
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-brand-secondary font-light">
                          {post.date}
                        </td>

                        {/* Featured */}
                        <td className="py-4 px-6 whitespace-nowrap text-center">
                          {post.featured ? (
                            <span className="inline-flex text-brand-alternate" title="Featured Article">
                              <Star size={16} fill="currentColor" />
                            </span>
                          ) : (
                            <span className="text-brand-secondary/30">—</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2.5">
                            <Link href={`/insights/${post.slug}`} target="_blank">
                              <button 
                                className="p-1.5 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded transition-all cursor-pointer"
                                title="View Public Post"
                              >
                                <ExternalLink size={15} />
                              </button>
                            </Link>
                            <Link href={`/admin/dashboard/edit/${post.id}`}>
                              <button 
                                className="p-1.5 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded transition-all cursor-pointer"
                                title="Edit Post"
                              >
                                <Edit3 size={15} />
                              </button>
                            </Link>
                            <button 
                              onClick={() => setDeleteConfirmId(post.id)}
                              className="p-1.5 text-brand-secondary hover:text-red-600 hover:bg-red-50 rounded transition-all cursor-pointer"
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

        {/* Delete Confirmation Modal Overlay */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              onClick={() => setDeleteConfirmId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer" 
            />
            <div className="relative bg-white w-full max-w-sm rounded-[6px] shadow-[0px_24px_64px_rgba(0,0,0,0.16)] p-6 md:p-8 z-10 text-brand-primary select-none font-body">
              <h3 className="font-heading text-xl font-normal leading-tight text-brand-primary mb-3">
                Confirm Article Deletion
              </h3>
              <p className="text-sm text-brand-secondary leading-relaxed font-light mb-6">
                Are you sure you want to permanently delete this article? This action is irreversible and updates will take effect on the public feed immediately.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-5 py-2 text-xs h-auto"
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
                  className="px-5 py-2 text-xs bg-red-600 text-white hover:bg-red-700 shadow-none border-none font-semibold"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Permanently Delete"}
                </Button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
