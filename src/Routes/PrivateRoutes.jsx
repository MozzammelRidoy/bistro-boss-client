import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({children}) => {
    const location = useLocation(); 
    // console.log(location);

    const {user, loading} = useAuth(); 
    if(loading){
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>
    }
    if(user){
        return children
    }
    return <Navigate to={'/login'} state={{from : location}} replace></Navigate>
};

export default PrivateRoutes;