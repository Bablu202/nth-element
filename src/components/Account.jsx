import React from "react";
import { VscAccount } from "react-icons/vsc";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

export default function Account({ token }) {
  let navigate = useNavigate();

  const defaultFunction = (e) => {
    e.preventDefault();
  };
  const handleLogout = async () => {
    navigate("/");
    await supabase.auth.signOut();
    sessionStorage.removeItem("token");
  };
  const navData = [
    { displayOption: "Account", optionFunction: defaultFunction },
    { displayOption: "Privacy", optionFunction: defaultFunction },
    { displayOption: "details", optionFunction: defaultFunction },
    { displayOption: "Log out", optionFunction: handleLogout },
  ];
  const navDataMap = navData.map((e, i) => (
    <li key={i} className="account__item">
      <a onClick={e.optionFunction} className="account__link">
        {e.displayOption}
      </a>
    </li>
  ));

  return (
    <div className="account">
      <input type="checkbox" className="account__checkbox" id="navi-toggle" />
      <label htmlFor="navi-toggle" className="account__button">
        <VscAccount className="account__user" />
        <span>{token.user?.user_metadata?.full_name}</span>
      </label>

      <div className="account__background">&nbsp;</div>
      <nav className="account__nav">
        <ul className="account__list">{navDataMap}</ul>
      </nav>
    </div>
  );
}
