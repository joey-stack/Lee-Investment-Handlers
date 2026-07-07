"use client";

import React, { useState, useEffect, useRef } from "react";
import { InsightArticle } from "@/types";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPost, updatePost } from "@/services/blogService";
import { 
  ArrowLeft, 
  Bold, 
  Italic, 
  Underline, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Link2, 
  Eraser,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Plus,
  X
} from "lucide-react";

interface BlogEditorProps {
  initialPost?: InsightArticle;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({ initialPost }) => {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Fields state
  const [title, setTitle] = useState(initialPost?.title || "");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || "");
  const [category, setCategory] = useState(initialPost?.category || "Insights");
  const [image, setImage] = useState(initialPost?.image || "");
  const [featured, setFeatured] = useState(!!initialPost?.featured);
  const [author, setAuthor] = useState(initialPost?.author || "Osazuwa Omoregie");
  const [tags, setTags] = useState<string[]>(initialPost?.tags || []);
  const [tagInput, setTagInput] = useState("");
  
  // UX State
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Set initial content inside contentEditable div
  useEffect(() => {
    if (editorRef.current) {
      const initialHtml = initialPost?.content
        ? (Array.isArray(initialPost.content) 
            ? initialPost.content.map(p => `<p>${p}</p>`).join("") 
            : initialPost.content)
        : "<p><br></p>"; // default placeholder line
      
      editorRef.current.innerHTML = initialHtml;
    }
  }, [initialPost]);

