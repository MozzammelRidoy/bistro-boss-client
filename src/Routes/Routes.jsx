import { createBrowserRouter } from "react-router-dom";
import Main from './../Layout/Main';
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import Secret from "../Pages/Home/Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoutes from "./AdminRoutes";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Layout/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children : [
        {
            path : '/',
            element : <Home></Home>
        },
        {
            path : '/menu',
            element: <Menu></Menu>
        },
        {
          path : '/order/:category',
          element : <Order></Order>
        },
        {
          path : '/login',
          element : <Login></Login>
        },
        {
          path : '/signUp',
          element: <SignUp></SignUp>
        },
        {
          path : '/secret',
          element : <PrivateRoutes><Secret></Secret></PrivateRoutes>
        }
      ]
    },
    // dashboard releted routes --------------------
    {
      path : 'dashboard',
      element : <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children : [
        {
          path : 'userHome',
          element : <PrivateRoutes><UserHome></UserHome></PrivateRoutes>
        },
        {
          path : 'adminHome',
          element : <AdminRoutes><AdminHome></AdminHome></AdminRoutes>
        },
        {
          path : 'cart',
          element : <PrivateRoutes> <Cart></Cart></PrivateRoutes>
        },
        {
          path : 'payment',
          element : <PrivateRoutes><Payment></Payment></PrivateRoutes>
        },
        {
          path : 'paymentHistory',
          element : <PrivateRoutes><PaymentHistory></PaymentHistory></PrivateRoutes>
        },
        {
          path : 'users',
          element : <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
        },
        {
          path : 'addItems',
          element : <AdminRoutes><AddItems></AddItems></AdminRoutes>
        },
        {
          path : 'manageItems',
          element: <AdminRoutes><ManageItems></ManageItems></AdminRoutes>
        },
        {
          path : 'updateItem/:id',
          element : <AdminRoutes><UpdateItem></UpdateItem></AdminRoutes>,
          loader : ({params}) => fetch(`https://bistro-boss-server-alpha-mocha.vercel.app/menu/${params.id}`)
        }
      ]
    }
  ]);


  export default router;