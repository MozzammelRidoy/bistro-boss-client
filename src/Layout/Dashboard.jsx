import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaInbox,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  //Todo : Get is Admin Value From The Db
  const [isAdmin] = useAdmin() ;
  const [cart] = useCart(); 

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-[#D1A054]">
        <ul className="menu p-4 uppercase">
          {
            isAdmin ? <>
            {/* for admin dashboard  */}
            <li>
            <NavLink to={"/dashboard/adminHome"}>
              <FaHome></FaHome>Admin Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/additems"}>
              <FaUtensils></FaUtensils> Add Items
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/manageItems"}>
              <FaList></FaList> Manage Items
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/bookings"}>
              <FaBook></FaBook> Manage Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/users"}>
              <FaUsers></FaUsers> All Users
            </NavLink>
          </li>
          
             </> : 
             <>
             {/* for users Dashboard  */}
             <li>
            <NavLink to={"/dashboard/userHome"}>
              <FaHome></FaHome>User Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/reservation"}>
              <FaCalendar></FaCalendar> Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/paymentHistory"}>
              <FaWallet></FaWallet> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/cart"}>
              <FaShoppingCart></FaShoppingCart> My Cart +{cart.length}
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/review"}>
              <FaAd></FaAd> Add Review
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/booking"}>
              <FaList></FaList> My Booking
            </NavLink>
          </li>
             </>
          }
          <div className="divider px-4 "></div>
          <li>
            <NavLink to={"/"}>
              <FaHome></FaHome> Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/menu"}>
              <FaList></FaList> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to={"/order/salad"}>
              <FaShop></FaShop> Shop
            </NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>
              <FaEnvelope></FaEnvelope> Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
