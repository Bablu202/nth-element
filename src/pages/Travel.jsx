import React, { useEffect, useState } from "react";
import TravelForm from "../components/TravelForm";
import TravelItems from "../components/TravelItems";

export default function Travel() {
  //LOCAL STORAGE
  let getLocalData = JSON.parse(localStorage.getItem("initialTravelItems"));
  let dataNeeded = (getLocalData.length ? null : []).length ? getLocalData : [];
  const [initialTravelItems, setInitialTracelItems] = useState(dataNeeded);

  //USE EFFECT To Store data Locally at Add Button
  useEffect(() => {
    localStorage.setItem(
      "initialTravelItems",
      JSON.stringify(initialTravelItems)
    );
  }, [initialTravelItems]);

  //CALCULATIONS FOR FOOTER
  const allTravelItems = initialTravelItems.length;
  const itemsPacked = initialTravelItems.filter((e) => e.isPacked).length;
  const itemsPackedPercentage = Math.round(
    (itemsPacked / allTravelItems) * 100
  );
  let defaultTravelItem = { item: "", quantity: 1, isPacked: false };
  const [moreTravelElement, setMoreTravelElement] = useState(defaultTravelItem);

  //SORT TRAVEL ITEMS
  const [sortBy, setSortBy] = useState("packed");
  let initialTravelItemsBySorted;
  if (sortBy === "input") initialTravelItemsBySorted = initialTravelItems;

  if (sortBy === "description")
    initialTravelItemsBySorted = initialTravelItems
      .slice()
      .sort((a, b) => a.item.localeCompare(b.item));

  // console.log(sortBy);
  if (sortBy === "packed")
    initialTravelItemsBySorted = initialTravelItems
      .slice()
      .sort((a, b) => Number(a.isPacked) - Number(b.isPacked));

  //ADD HANDLE
  const handleAddTravelItems = (e) => {
    e.preventDefault();
    if (!moreTravelElement.item) return;
    let idWithTime = Date.now();
    const newEle = {
      id: idWithTime,
      item: moreTravelElement.item,
      quantity: moreTravelElement.quantity,
      isPacked: moreTravelElement.isPacked,
    };
    setInitialTracelItems((prev) => [...prev, newEle]);

    setMoreTravelElement(defaultTravelItem);
  };
  //DELETE HANDLE
  const handleDeleteTravelItem = (id) => {
    console.log("del");
    const afterDelTravelList = initialTravelItems.filter((e) => e.id !== id);
    setInitialTracelItems(afterDelTravelList);
  };
  const handleCheckedTravelItem = (id) => {
    console.log("check");
    // setMoreTravelElement({ ...moreTravelElement, item: e.target.value })
    setInitialTracelItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    );
  };

  const footerStats =
    itemsPackedPercentage === 100 ? (
      <em>Wohohh....Lets Fly</em>
    ) : (
      <em>
        you have {allTravelItems} items on your list , so {itemsPacked} are
        packed, it's like {itemsPackedPercentage}% done..
      </em>
    );

  return (
    <div className="travel__element">
      <h1 className="heading-1">Let's Pack it up!</h1>
      <TravelForm
        handleAddTravelItems={handleAddTravelItems}
        moreTravelElement={moreTravelElement}
        setMoreTravelElement={setMoreTravelElement}
      />

      <div className="travel__list">
        <ul>
          <TravelItems
            initialTravelItems={initialTravelItemsBySorted}
            handleDeleteTravelItem={handleDeleteTravelItem}
            handleCheckedTravelItem={handleCheckedTravelItem}
          />
        </ul>
        <div className="travel__sort">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value="input">default Order</option>
            <option value="description">description Order</option>
            <option value="packed">to be packedorder</option>
          </select>
          <button
            className="btn"
            onClick={() => {
              setInitialTracelItems([]);
            }}
          >
            clear
          </button>
        </div>
      </div>

      <footer className="footer">
        {!allTravelItems ? <em>Let's start adding</em> : footerStats}
      </footer>
    </div>
  );
}
