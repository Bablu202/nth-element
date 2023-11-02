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
    navigate("/");
    sessionStorage.removeItem("token");
    await supabase.auth.signOut();
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
