import React from "react";

export default function TravelItems({
  initialTravelItems,
  handleDeleteTravelItem,
  handleCheckedTravelItem,
}) {
  const initialTravelItemsMap = initialTravelItems.map((e) => (
    <li key={e.id}>
      <input
        type="checkbox"
        value={e.isPacked}
        onChange={() => handleCheckedTravelItem(e.id)}
      />
      <span style={e.isPacked ? { textDecoration: "line-through" } : {}}>
        {e.quantity} - {e.item}
      </span>
      <button className="btn--del" onClick={() => handleDeleteTravelItem(e.id)}>
        X
      </button>
    </li>
  ));
  return <>{initialTravelItemsMap}</>;
}
