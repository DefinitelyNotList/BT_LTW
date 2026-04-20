import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useBlog } from "../context/BlogContext";

function HomePage() {
  const { posts } = useBlog();
  const [featuredPost, ...recentPosts] = posts;

  return (
    <div className="content-stack">
      <section className="hero-panel">
        <div className="hero-panel__copy">
          <p className="eyebrow">React Blog Example</p>
          <h1>Simple public blog, protected admin workflow.</h1>
          <p>
            This sample project shows a clean React structure with separate files,
            route protection, and a dashboard for managing posts.
          </p>
          <div className="hero-panel__actions">
            <Link className="solid-link" to="/posts">
              Browse posts
            </Link>
            <Link className="ghost-link" to="/dashboard">
              Open dashboard
            </Link>
          </div>
        </div>

        {featuredPost ? (
          <article className="featured-post">
            <p className="eyebrow">Featured article</p>
            <h2>{featuredPost.title}</h2>
            <p>{featuredPost.excerpt}</p>
            <Link className="text-link" to={`/posts/${featuredPost.slug}`}>
              Read article
            </Link>
          </article>
        ) : null}
      </section>

      <section className="section-header">
        <div>
          <p className="eyebrow">Latest posts</p>
          <h2>Recent writing</h2>
        </div>
        <Link className="text-link" to="/posts">
          View all posts
        </Link>
      </section>

      <section className="post-grid">
        {recentPosts.slice(0, 3).map((post) => (
          <PostCard key={post.id} post={post} compact />
        ))}
      </section>
    </div>
  );
}

export default HomePage;
