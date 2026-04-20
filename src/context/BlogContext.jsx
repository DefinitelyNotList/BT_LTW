import { createContext, useContext, useEffect, useRef, useState } from "react";
import { fetchBlogDetail, fetchBlogList } from "../services/blogApi";
import { buildUniqueSlug, normalizeTags } from "../utils/slug";

const BlogContext = createContext(null);

function sortPosts(posts) {
  return [...posts].sort(
    (left, right) =>
      new Date(right.updatedAt ?? right.publishedAt).getTime() -
      new Date(left.updatedAt ?? left.publishedAt).getTime(),
  );
}

function toPostSummary(post) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    author: post.author,
    tags: post.tags,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
  };
}

function findPostByIdentifier(posts, identifier) {
  return posts.find((post) => post.slug === identifier || post.id === identifier) ?? null;
}

function findDetailByIdentifier(details, identifier) {
  return (
    Object.values(details).find(
      (post) => post.slug === identifier || post.id === identifier,
    ) ?? null
  );
}

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState("");
  const [postDetails, setPostDetails] = useState({});

  const postsRef = useRef(posts);
  const postDetailsRef = useRef(postDetails);

  useEffect(() => {
    postsRef.current = posts;
  }, [posts]);

  useEffect(() => {
    postDetailsRef.current = postDetails;
  }, [postDetails]);

  async function refreshPosts() {
    setIsLoadingPosts(true);
    setPostsError("");

    try {
      const remotePosts = await fetchBlogList();
      setPosts(sortPosts(remotePosts));
      setPostDetails({});
      return remotePosts;
    } catch (error) {
      setPosts([]);
      setPostDetails({});
      setPostsError(error.message);
      return [];
    } finally {
      setIsLoadingPosts(false);
    }
  }

  useEffect(() => {
    void refreshPosts();
  }, []);

  function getPostBySlug(slug) {
    return (
      postDetailsRef.current[slug] ??
      postsRef.current.find((post) => post.slug === slug) ??
      null
    );
  }

  async function loadPostDetail(identifier) {
    const cachedDetail = findDetailByIdentifier(postDetailsRef.current, identifier);

    if (cachedDetail) {
      return cachedDetail;
    }

    const remotePost = await fetchBlogDetail(identifier);

    setPostDetails((currentDetails) => ({
      ...currentDetails,
      [remotePost.slug]: remotePost,
    }));

    setPosts((currentPosts) => {
      const nextSummary = toPostSummary(remotePost);
      const existingPost = findPostByIdentifier(currentPosts, identifier);

      if (!existingPost) {
        return sortPosts([nextSummary, ...currentPosts]);
      }

      return sortPosts(
        currentPosts.map((post) =>
          post.id === existingPost.id ? { ...post, ...nextSummary } : post,
        ),
      );
    });

    return remotePost;
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

    setPostDetails((currentDetails) => ({
      ...currentDetails,
      [nextPost.slug]: nextPost,
    }));

    setPosts((currentPosts) => sortPosts([toPostSummary(nextPost), ...currentPosts]));

    return nextPost;
  }

  function updatePost(originalSlug, values, currentUser) {
    const currentPost = postDetailsRef.current[originalSlug] ?? null;

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

    setPostDetails((currentDetails) => {
      const nextDetails = { ...currentDetails };
      delete nextDetails[originalSlug];
      nextDetails[nextPost.slug] = nextPost;
      return nextDetails;
    });

    setPosts((currentPosts) =>
      sortPosts(
        currentPosts.map((post) =>
          post.id === currentPost.id ? toPostSummary(nextPost) : post,
        ),
      ),
    );

    return nextPost;
  }

  function deletePost(slug) {
    setPosts((currentPosts) => currentPosts.filter((post) => post.slug !== slug));
    setPostDetails((currentDetails) => {
      const nextDetails = { ...currentDetails };
      delete nextDetails[slug];
      return nextDetails;
    });
  }

  function resetPosts() {
    return refreshPosts();
  }

  return (
    <BlogContext.Provider
      value={{
        posts,
        isLoadingPosts,
        postsError,
        getPostBySlug,
        loadPostDetail,
        createPost,
        updatePost,
        deletePost,
        resetPosts,
        refreshPosts,
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
