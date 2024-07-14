import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://bistro-boss-server-alpha-mocha.vercel.app",
});
const useAxiosSecure = () => {
  const { userLogout } = useAuth();

  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");

      //   console.log("request stopped by interceptors", token);
      config.headers.authorization = `Bearer ${token}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (config) => {
      return config;
    },
    async(error) => {
      const status = error.response.status;
      //   console.log("error form inceptor", status);
      if (status === 401 || status === 403) {
       await userLogout();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
