const RestaurantCategory = (props) => {
  const { title, itemCards, categories } = props?.items;
  console.log("items : ", title);
  return <div>{itemCards && <div>{title}</div>}</div>;
};
export default RestaurantCategory;
