import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import Traveldb from "../pages/Traveldb";

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
    <>
      <Traveldb user={token} />
    </>
  );
};

export default Homepage;
