import React, { useEffect, useState } from "react";
import TravelForm from "../components/TravelForm";
import TravelItems from "../components/TravelItems";
import Footer from "../components/Footer";
import { supabase } from "../supabase/client";
export default function Travel({ user }) {
  const [initialTravelItems, setInitialTracelItems] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(true);
  //CALCULATIONS FOR FOOTER
  const allTravelItems = initialTravelItems.length;
  const itemsPacked = initialTravelItems.filter((e) => e.isPacked).length;
  const itemsPackedPercentage = Math.round(
    (itemsPacked / allTravelItems) * 100
  );

  let defaultTravelItem = { item: "", quantity: 1, isPacked: false };
  const [moreTravelElement, setMoreTravelElement] = useState(defaultTravelItem);
  //console.log(user.user.id);
  //ADD HANDLE
  const handleAddTravelItems = async (e) => {
    e.preventDefault();
    if (!moreTravelElement.item) return;

    const { data: dbAddTravelItems, error } = await supabase
      .from("travelList")
      .insert({
        item: moreTravelElement.item,
        quantity: moreTravelElement.quantity,
        isPacked: moreTravelElement.isPacked,
        user_id: user.user.id,
      })
      .select("*")
      .single();

    if (dbAddTravelItems) {
      setInitialTracelItems((prev) => [...prev, dbAddTravelItems]);
    }
    if (error) {
      setError(error);
    }
    setMoreTravelElement(defaultTravelItem);
  };

  //DELETE HANDLE
  const handleDeleteTravelItem = async (id) => {
    //DELETE SUPABASE
    await supabase.from("travelList").delete().eq("id", id);
    if (!error) {
      setInitialTracelItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setError(error);
    }
  };

  //HANDLE IS PACKED OR NOT
  const handleCheckedTravelItem = async (id) => {
    setActive((prev) => !prev);
    //SUPABASE

    await supabase
      .from("travelList")
      .update({ isPacked: !active })
      .eq("id", id)
      .select("*")
      .single();

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
  //SORT TRAVEL ITEMS
  const [sortBy, setSortBy] = useState("input");
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
  //USE EFFECT TO RETRIVE DATA FROM DATABASE SUPABASE
  const getTravelList = async () => {
    const res = await supabase.from("travelList").select("*");
    setInitialTracelItems(res.data);
  };
  console.log(user.user.id);
  //
  const clearAllFunction = async () => {
    await supabase.from("travelList").delete().eq("user_id", user.user.id);
    setInitialTracelItems([]);
  };

  useEffect(() => {
    getTravelList();
  }, []);
  return (
    <div className="travel__element">
      <h1 className="heading-1">Let's Pack it up!</h1>
      <TravelForm
        handleAddTravelItems={handleAddTravelItems}
        moreTravelElement={moreTravelElement}
        setMoreTravelElement={setMoreTravelElement}
      />
      <div className="travel__list">
        <ul className="travel__item">
          <TravelItems
            initialTravelItemsBySorted={initialTravelItemsBySorted}
            handleDeleteTravelItem={handleDeleteTravelItem}
            handleCheckedTravelItem={handleCheckedTravelItem}
          />
        </ul>
      </div>
      <Footer
        setSortBy={setSortBy}
        clearAllFunction={clearAllFunction}
        allTravelItems={allTravelItems}
        footerStats={footerStats}
        user={user}
      />
    </div>
  );
}
