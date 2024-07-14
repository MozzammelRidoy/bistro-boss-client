import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  //   console.log(cart);
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("delete request", _id);
        axiosSecure.delete(`/carts/${_id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
              showConfirmButton : false,
              timer : 1500
            });
            refetch();
          }
        });
        //
      }
    });
  };
  return (
    <div>
      <div className="flex justify-evenly uppercase">
        <h2 className="text-4xl">Total orders : {cart.length}</h2>
        <h2 className="text-4xl">Total Price : ${totalPrice}</h2>
        { cart.length ? <Link to={'/dashboard/payment'}><button  className="btn text-white px-6 bg-[#D1A054]">Pay</button></Link> : <button disabled  className="btn text-white px-6 bg-[#D1A054]">Pay</button> }
      </div>
      <div>
        <div className="my-6">
          <table className="w-full text-left ">
            {/* head */}
            <thead className="bg-[#D1A054] text-white">
              <tr>
                <th></th>
                <th className="py-2">Item Image</th>
                <th>Item Name</th>
                <th>Price </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    {item?.image && (
                      <img
                        className="white-mask white-mask-squircle h-16 w-16"
                        src={item?.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <th>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="white-btn text-xl white-btn-ghost text-red-500 white-btn-xs"
                    >
                      <FaTrashAlt />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
