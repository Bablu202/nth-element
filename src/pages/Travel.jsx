import React, { useState } from "react";
import TravelForm from "../components/TravelForm";
import TravelItems from "../components/TravelItems";

export default function Travel() {
  const [initialTravelItems, setInitialTracelItems] = useState([]);

  //CALCULATIONS FOR FOOTER
  const allTravelItems = initialTravelItems.length;
  const itemsPacked = initialTravelItems.filter((e) => e.isPacked).length;
  const itemsPackedPercentage = Math.round(
    (itemsPacked / allTravelItems) * 100
  );
  let defaultTravelItem = { item: "", quantity: 1, isPacked: false };
  const [moreTravelElement, setMoreTravelElement] = useState(defaultTravelItem);
  //ADD HANDLE
  const handleAddTravelItems = (e) => {
    e.preventDefault();
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
            initialTravelItems={initialTravelItems}
            handleDeleteTravelItem={handleDeleteTravelItem}
            handleCheckedTravelItem={handleCheckedTravelItem}
          />
        </ul>
      </div>
      <footer className="footer">
        {!allTravelItems ? <em>Let's start adding</em> : footerStats}
      </footer>
    </div>
  );
}
