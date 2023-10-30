import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
export default function Footer({
  sortBy,
  setSortBy,
  setInitialTravelItems,
  allTravelItems,
  footerStats,
}) {
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
            setInitialTravelItems([]);
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
