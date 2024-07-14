import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoutes = ({children}) => {
    
    const {user, loading} = useAuth(); 
    const location = useLocation(); 
    const [isAdmin, isAdminLoading] = useAdmin(); 


    if(loading || isAdminLoading){
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>
    }
    if(user && isAdmin){
        return children
    }

    return <Navigate to={'/login'} state={{from : location}} replace/>
};

export default AdminRoutes;