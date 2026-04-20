import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "simple-blog-session";

const DEMO_USER = {
  username: "admin",
  password: "blog123",
  name: "Admin Editor",
  role: "admin",
};

function readStoredUser() {
  const rawUser = window.localStorage.getItem(STORAGE_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser());

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  function login({ username, password }) {
    if (username !== DEMO_USER.username || password !== DEMO_USER.password) {
      return {
        success: false,
        message: "Invalid username or password.",
      };
    }

    const nextUser = {
      username: DEMO_USER.username,
      name: DEMO_USER.name,
      role: DEMO_USER.role,
    };

    setUser(nextUser);

    return { success: true, user: nextUser };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(user),
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { DEMO_USER };
