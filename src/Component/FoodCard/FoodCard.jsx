import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ items }) => {
    const {name, image, recipe, price} = items; 
    const [,refetch] = useCart();
    const {user} = useAuth(); 
    const navigate = useNavigate();
    const location = useLocation(); 
    const axisoSecure = useAxiosSecure(); 




    const handleAddToCart = food => {
        if(user && user.email){
            //send cart item to the Db
            const cartItem = {menuId : food._id, email : user.email, name : food.name, price : food.price, image : food.image}; 
            
            // console.log(cartItem);

            axisoSecure.post('/carts', cartItem)
            .then(res => {
                // console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Add To Cart Added Success !",
                        showConfirmButton: false,
                        iconColor : 'green',
                        timer: 1500
                      });
                      refetch()

                }
            })
        }
        else{
            Swal.fire({
                title: "You Are not Logged in !",
                text: "Please Login to add to the Cart ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, I want to Log in",
                cancelButtonText : 'Not Now'
              }).then((result) => {
                if (result.isConfirmed) {
                 navigate('/login', {state : {from : location}})
                }
              });
        }
    }
  return (
    <div className="relative bg-base-100 w-96 shadow-xl">
      <figure className="">
        <img
          src={image}
          alt={name}
          className="w-full"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <p className="absolute right-0 mr-4 top-0 mt-4 bg-slate-900 text-white px-4 py-1">${price}</p>
        <div className="card-actions">
          <button onClick={()=>handleAddToCart(items)} className="btn bg-[#E8E8E8] text-[#BB8506] border-b-2 border-b-[#BB8506] hover:bg-black uppercase">Add To Cart</button>
        </div>
      </div>
    </div>
    
  );
};

export default FoodCard;