  // Execute native editor commands
  const handleFormat = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // Custom link inserter
  const handleLink = () => {
    const url = prompt("Enter URL link:");
    if (url) {
      handleFormat("createLink", url);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Helper to generate reading time based on content length
  const calculateReadTime = (htmlContent: string): string => {
    const text = htmlContent.replace(/<[^>]*>/g, ""); // strip HTML tags
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min read`;
  };

  // Save/Update Article handler
  const handleSave = async () => {
    if (!title) {
      setNotification({ type: "error", message: "Please specify an article title." });
      return;
    }

    const htmlContent = editorRef.current?.innerHTML || "";
    if (htmlContent === "" || htmlContent === "<p><br></p>") {
      setNotification({ type: "error", message: "Article content cannot be empty." });
      return;
    }

    setIsSaving(true);
    setNotification(null);

    // Format slug from title
    const slug = initialPost?.slug || title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    // Standard date format: "Month Day, Year"
    const dateFormatted = initialPost?.date || new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const docPayload = {
      title,
      excerpt,
      category,
      date: dateFormatted,
      slug,
      featured,
      image: image || "/insights/strategy-execution.jpg",
      content: htmlContent,
      author,
      readTime: calculateReadTime(htmlContent),
      tags: tags.length > 0 ? tags : [category],
    };

    try {
      if (initialPost?.id) {
        await updatePost(initialPost.id, docPayload);
        setNotification({ type: "success", message: "Article successfully updated." });
      } else {
        await createPost(docPayload);
        setNotification({ type: "success", message: "Article successfully published." });
        // Redirect to dashboard after creation success
        setTimeout(() => router.push("/admin/dashboard"), 1500);
      }
    } catch (err: any) {
      console.error("Save failure:", err);
      setNotification({ type: "error", message: err.message || "Failed to save article. Confirm your connection." });
    } finally {
      setIsSaving(false);
    }
  };

  const categories = ["Insights", "News"];
  const teamAuthors = ["Osazuwa Omoregie", "Judith Okafor", "Excel Joel"];

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 mt-6 pb-24 font-body select-none">
      {/* Header Back nav */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard" className="text-brand-secondary hover:text-brand-primary flex items-center gap-1.5 transition-colors duration-200">
          <ArrowLeft size={16} />
          <span className="text-xs uppercase tracking-wider font-semibold">Back to Dashboard</span>
        </Link>
      </div>

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

      {/* Workspace Split Layout: Left Content, Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Post Title */}
          <div className="bg-white border border-brand-border rounded-[6px] p-6 shadow-sm">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title..."
              className="w-full text-2xl md:text-3xl font-heading font-normal text-brand-primary focus:outline-none border-none placeholder-brand-secondary/40 select-text p-0"
              required
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white border border-brand-border rounded-[6px] p-6 shadow-sm space-y-1.5">
            <label className="block text-xs font-semibold text-brand-secondary uppercase tracking-wider">
              Short Description / Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Write a brief, high-level summary of the article contents for grid view snippets..."
              rows={2}
              className="w-full text-sm font-body text-brand-primary focus:outline-none border-none resize-none placeholder-brand-secondary/40 select-text p-0 font-light leading-relaxed"
            />
          </div>

          {/* Rich Text WYSIWYG Editor Workspace */}
          <div className="bg-white border border-brand-border rounded-[6px] overflow-hidden shadow-sm flex flex-col min-h-[500px]">
            {/* WYSIWYG Formatting Toolbar */}
            <div className="bg-brand-bg-secondary/40 border-b border-brand-border p-2 flex flex-wrap items-center gap-1">
              <button 
                type="button" 
                onClick={() => handleFormat("bold")}
                className="p-2 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded transition-all cursor-pointer"
                title="Bold"
              >
                <Bold size={16} />
              </button>
              <button 
                type="button" 
                onClick={() => handleFormat("italic")}
                className="p-2 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded transition-all cursor-pointer"
                title="Italic"
              >
                <Italic size={16} />
              </button>
              <button 
                type="button" 
                onClick={() => handleFormat("underline")}
                className="p-2 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded transition-all cursor-pointer"
                title="Underline"
              >
                <Underline size={16} />
              </button>
              
              <span className="h-5 w-px bg-brand-border mx-1" />

              <button 
                type="button" 
                onClick={() => handleFormat("formatBlock", "H2")}
                className="p-2 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded transition-all cursor-pointer font-bold text-xs"
                title="Heading 2"
              >
                <Heading2 size={16} />
              </button>
              <button 
                type="button" 
                onClick={() => handleFormat("formatBlock", "H3")}
                className="p-2 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded transition-all cursor-pointer font-bold text-xs"
                title="Heading 3"
              >
                <Heading3 size={16} />
              </button>

              <span className="h-5 w-px bg-brand-border mx-1" />

              <button 
                type="button" 
                onClick={() => handleFormat("insertUnorderedList")}
                className="p-2 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded transition-all cursor-pointer"
                title="Bullet List"
              >
                <List size={16} />
              </button>
              <button 
                type="button" 
                onClick={() => handleFormat("insertOrderedList")}
                className="p-2 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded transition-all cursor-pointer"
                title="Numbered List"
              >
                <ListOrdered size={16} />
              </button>
              <button 
                type="button" 
                onClick={() => handleFormat("formatBlock", "blockquote")}
                className="p-2 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded transition-all cursor-pointer"
                title="Blockquote"
              >
                <Quote size={16} />
              </button>

              <span className="h-5 w-px bg-brand-border mx-1" />

              <button 
                type="button" 
                onClick={handleLink}
                className="p-2 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded transition-all cursor-pointer"
                title="Insert Link"
              >
                <Link2 size={16} />
              </button>
              <button 
                type="button" 
                onClick={() => handleFormat("removeFormat")}
                className="p-2 text-brand-secondary hover:text-brand-primary hover:bg-brand-bg-secondary rounded transition-all cursor-pointer"
                title="Clear Formatting"
              >
                <Eraser size={16} />
              </button>
            </div>

            {/* Editable Content Frame */}
            <div 
              ref={editorRef}
              contentEditable
              className="flex-1 p-6 md:p-8 outline-none prose prose-sm md:prose-base prose-slate max-w-none focus:outline-none overflow-y-auto select-text font-body text-brand-primary"
            />
          </div>
        </div>

        {/* Sidebar Settings Area */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Publish Actions card */}
          <div className="bg-white border border-brand-border rounded-[6px] p-6 shadow-sm space-y-5">
            <h3 className="font-heading text-lg font-normal text-brand-primary pb-3 border-b border-brand-border/60">
              Publish Status
            </h3>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-brand-secondary font-medium">Author</span>
              <span className="font-semibold text-brand-primary">{author}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-brand-secondary font-medium">Revalidation</span>
              <span className="font-semibold text-brand-primary">Dynamic/Instant</span>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="secondary"
                onClick={() => router.push("/admin/dashboard")}
                className="flex-1 py-2 text-xs h-auto"
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                className="flex-1 py-2 text-xs font-semibold shadow-[0px_4px_12px_rgba(200,169,110,0.1)] text-brand-primary"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : (initialPost ? "Update Post" : "Publish Post")}
              </Button>
            </div>
          </div>

          {/* Metadata Card */}
          <div className="bg-white border border-brand-border rounded-[6px] p-6 shadow-sm space-y-6">
            <h3 className="font-heading text-lg font-normal text-brand-primary pb-3 border-b border-brand-border/60">
              Article Details
            </h3>

            {/* Category selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-brand-secondary uppercase tracking-wider">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 px-3 bg-brand-bg-secondary text-brand-primary border border-brand-border rounded-[6px] text-sm font-medium focus:outline-none focus:border-brand-primary cursor-pointer"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Author selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-brand-secondary uppercase tracking-wider">
                Assigned Author
              </label>
              <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full h-11 px-3 bg-brand-bg-secondary text-brand-primary border border-brand-border rounded-[6px] text-sm font-medium focus:outline-none focus:border-brand-primary cursor-pointer"
              >
                {teamAuthors.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Featured Switch */}
            <div className="flex items-center justify-between py-1 border-t border-b border-brand-border/60">
              <span className="text-xs font-semibold text-brand-secondary uppercase tracking-wider">
                Feature on Homepage
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-brand-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-alternate" />
              </label>
            </div>

            {/* Featured Image Link */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-brand-secondary uppercase tracking-wider">
                Featured Image URL
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-secondary/60">
                  <ImageIcon size={14} />
                </span>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="e.g. /insights/strategy-execution.jpg"
                  className="w-full h-11 pl-9 pr-4 bg-brand-bg-secondary text-brand-primary border border-brand-border rounded-[6px] text-sm focus:outline-none focus:border-brand-primary transition-colors placeholder-brand-secondary/40 font-medium"
                />
              </div>
              <p className="text-[10px] text-brand-secondary font-light leading-relaxed">
                Provide an absolute static assets path (e.g. <code>/insights/scaling-tech.jpg</code>) or a secure public CDN image link.
              </p>
            </div>

            {/* Tags Input */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-brand-secondary uppercase tracking-wider">
                Tags
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-secondary/60">
                  <Plus size={14} />
                </span>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Type tag and press Enter..."
                  className="w-full h-11 pl-9 pr-4 bg-brand-bg-secondary text-brand-primary border border-brand-border rounded-[6px] text-sm focus:outline-none focus:border-brand-primary transition-colors placeholder-brand-secondary/40 font-medium"
                />
              </div>

              {/* Tags Display Badges */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map((tag) => (
                    <span 
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-bg-secondary border border-brand-border text-brand-primary text-xs font-medium"
                    >
                      <span>{tag}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTag(tag)}
                        className="text-brand-secondary hover:text-red-500 font-bold p-0.5"
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

BlogEditor.displayName = "BlogEditor";
