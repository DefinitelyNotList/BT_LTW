import cors from "cors";
import express from "express";
import { blogPosts, findBlogPostByIdentifier, toBlogSummary } from "./server/data/blogPosts.js";

const app = express();
const PORT = Number(process.env.PORT) || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (_request, response) => {
  response.json({
    message: "Simple Blog API is running.",
    port: PORT,
    endpoints: ["/api/blogs", "/api/blogs/:idOrSlug"],
  });
});

app.get("/api/blogs", (_request, response) => {
  response.json({
    data: blogPosts.map(toBlogSummary),
  });
});

app.get("/api/blogs/:identifier", (request, response) => {
  const post = findBlogPostByIdentifier(request.params.identifier);

  if (!post) {
    response.status(404).json({
      message: "Blog post not found.",
    });
    return;
  }

  response.json({
    data: post,
  });
});

app.listen(PORT, () => {
  console.log(`Simple Blog API listening on http://127.0.0.1:${PORT}`);
});
