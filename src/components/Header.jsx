import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink className="brand-mark" to="/">
          Simple Blog
        </NavLink>

        <nav className="site-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          {isAuthenticated ? <NavLink to="/dashboard">Dashboard</NavLink> : null}
        </nav>

        <div className="site-header__actions">
          {isAuthenticated ? (
            <>
              <span className="user-badge">{user.name}</span>
              <button className="ghost-button" onClick={logout} type="button">
                Logout
              </button>
            </>
          ) : (
            <NavLink className="solid-link" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
