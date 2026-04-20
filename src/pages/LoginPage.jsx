import { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { DEMO_USER, useAuth } from "../context/AuthContext";

function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [formState, setFormState] = useState({
    username: DEMO_USER.username,
    password: DEMO_USER.password,
  });
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate replace to={redirect} />;
  }

  function updateField(event) {
    const { name, value } = event.target;
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = login(formState);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(redirect, { replace: true });
  }

  return (
    <section className="auth-panel">
      <div>
        <p className="eyebrow">Protected access</p>
        <h1>Sign in to manage blog posts.</h1>
        <p>
          Demo credentials: <strong>admin</strong> / <strong>blog123</strong>
        </p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          <span>Username</span>
          <input
            name="username"
            onChange={updateField}
            type="text"
            value={formState.username}
          />
        </label>

        <label>
          <span>Password</span>
          <input
            name="password"
            onChange={updateField}
            type="password"
            value={formState.password}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="solid-button" type="submit">
          Login
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
