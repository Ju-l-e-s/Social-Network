import type { Post } from "@/lib/api/client";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLikePost } from "@/hooks/use-like-post";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const [hasLiked, setHasLiked] = useState(false);
  const likePost = useLikePost();
  const initials = `${post.author.firstName?.[0] ?? ""}${
    post.author.lastName?.[0] ?? ""
  }`.toUpperCase() || "G";
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: fr,
  });

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
      <header className="flex items-start gap-4">
        {post.author.avatarUrl ? (
          <Image
            src={post.author.avatarUrl}
            alt={`${post.author.firstName} ${post.author.lastName}`}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold text-white"
            style={{ backgroundColor: post.author.avatarColor || "#6366f1" }}
          >
            {initials}
          </div>
        )}
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            {post.author.firstName} {post.author.lastName}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{post.author.role}</p>
        </div>
        <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">{timeAgo}</span>
      </header>
      <p className="mt-4 text-base leading-relaxed text-slate-800 dark:text-slate-100">
        {post.message}
      </p>
      {post.imageUrl && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <Image
            alt=""
            src={post.imageUrl}
            width={800}
            height={450}
            className="h-64 w-full object-cover"
          />
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-slate-900 dark:text-slate-100">
          {post.likes} likes
        </span>
        {post.reactions.map((reaction) => (
          <span
            key={reaction.label}
            className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-100"
          >
            {reaction.label} {reaction.count}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Button
          size="sm"
          variant={hasLiked ? "secondary" : "default"}
          disabled={hasLiked || likePost.isPending}
          onClick={() => {
            setHasLiked(true);
            likePost.mutate(post.id);
          }}
        >
          {hasLiked ? "Déjà liké" : "Liker"}
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-brand">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-brand/10 px-3 py-1 font-medium text-brand dark:bg-brand/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
