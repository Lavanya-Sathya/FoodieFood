// Fetch data restaurant specific,
// this is used in RestaurantMenu.
import { useEffect, useState } from "react";
import { MENU_API } from "./constants";

const useRestaurantMenu = (resId) => {
  const [menu, setMenu] = useState();
  useEffect(() => {
    fetchMenu();
  }, []);
  const fetchMenu = async () => {
    try {
      const fetchData = await fetch(MENU_API + resId);
      const jsonData = await fetchData.json();
      setMenu(jsonData);
      // console.log(" data: ", jsonData);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return menu;
};
export default useRestaurantMenu;
