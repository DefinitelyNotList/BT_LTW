import PostCard from "../components/PostCard";
import { useBlog } from "../context/BlogContext";

function PostsPage() {
  const { posts } = useBlog();

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
