import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { useAuth } from "../context/AuthContext";
import { useBlog } from "../context/BlogContext";

function EditorPage({ mode }) {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { user } = useAuth();
  const { createPost, getPostBySlug, loadPostDetail, updatePost } = useBlog();

  const [currentPost, setCurrentPost] = useState(() => {
    if (mode !== "edit") {
      return null;
    }

    const cachedPost = getPostBySlug(slug);
    return cachedPost?.content ? cachedPost : null;
  });
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isActive = true;

    if (mode !== "edit") {
      setCurrentPost(null);
      setIsLoading(false);
      setLoadError("");

      return () => {
        isActive = false;
      };
    }

    const cachedPost = getPostBySlug(slug);

    if (cachedPost?.content) {
      setCurrentPost(cachedPost);
      setIsLoading(false);
      setLoadError("");

      return () => {
        isActive = false;
      };
    }

    setIsLoading(true);
    setLoadError("");

    void loadPostDetail(slug)
      .then((remotePost) => {
        if (!isActive) {
          return;
        }

        setCurrentPost(remotePost);
        setIsLoading(false);
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        setCurrentPost(null);
        setLoadError(error.message);
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [mode, slug]);

  function handleSubmit(values) {
    if (mode === "edit") {
      const updatedPost = updatePost(slug, values, user);

      if (!updatedPost) {
        return;
      }

      navigate(`/posts/${updatedPost.slug}`);
      return;
    }

    const createdPost = createPost(values, user);
    navigate(`/posts/${createdPost.slug}`);
  }

  if (mode === "edit" && isLoading) {
    return (
      <section className="empty-panel">
        <p className="eyebrow">Loading</p>
        <h1>Loading the selected post from the API.</h1>
      </section>
    );
  }

  if (mode === "edit" && loadError) {
    return (
      <section className="empty-panel">
        <p className="eyebrow">API error</p>
        <h1>Post editor unavailable.</h1>
        <p>{loadError}</p>
        <Link className="solid-link" to="/dashboard">
          Back to dashboard
        </Link>
      </section>
    );
  }

  if (mode === "edit" && !currentPost) {
    return <Navigate replace to="/dashboard" />;
  }

  return (
    <div className="content-stack">
      <section className="section-heading">
        <p className="eyebrow">Protected editor</p>
        <h1>{mode === "edit" ? "Edit post" : "Create a new post"}</h1>
        <p>Only authenticated users can access this screen.</p>
      </section>

      <section className="editor-panel">
        <div className="editor-panel__header">
          <Link className="text-link" to="/dashboard">
            Back to dashboard
          </Link>
        </div>

        <PostForm
          initialValues={currentPost}
          onSubmit={handleSubmit}
          submitLabel={mode === "edit" ? "Save changes" : "Publish post"}
        />
      </section>
    </div>
  );
}

export default EditorPage;
