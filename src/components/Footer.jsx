import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FcClock, FcOk, FcAlphabeticalSortingAz } from "react-icons/fc";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
export default function Footer({
  setSortBy,
  clearAllFunction,
  allTravelItems,
  footerStats,
  user,
}) {
  let navigate = useNavigate();
  const userName = user.user?.user_metadata?.full_name;
  const handleLogout = async () => {
    /*
    sessionStorage.removeItem("token");
    navigate("/");
    */
    await supabase.auth.signOut();
    sessionStorage.removeItem("token");
    navigate("/");
  };
  /*
     <img />
      <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
      <button onClick={handleLogout}>Logout</button>*/
  return (
    <footer className="footer">
      <div className="footer__stats">
        {!allTravelItems ? <em>Let's start adding</em> : footerStats}
      </div>
      <div className="travel__sort">
        <button
          className="travel__sort--option"
          onClick={() => {
            setSortBy("input");
          }}
        >
          <FcClock className="travel--icon" />
          recent
        </button>
        <button
          className="travel__sort--option"
          onClick={() => {
            setSortBy("description");
          }}
        >
          <FcAlphabeticalSortingAz className="travel--icon" />
          indexed
        </button>
        <button
          className="travel__sort--option"
          onClick={() => {
            setSortBy("packed");
          }}
        >
          <FcOk className="travel--icon" />
          packed
        </button>
        <button
          className="travel__sort--option"
          onClick={() => {
            clearAllFunction();
          }}
        >
          <AiOutlineDelete className="travel--icon" />
          Clear all
        </button>
        <div className="dropup">
          <button className="dropup__btn">
            <div className="travel__sort--option">
              <VscAccount className="travel--icon" />
              <span className="travel__username">{userName}</span>
            </div>
          </button>
          <div className="dropup__content">
            <button className="dropup__content--btn" onClick={handleLogout}>
              <AiOutlineLogout /> Log Out
            </button>
            <button className="dropup__content--btn">
              Welcome back {userName}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/*
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
export default function Footer({
  sortBy,
  setSortBy,
  clearAllFunction,
  allTravelItems,
  footerStats,
  user,
}) {
  console.log(user);
  return (
    <footer className="footer">
      <div className="travel__sort">
        <select
          className="select__box"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option className="select__option" value="input">
            default Order
          </option>
          <option className="select__option" value="description">
            description Order
          </option>
          <option className="select__option" value="packed">
            to be packedorder
          </option>
        </select>
        <button
          className="btn btn--clear"
          onClick={() => {
            clearAllFunction();
          }}
        >
          <AiOutlineDelete /> Clear all
        </button>
      </div>
      <div className="footer__stats">
        {!allTravelItems ? <em>Let's start adding</em> : footerStats}
      </div>
    </footer>
  );
}
*/
