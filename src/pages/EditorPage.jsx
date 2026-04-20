import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { useAuth } from "../context/AuthContext";
import { useBlog } from "../context/BlogContext";

function EditorPage({ mode }) {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { user } = useAuth();
  const { createPost, getPostBySlug, updatePost } = useBlog();

  const currentPost = mode === "edit" ? getPostBySlug(slug) : null;

  if (mode === "edit" && !currentPost) {
    return <Navigate replace to="/dashboard" />;
  }

  function handleSubmit(values) {
    if (mode === "edit") {
      const updatedPost = updatePost(slug, values, user);
      navigate(`/posts/${updatedPost.slug}`);
      return;
    }

    const createdPost = createPost(values, user);
    navigate(`/posts/${createdPost.slug}`);
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
