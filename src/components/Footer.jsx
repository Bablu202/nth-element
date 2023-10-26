import React from "react";

export default function Footer({
  sortBy,
  setSortBy,
  setInitialTracelItems,
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
            setInitialTracelItems([]);
          }}
        >
          Clear all
        </button>
      </div>
      <div className="footer__stats">
        {!allTravelItems ? <em>Let's start adding</em> : footerStats}
      </div>
    </footer>
  );
}
