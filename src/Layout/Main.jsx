import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Home/Shared/Footer/Footer";
import Navbar from "../Pages/Home/Shared/Navbar/Navbar";

const Main = () => {
    const location = useLocation(); 
    // console.log(location);
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signUp'); 

    return (
        <div className="">
           {
            noHeaderFooter ||  <Navbar></Navbar>
           }
            <Outlet></Outlet>
            <div className="p-5 text-center bg-slate-200 text-black"><p className="font-semibold">---Admin Site Login---</p><p>Email: admin@email.com</p> <p>Password : Admin123@</p></div>
            {
                noHeaderFooter || <Footer></Footer>
            }
        </div>
    );
};

export default Main;