import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useBlog } from "../context/BlogContext";

function HomePage() {
  const { posts, isLoadingPosts, postsError } = useBlog();
  const [featuredPost, ...recentPosts] = posts;

  if (isLoadingPosts) {
    return (
      <section className="empty-panel">
        <p className="eyebrow">Loading</p>
        <h1>Fetching blog posts from the Express API.</h1>
      </section>
    );
  }

  if (postsError) {
    return (
      <section className="empty-panel">
        <p className="eyebrow">API error</p>
        <h1>Blog posts could not be loaded.</h1>
        <p>{postsError}</p>
      </section>
    );
  }

  return (
    <div className="content-stack">
      <section className="hero-panel">
        <div className="hero-panel__copy">
          <p className="eyebrow">React Blog Example</p>
          <h1>Simple public blog, protected admin workflow.</h1>
          <p>
            This sample project loads posts from a Node and Express backend while
            keeping authentication and protected routes in the React frontend.
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
