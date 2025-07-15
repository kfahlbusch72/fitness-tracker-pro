import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <Link to="/activities">Activities</Link>
        {token ? (
          <a onClick={handleLogout}>Log out</a>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
