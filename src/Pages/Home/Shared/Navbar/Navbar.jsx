import { NavLink } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../../hooks/useCart";
import useAdmin from "../../../../hooks/useAdmin";

const Navbar = () => {
  const { user, userLogout } = useAuth();
  const [isAdmin] = useAdmin();
  
  const [cart] = useCart();

  const handleLogout = () => {
    userLogout()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Log out Success",
          showConfirmButton: false,
          iconColor: "green",
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  const navOption = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/contactUs"}>Contact Us</NavLink>
      </li>
      {
        user && isAdmin && <li>
        <NavLink to={"/dashboard/adminHome"}>Dashboard</NavLink>
      </li>
      }
      {
        user && !isAdmin && <li>
        <NavLink to={"/dashboard/userHome"}>Dashboard</NavLink>
      </li>
      }
      <li>
        <NavLink to={"/menu"}>Our Menu</NavLink>
      </li>
      <li>
        <NavLink to={"/order/salad"}>Order Food</NavLink>
      </li>

      {user ? (
        <>
          <li>
            <NavLink to={"dashboard/cart"}>
              <FaShoppingCart className="text-xl " />
              <span className="badge badge-secondary">+{cart?.length}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/secret"}>Secret</NavLink>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="btn-outline hover:text-[#D1A054] text-white"
            >
              Log Out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to={"/login"}>Log in</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar  fixed z-10 bg-opacity-30 text-white max-w-screen-xl mx-auto bg-black">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navOption}
          </ul>
        </div>
        <p className="btn btn-ghost text-xl  uppercase block">
          Bistro Boss
          <span className="text-xs tracking-[4px] block">Restaurant</span>
        </p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOption}</ul>
      </div>
      <div className="navbar-end">
        {user && <p className="me-5 font-bold">{user?.displayName}</p>}
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
