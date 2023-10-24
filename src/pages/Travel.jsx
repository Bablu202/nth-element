import React, { useState } from "react";

export default function Travel() {
  const [initialTravelItems, setInitialTracelItems] = useState([
    { item: "Passport", quantity: 2, isPacked: false },
    { item: "Jeans", quantity: 3, isPacked: false },
    { item: "Shirts", quantity: 5, isPacked: true },
  ]);
  const [moreTravelElement, setMoreTravelElement] = useState({
    item: "",
    quantity: 1,
    isPacked: false,
  });
  const handleAddTravelItems = (e) => {
    e.preventDefault();
    const newEle = {
      item: moreTravelElement.item,
      quantity: moreTravelElement.quantity,
      isPacked: moreTravelElement.isPacked,
    };
    //setUsers((oldList) => [...oldList, user]);
    setInitialTracelItems((prev) => [...prev, newEle]);
  };

  const initialTravelItemsMap = initialTravelItems.map((e, i) => (
    <li key={i}>
      <span style={e.isPacked ? { textDecoration: "line-through" } : {}}>
        {e.quantity} - {e.item}
      </span>
    </li>
  ));

  return (
    <div className="travel__element">
      <h1 className="heading-1">Let's Pack it up!</h1>
      {/*FORM ------------*/}
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

        <button className="travel__add btn" onClick={handleAddTravelItems}>
          Add
        </button>
      </form>
      <div className="travel__list">
        <ul>{initialTravelItemsMap}</ul>
      </div>
      <footer className="footer">
        <em>you have .. items on your list</em>
      </footer>
    </div>
  );
}
