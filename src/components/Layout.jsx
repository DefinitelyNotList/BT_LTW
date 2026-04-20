import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="page-shell">
      <Header />
      <main className="page-content">
        <Outlet />
      </main>
      <footer className="page-footer">
        <p>Simple Blog built with React, routing, and protected admin pages.</p>
      </footer>
    </div>
  );
}

export default Layout;
