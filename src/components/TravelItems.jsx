import React from "react";
import { FcEmptyTrash } from "react-icons/fc";

export default function TravelItems({
  initialTravelItemsBySorted,
  handleDeleteTravelItem,
  handleCheckedTravelItem,
}) {
  const initialTravelItemsMap = initialTravelItemsBySorted.map((e) => (
    <li className="travel__list--items" key={e.id}>
      <input
        className="travel__list--check"
        type="checkbox"
        value={e.isPacked}
        checked={e.isPacked}
        onChange={() => handleCheckedTravelItem(e.id)}
      />
      <span
        className="travel__list--text"
        style={e.isPacked ? { textDecoration: "line-through" } : {}}
      >
        {e.quantity} - {e.item}
      </span>
      <button className="btn--del" onClick={() => handleDeleteTravelItem(e.id)}>
        <FcEmptyTrash />
      </button>
    </li>
  ));
  return <>{initialTravelItemsMap}</>;
}
