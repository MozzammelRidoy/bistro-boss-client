import { useForm } from "react-hook-form";

import loginImage from "../../assets/others/authentication2.png";

import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();

  const { createNewUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createNewUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        // console.log(loggedUser);
        updateUserProfile(data.name, data.photo)
          .then(() => console.log("update user"))
          .catch((err) => console.log(err));
        const userInfo = { name: data.name, email: data.email };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Account Created Success !",
              showConfirmButton: false,
              iconColor: "green",
              timer: 1500,
            });
            navigate("/");
          }
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col gap-10 lg:flex-row-reverse">
          <div className=" w-1/2 ">
            <img src={loginImage} alt="" />
          </div>
          <div className="card bg-base-100 w-1/2 max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h1 className="text-3xl text-center font-bold">Sign Up</h1>

              <div className="form-control relative mb-3">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="name"
                  className="input input-bordered"
                />
                <p className="absolute -bottom-6">
                  {errors.name && (
                    <span className="text-red-500 ">Name is required</span>
                  )}
                </p>
              </div>
              <div className="form-control relative mb-3">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="text"
                  {...register("photo", { required: true })}
                  placeholder="photo URL"
                  className="input input-bordered"
                />
                <p className="absolute -bottom-6">
                  {errors.name && (
                    <span className="text-red-500 ">Name is required</span>
                  )}
                </p>
              </div>
              <div className="form-control relative mb-3">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                  className="input input-bordered"
                />
                <p className="absolute -bottom-6">
                  {errors.email && (
                    <span className="text-red-500 ">Email is required</span>
                  )}
                </p>
              </div>
              <div className="form-control relative mb-3">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 20,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,20}$/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />

                <p className="absolute top-[85px]">
                  {errors.password?.type === "required" && (
                    <span className="text-red-500 ">Password is required</span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-500">
                      Password must be 8 charecters
                    </span>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <span className="text-red-500 ">
                      Password must be less then 20 charecters
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-500  text-wrap">
                      Password must be have one uppercase one lowercase one
                      number and one special charecters
                    </span>
                  )}
                </p>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value={"Sign Up"}
                  className="btn bg-[#D1A054] text-white"
                />
              </div>
              <p className="text-[#D1A054] text-center">
                <small>
                  Already registered ?{" "}
                  <Link className="font-bold underline" to={"/login"}>
                    Go to log in
                  </Link>
                </small>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
