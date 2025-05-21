import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/landingpage.scss";
import Login from "../components/Login";

function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="main-container">
      <h1>Willkommen !</h1>

      <Login />
    </div>
  );
}

export default LandingPage;
