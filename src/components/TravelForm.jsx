import React from "react";

export default function TravelForm({
  handleAddTravelItems,
  moreTravelElement,
  setMoreTravelElement,
}) {
  return (
    <div>
      <form className="travel__form" onSubmit={handleAddTravelItems}>
        <h3 className="heading-3">Dont't forget what you need!</h3>
        {/*SELECT FROM 1 - 20 ------------*/}

        <select
          value={moreTravelElement.quantity}
          onChange={(e) => {
            setMoreTravelElement({
              ...moreTravelElement,
              quantity: e.target.value,
            });
          }}
        >
          {Array.from({ length: 20 }, (e, i) => i + 1).map((num) => (
            <option key={num}>{num}</option>
          ))}
        </select>
        {/*ADD ITEM HERE ------------*/}
        <input
          className="travel__form--input"
          type="text"
          placeholder="thing's to pack"
          value={moreTravelElement.item}
          onChange={(e) =>
            setMoreTravelElement({ ...moreTravelElement, item: e.target.value })
          }
        />
        {/*SUBMIT BUTTON ------------*/}

        <button className="btn--add" onClick={handleAddTravelItems}>
          Add
        </button>
      </form>
    </div>
  );
}
