import { Link } from "react-router-dom";
import { formatDate } from "../utils/date";

function PostCard({ post, compact = false }) {
  return (
    <article className={`post-card${compact ? " post-card--compact" : ""}`}>
      <div className="post-card__meta">
        <span>{formatDate(post.publishedAt)}</span>
        <span>{post.author}</span>
      </div>

      <h2>
        <Link to={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>

      <p>{post.excerpt}</p>

      <div className="tag-list">
        {post.tags.map((tag) => (
          <span className="tag-chip" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default PostCard;
