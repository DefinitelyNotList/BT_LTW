const defaultPosts = [
  {
    id: "1",
    slug: "why-react-works-well-for-content-sites",
    title: "Why React Works Well for Content Sites",
    excerpt:
      "React keeps even a small blog maintainable by separating layout, data flow, and page behavior into focused components.",
    content: `A simple blog is a good React exercise because it touches the pieces that matter in a real app: routing, reusable UI, state, and forms.

In this example, public visitors can browse posts while authenticated users can manage content from a protected dashboard.

That separation makes the project feel closer to a real product than a one-page demo, but it still stays small enough to understand end to end.`,
    author: "Admin Editor",
    tags: ["react", "components", "routing"],
    publishedAt: "2026-04-15T09:00:00.000Z",
    updatedAt: "2026-04-15T09:00:00.000Z",
  },
  {
    id: "2",
    slug: "building-protected-routes-with-react-router",
    title: "Building Protected Routes with React Router",
    excerpt:
      "A dedicated guard component keeps private pages out of the public navigation flow and redirects users to login when needed.",
    content: `Protected routes are a common requirement even in small exercises.

The implementation here uses an authentication context to track session state in localStorage. When a route is marked private, the guard checks whether a user is logged in before rendering the page.

If there is no active session, the user is sent to the login page and can be redirected back after a successful sign-in.`,
    author: "Admin Editor",
    tags: ["react-router", "auth", "spa"],
    publishedAt: "2026-04-12T09:00:00.000Z",
    updatedAt: "2026-04-12T09:00:00.000Z",
  },
  {
    id: "3",
    slug: "organizing-a-react-project-by-feature",
    title: "Organizing a React Project by Feature",
    excerpt:
      "Splitting components, pages, and context into separate files keeps a small project readable and easier to extend.",
    content: `As soon as a React app has more than a few screens, putting everything in one file stops scaling.

This project separates pages, shared components, authentication state, and blog state. That makes it obvious where each concern lives and keeps future changes localized.

Even for a teaching example, that structure is worth adopting early because it mirrors how production apps are usually maintained.`,
    author: "Admin Editor",
    tags: ["project-structure", "react", "context"],
    publishedAt: "2026-04-10T09:00:00.000Z",
    updatedAt: "2026-04-10T09:00:00.000Z",
  },
];

export default defaultPosts;
