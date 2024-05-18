// This component is the footer section of FoodieFood
const Footer = () => {
  return (
    <div className="bg-black w-full">
      <div className="mt-4 py-10 px-5 md:px-10 text-white w-10/12 md:w-9/12 mx-auto flex  flex-col lg:flex-row gap-10">
        <div className="font-bold text-xl px-4 md:px-8">
          <h1>FoodieFood</h1>
          <h1 className="text-slate-400">&copy; 2024</h1>
        </div>
        <div className=" px-4 md:px-8 ">
          <h1 className="font-bold text-lg pb-2">Company</h1>
          <div className="flex flex-col gap-1 text-lg text-slate-400">
            <p>About</p>
            <p>Careers</p>
            <p>Team</p>
            <p>Swiggy One</p>
            <p>Swiggy Instamart</p>
            <p>Swiggy Genie</p>
          </div>
        </div>
        <div className="px-4 md:px-8">
          <div>
            <h1 className="font-bold text-lg pb-2">Contact Us</h1>
            <div className="flex flex-col gap-1 text-lg text-slate-400">
              <p>Help & Support</p>
              <p>Partner with us</p>
              <p>Ride with us</p>
            </div>
          </div>
          <div className="mt-8">
            <h1 className="font-bold text-lg pb-2">Legal</h1>
            <div className="flex flex-col gap-1 text-lg text-slate-400">
              <p>Terms & Conditions</p>
              <p>Cookie Policy </p>
              <p>Privacy Policy </p>
            </div>
          </div>
        </div>
        <div className="px-4 md:px-8">
          <h1 className="font-bold text-lg pb-2">We deliver to</h1>
          <div className="flex flex-col gap-1 text-lg text-slate-400">
            <p>Bengaluru</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
