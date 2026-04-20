import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBlog } from "../context/BlogContext";
import { formatDate } from "../utils/date";

function PostDetailPage() {
  const { slug } = useParams();
  const { isAuthenticated } = useAuth();
  const { getPostBySlug } = useBlog();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <section className="empty-panel">
        <p className="eyebrow">Post not found</p>
        <h1>This article does not exist.</h1>
        <Link className="solid-link" to="/posts">
          Back to posts
        </Link>
      </section>
    );
  }

  return (
    <article className="article-view">
      <div className="article-view__meta">
        <span>{formatDate(post.publishedAt)}</span>
        <span>{post.author}</span>
      </div>

      <h1>{post.title}</h1>
      <p className="article-view__excerpt">{post.excerpt}</p>

      <div className="tag-list">
        {post.tags.map((tag) => (
          <span className="tag-chip" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="article-view__body">
        {post.content.split("\n\n").map((paragraph, index) => (
          <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
        ))}
      </div>

      <div className="article-view__actions">
        <Link className="ghost-link" to="/posts">
          Back to archive
        </Link>
        {isAuthenticated ? (
          <Link className="solid-link" to={`/dashboard/edit/${post.slug}`}>
            Edit this post
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export default PostDetailPage;
