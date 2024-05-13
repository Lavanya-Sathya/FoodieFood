import { useEffect, useState } from "react";
import { RES_API } from "./constants";
const useRestaurant = () => {
  const [res, setRes] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(RES_API);
      const jsonData = await res.json();
      setRes(jsonData);
      console.log("JsonData: ", jsonData);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return res;
};
export default useRestaurant;
