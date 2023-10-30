import React from "react";
import { useNavigate } from "react-router-dom";
import Traveldb from "../pages/Traveldb";
import { supabase } from "../supabase/client";

const Homepage = ({ token }) => {
  let navigate = useNavigate();

  const handleLogout = async () => {
    /*
    sessionStorage.removeItem("token");
    navigate("/");
    */
    await supabase.auth.signOut();
    sessionStorage.removeItem("token");
    navigate("/");
  };
  //console.log(token.user.email);
  //console.log(token.user);

  return (
    <div className="form">
      <img />
      <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
      <button onClick={handleLogout}>Logout</button>

      <Traveldb user={token} />
    </div>
  );
};

export default Homepage;
