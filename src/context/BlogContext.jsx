import { createContext, useContext, useEffect, useRef, useState } from "react";
import defaultPosts from "../data/defaultPosts";
import { buildUniqueSlug, normalizeTags } from "../utils/slug";

const BlogContext = createContext(null);
const STORAGE_KEY = "simple-blog-posts";

function sortPosts(posts) {
  return [...posts].sort(
    (left, right) =>
      new Date(right.updatedAt ?? right.publishedAt).getTime() -
      new Date(left.updatedAt ?? left.publishedAt).getTime(),
  );
}

function readStoredPosts() {
  const rawPosts = window.localStorage.getItem(STORAGE_KEY);

  if (!rawPosts) {
    return sortPosts(defaultPosts);
  }

  try {
    const parsedPosts = JSON.parse(rawPosts);
    return sortPosts(parsedPosts);
  } catch {
    return sortPosts(defaultPosts);
  }
}

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState(() => readStoredPosts());
  const postsRef = useRef(posts);

  useEffect(() => {
    postsRef.current = posts;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  function getPostBySlug(slug) {
    return posts.find((post) => post.slug === slug) ?? null;
  }

  function createPost(values, currentUser) {
    const now = new Date().toISOString();
    const nextPost = {
      id: crypto.randomUUID(),
      slug: buildUniqueSlug(values.title, postsRef.current),
      title: values.title.trim(),
      excerpt: values.excerpt.trim(),
      content: values.content.trim(),
      author: currentUser?.name ?? "Admin Editor",
      tags: normalizeTags(values.tags),
      publishedAt: now,
      updatedAt: now,
    };

    setPosts((currentPosts) => sortPosts([nextPost, ...currentPosts]));

    return nextPost;
  }

  function updatePost(originalSlug, values, currentUser) {
    const currentPost =
      postsRef.current.find((post) => post.slug === originalSlug) ?? null;

    if (!currentPost) {
      return null;
    }

    const remainingPosts = postsRef.current.filter((post) => post.id !== currentPost.id);
    const nextPost = {
      ...currentPost,
      slug:
        values.title.trim() === currentPost.title
          ? currentPost.slug
          : buildUniqueSlug(values.title, remainingPosts),
      title: values.title.trim(),
      excerpt: values.excerpt.trim(),
      content: values.content.trim(),
      author: currentUser?.name ?? currentPost.author,
      tags: normalizeTags(values.tags),
      updatedAt: new Date().toISOString(),
    };

    setPosts((currentPosts) =>
      sortPosts(
        currentPosts.map((post) => (post.id === currentPost.id ? nextPost : post)),
      ),
    );

    return nextPost;
  }

  function deletePost(slug) {
    setPosts((currentPosts) => currentPosts.filter((post) => post.slug !== slug));
  }

  function resetPosts() {
    setPosts(sortPosts(defaultPosts));
  }

  return (
    <BlogContext.Provider
      value={{
        posts,
        getPostBySlug,
        createPost,
        updatePost,
        deletePost,
        resetPosts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }

  return context;
}
