import PostCard from "../components/PostCard";
import { useBlog } from "../context/BlogContext";

function PostsPage() {
  const { posts, isLoadingPosts, postsError } = useBlog();

  if (isLoadingPosts) {
    return (
      <section className="empty-panel">
        <p className="eyebrow">Loading</p>
        <h1>Loading blog list from the API.</h1>
      </section>
    );
  }

  if (postsError) {
    return (
      <section className="empty-panel">
        <p className="eyebrow">API error</p>
        <h1>Blog archive unavailable.</h1>
        <p>{postsError}</p>
      </section>
    );
  }

  return (
    <div className="content-stack">
      <section className="section-heading">
        <p className="eyebrow">All posts</p>
        <h1>Simple Blog Archive</h1>
        <p>Public readers can access every article without logging in.</p>
      </section>

      <section className="post-list">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}

export default PostsPage;
