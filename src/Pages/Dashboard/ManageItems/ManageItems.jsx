import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, ,refetch] = useMenu();
  const axiosSecure = useAxiosSecure(); 


  
  const handleItemDelete = _id => {
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
        // console.log("delete request", _id);
        axiosSecure.delete(`/menu/${_id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Item has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
        //
      }
    });
  };
  return (
    <section>
      <div className="mx-auto text-center w-1/2 my-2">
        <p className="text-yellow-600 mb-2 text-xl">---Hurry Up!---</p>
        <h3 className="text-5xl uppercase border-y-4 py-4">MANAGE ALL Items</h3>
      </div>

      <div className=" my-2">
        <h3 className="text-3xl uppercase">Total Items : {menu.length} </h3>
      </div>

      <div>
        <table className="table ">
          <thead className="bg-[#D1A054] text-white uppercase py-2 ">
            <tr>
              <th></th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <img className="w-16 h-16" src={item.image} alt="" />
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                  <button
                    className="bg-[#D1A054] text-white btn-lg text-2xl   btn"
                  >
                    <FaEdit></FaEdit>
                  </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleItemDelete(item._id)}
                    className="btn bg-red-500 text-white text-xl"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageItems;
