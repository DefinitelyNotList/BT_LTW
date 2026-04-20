import { Link } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { formatDate } from "../utils/date";

function DashboardPage() {
  const { posts, deletePost, resetPosts } = useBlog();

  function handleDelete(slug) {
    const confirmed = window.confirm("Delete this post?");

    if (confirmed) {
      deletePost(slug);
    }
  }

  function handleReset() {
    const confirmed = window.confirm("Reset the blog to the default sample posts?");

    if (confirmed) {
      resetPosts();
    }
  }

  return (
    <div className="content-stack">
      <section className="dashboard-banner">
        <div>
          <p className="eyebrow">Protected dashboard</p>
          <h1>Manage blog content</h1>
          <p>Create, edit, delete, and reset posts from one place.</p>
        </div>

        <div className="dashboard-banner__actions">
          <Link className="solid-link" to="/dashboard/new">
            Create post
          </Link>
          <button className="ghost-button" onClick={handleReset} type="button">
            Reset sample data
          </button>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total posts</span>
          <strong>{posts.length}</strong>
        </article>
        <article className="stat-card">
          <span>Latest update</span>
          <strong>{posts[0] ? formatDate(posts[0].updatedAt) : "No posts"}</strong>
        </article>
      </section>

      <section className="dashboard-list">
        {posts.map((post) => (
          <article className="dashboard-card" key={post.id}>
            <div>
              <p className="dashboard-card__meta">
                {formatDate(post.updatedAt)} • {post.author}
              </p>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </div>

            <div className="dashboard-card__actions">
              <Link className="text-link" to={`/posts/${post.slug}`}>
                View
              </Link>
              <Link className="text-link" to={`/dashboard/edit/${post.slug}`}>
                Edit
              </Link>
              <button className="danger-button" onClick={() => handleDelete(post.slug)} type="button">
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default DashboardPage;
