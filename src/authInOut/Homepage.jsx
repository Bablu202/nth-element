import React from "react";
import { useNavigate } from "react-router-dom";
import Travel from "../pages/Travel";

const Homepage = ({ token }) => {
  let navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }
  console.log(token);
  return (
    <div className="form">
      <img />
      <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
      <button onClick={handleLogout}>Logout</button>
      <Travel />
    </div>
  );
};

export default Homepage;
