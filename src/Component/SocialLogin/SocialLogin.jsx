import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const {googleSignIn} = useAuth(); 
    const navigate = useNavigate(); 
    const from = location.state?.from?.pathname || '/'; 
    const axiosPublic = useAxiosPublic(); 


    const handleGoogleSignIn = () => {
        googleSignIn()
        .then((result)=> {
            // console.log('google login info', result);
            const userInfo = {name : result.user.displayName, email : result.user?.email}; 
            axiosPublic.post('/users', userInfo)
            .then(res => {
            //   console.log(res.data); 
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Log in Success !",
                      showConfirmButton: false,
                      iconColor: "green",
                      timer: 1500,
                    });
                    navigate(from, {replace : true})
                  
            })
        })
        .catch(err => console.log('error form google login', err)); 

    }
    return (
        <div >
            <div className="divider"></div>
            <div className="">
                <button onClick={handleGoogleSignIn} className="btn btn-block">
                    <FcGoogle className="text-xl"></FcGoogle> Continue with Google 
                </button>
            </div>
            
        </div>
    );
};

export default SocialLogin;