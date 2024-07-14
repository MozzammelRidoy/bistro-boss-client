import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  // console.log(users);
  const handleUserDelete = (_id) => {
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
        axiosSecure.delete(`/users/${_id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
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

  const handleMakeAdmin = (user) => {
    console.log("set user role");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: `${user.name} is an Admin Now !`,

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
    <div>
      <div className="mx-auto text-center w-1/2 my-2">
        <p className="text-yellow-600 mb-2 text-xl">---How many??---</p>
        <h3 className="text-5xl uppercase border-y-4 py-4">MANAGE ALL USERS</h3>
      </div>
      <div className=" my-2">
        <h3 className="text-3xl uppercase">Total Users : {users.length} </h3>
      </div>
      <div>
        <table className="table ">
          <thead className="bg-[#D1A054] text-white uppercase py-2 ">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="bg-slate-200 rounded-lg px-2 py-1 text-green-500 font-bold">
                      Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="bg-[#D1A054] text-white btn-lg text-2xl btn"
                    >
                      <FaUsers></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleUserDelete(user._id)}
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
    </div>
  );
};

export default AllUsers;
