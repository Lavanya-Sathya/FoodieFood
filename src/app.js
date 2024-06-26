import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./components/About";
import Service from "./components/Service";
import Cart from "./components/Cart";
import RestaurantMenu from "./components/RestaurantMenu";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Footer from "./components/Footer";
import ResCollection from "./components/ResCollection";

const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        <Header />
        <div className="mt-40">
          <Outlet />
        </div>
        <Footer />
      </div>
    </Provider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/service",
        element: <Service />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/restaurant/collection/:collectionId/:tag",
        element: <ResCollection />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
