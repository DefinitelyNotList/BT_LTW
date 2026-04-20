import { useEffect, useState } from "react";

const EMPTY_FORM = {
  title: "",
  excerpt: "",
  tags: "",
  content: "",
};

function toFormState(post) {
  if (!post) {
    return { ...EMPTY_FORM };
  }

  return {
    title: post.title ?? "",
    excerpt: post.excerpt ?? "",
    tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    content: post.content ?? "",
  };
}

function PostForm({ initialValues, onSubmit, submitLabel }) {
  const [formState, setFormState] = useState(() => toFormState(initialValues));
  const [error, setError] = useState("");

  useEffect(() => {
    setFormState(toFormState(initialValues));
    setError("");
  }, [initialValues]);

  function updateField(event) {
    const { name, value } = event.target;
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formState.title.trim() ||
      !formState.excerpt.trim() ||
      !formState.content.trim()
    ) {
      setError("Title, excerpt, and content are required.");
      return;
    }

    setError("");
    onSubmit(formState);
  }

  return (
    <form className="editor-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Title</span>
          <input
            name="title"
            onChange={updateField}
            placeholder="Write a concise title"
            type="text"
            value={formState.title}
          />
        </label>

        <label>
          <span>Tags</span>
          <input
            name="tags"
            onChange={updateField}
            placeholder="react, routing, auth"
            type="text"
            value={formState.tags}
          />
        </label>
      </div>

      <label>
        <span>Excerpt</span>
        <textarea
          name="excerpt"
          onChange={updateField}
          placeholder="Short summary shown in the post list"
          rows="3"
          value={formState.excerpt}
        />
      </label>

      <label>
        <span>Content</span>
        <textarea
          name="content"
          onChange={updateField}
          placeholder="Write the post body here"
          rows="12"
          value={formState.content}
        />
      </label>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="editor-form__actions">
        <button className="solid-button" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
