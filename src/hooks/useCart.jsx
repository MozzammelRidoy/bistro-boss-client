import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";



const useCart = () => {
    const {user} = useAuth(); 

    
    
    const axiosSecure = useAxiosSecure(); 
    const {data : cart = [], refetch, isPending : isLoading} = useQuery({ 
        queryKey : ['cart', user?.email],
        queryFn : async()=> {
            const res = await  axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data; 
        }

    })

    // console.log(cart)

    return [cart, refetch, isLoading];
};

export default useCart;