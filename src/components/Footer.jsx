import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FcClock, FcOk, FcAlphabeticalSortingAz } from "react-icons/fc";
import { VscAccount } from "react-icons/vsc";
export default function Footer({
  setSortBy,
  clearAllFunction,
  allTravelItems,
  footerStats,
  user,
}) {
  console.log(user);

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
          <FcClock />
        </button>
        <button
          className="travel__sort--option"
          onClick={() => {
            setSortBy("description");
          }}
        >
          <FcAlphabeticalSortingAz />
        </button>
        <button
          className="travel__sort--option"
          onClick={() => {
            setSortBy("packed");
          }}
        >
          <FcOk />
        </button>
        <button
          className="travel__sort--option"
          onClick={() => {
            clearAllFunction();
          }}
        >
          <AiOutlineDelete />
        </button>
        <div className="travel__sort--option">
          <VscAccount />
          <option value="">df</option>
          <option value="">log out</option>
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
