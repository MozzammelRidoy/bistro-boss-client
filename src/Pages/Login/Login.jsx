import { useEffect, useRef, useState } from "react";
import loginImage from "../../assets/others/authentication2.png";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import SocialLogin from "../../Component/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const {  signInUser } = useAuth();
  const axiosPublic = useAxiosPublic();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  // console.log(location);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const userInfo = {
          name: result.user.displayName,
          email: result.user?.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Log in Success !",
            showConfirmButton: false,
            iconColor: "green",
            timer: 1500,
          });
          navigate(from, { replace: true });
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Log in Failed !",
          showConfirmButton: false,
          iconColor: "red",
          timer: 1500,
        });
      });
  };
  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    // console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value)) {
      //   console.log("matched");
      setDisabled(false);
    } else {
      //   console.log("dosnt match");
      setDisabled(true);
    }
  };
  return (
    <section>
      <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col gap-10 lg:flex-row">
          <div className=" w-1/2">
            <img src={loginImage} alt="" />
          </div>
          <div className="card card-body bg-base-100 w-1/2 max-w-sm  shadow-2xl">
            <form onSubmit={handleLogin} className="">
              <h1 className="text-3xl text-center font-bold">Login</h1>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div>
                <label className="label ">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  className="input input-bordered w-full"
                  placeholder="Type Captcha"
                />
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value={"Login"}
                  disabled={disabled}
                  className="btn bg-[#D1A054] text-white"
                />
              </div>
              <p className="text-[#D1A054] text-center">
                <small>
                  New Here ?{" "}
                  <Link className="font-bold underline" to={"/signUp"}>
                    Create a New Account
                  </Link>
                </small>
              </p>
            </form>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
