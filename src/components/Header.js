import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
const Header = () => {
  return (
    <div className="bg-white flex items-center justify-between fixed w-full top-0 left-0 shadow-lg z-20">
      <div className="">
        <img src={logo} alt="logo" className="w-[90px] h-[90px]" />
      </div>
      <div className="">
        <ul className="flex gap-4 pr-4 text-lg">
          <li className="hover:border-b-2 border-orange-500">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:border-b-2 border-orange-500">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:border-b-2 border-orange-500">
            <Link to="/service">Service</Link>
          </li>
          <li className="hover:border-b-2 border-orange-500">
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
