import { useEffect, useState } from "react";

const useResCollection = (props) => {
  const { collectionId, tag } = props;
  console.log("id: ", collectionId);
  const [collection, setCollection] = useState([]);
  const COLLECTION_API = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&collection=${collectionId}&tags=${tag}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;
  useEffect(() => {
    fetchCollection();
  }, []);
  const fetchCollection = async () => {
    const fetchData = await fetch(COLLECTION_API);
    const jsonData = await fetchData.json();
    console.log("jsonData: ", jsonData);
    setCollection(jsonData);
  };
  return collection;
};
export default useResCollection;
