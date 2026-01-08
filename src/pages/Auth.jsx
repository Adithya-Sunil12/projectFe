import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleAuth, loginUser, registerUser } from "../../services/allApi";
import { toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";

const Auth = ({ insideRegister }) => {
  const [registerData, setRegisterData] = useState(
    //for login also same dataa
    {
      userName: "",
      email: "",
      password: "",
    }
  );

  const navigate = useNavigate();

  //destructuring authcontext
const{saveToken}=useContext(AuthContext)

  const onRegisterClick = async () => {
    console.log("first");
    try {
      let apiResponse = await registerUser(registerData);
      console.log(apiResponse);
      if (apiResponse.status == 201) {
        toast("Successfully registered");
        navigate("/login");
      } else {
        toast(apiResponse.response.data.message);
      }
    } catch (error) {
      toast("error occured");
      console.log(error);
    }
  };

  const onLoginClick=async()=>{
    try {
      
      let reqBody=registerData

      delete reqBody.userName
      let apiResponse=await loginUser(reqBody)

       console.log(apiResponse)

      if (apiResponse.status==200){

       // localStorage.setItem('token',apiResponse.data.token)
       saveToken(apiResponse.data.token)
        localStorage.setItem('user',JSON.stringify(apiResponse.data.user))

        toast('Login Success')

        //  navigate('/')    //if login succes go to home--inside function to move from one page to another use navigate

        if(apiResponse.data.user.userType=='Admin'){
          navigate('/admin-home')
        }else{
          navigate('/')
        }
      }else{
        toast(apiResponse.response.data.message)
      }

    } catch (error) {
      toast('error occured')
      console.log(error)
    }
  }

  const googleDecode= async(credId)=>{      //to decode credentials from google

    const decoded=jwtDecode(credId)
    console.log(decoded)

    let reqBody={
      userName:decoded.name,
      email:decoded.email,
      profilePic:decoded.picture
    }
    let apiResponse= await googleAuth(reqBody)
    console.log(apiResponse)
    if(apiResponse.status==200 || apiResponse.status==201){    //if already logged in or newly registered

      //localStorage.setItem("token",apiResponse.data.token)
      saveToken(apiResponse.data.token)
      localStorage.setItem("user",JSON.stringify(apiResponse.data.user))
      toast("login success")
      navigate("/")
    }else{
      toast("error occured in google authentication")
    }


  }

  
  return (
    <>
      <div>
        <div className="bg-[url('https://unblast.com/wp-content/uploads/2021/01/Space-Background-Images.jpg')] h-screen bg-cover bg-center">
          <h2 className="text-center pt-10 text-white text-3xl font-bold tracking-wide drop-shadow-md">
            BOOK STORE
          </h2>

          <div className="flex justify-center items-center h-[80vh]">
            {/* Blurred Card */}
            <div
              className="p-6 rounded-2xl shadow-lg backdrop-blur-md bg-white/10 border border-white/20 flex flex-col justify-between"
              style={{ width: "460px", height: "550px" }}
            >
              <div className="space-y-5 flex flex-col justify-between h-full">
                <div>
                  <h5 className="text-xl font-medium text-white text-center">
                    <FontAwesomeIcon
                      className="text-white"
                      style={{ width: "70px", height: "70px" }}
                      icon={faCircleUser}
                    />
                  </h5>
                  <h2 className="text-center text-white text-2xl font-semibold mt-2">
                    {insideRegister ? "Register" : "Login"}
                  </h2>

                  <div className="mt-6 space-y-4">
                    {insideRegister && (
                      <input
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            userName: e.target.value,
                          })
                        }
                        type="text"
                        name="userName"
                        id="uName"
                        className="bg-white/30 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-200 text-white"
                        placeholder="Enter Username"
                        required
                      />
                    )}

                    <input
                  
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      type="email"
                      name="email"
                      id="email"
                      className="bg-white/30 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-200 text-white"
                      placeholder="Email Id"
                      required
                    />

                    <input
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="bg-white/30 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-200 text-white"
                      required
                    />
                  </div>

                  <div className="flex items-start justify-between text-xs text-gray-300 mt-2">
                    <label className="font-medium text-amber-300">
                      *Never share your password with others
                    </label>
                    <a href="#" className="text-blue-400 hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                  {insideRegister ? (
                    <button
                      onClick={onRegisterClick}
                      className="w-full mt-4 text-white bg-green-800 hover:bg-green-700 text-sm px-5 py-2.5 text-center rounded-lg transition"
                    >
                      Register
                    </button>
                  ) : (
                    <button onClick={onLoginClick} className="w-full mt-4 text-white bg-green-800 hover:bg-green-700 text-sm px-5 py-2.5 text-center rounded-lg transition">
                      Login
                    </button>
                  )}
                </div>

                <div>
                  <h6 className="text-center text-white ">
                    ------------------ or ---------------
                  </h6>
<GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);

    googleDecode(credentialResponse.credential)
  }}
  onError={() => {
    console.log('Login Failed');
    toast('Google authentication failed')
  }}
/>;
           

                  {insideRegister ? (
                    <div className="text-sm text-white text-center mt-5">
                      Already an existing user
                      <Link
                        to={"/login"}
                        href="#"
                        className="text-blue-400 hover:underline font-medium"
                      >
                        Login
                      </Link>
                    </div>
                  ) : (
                    <div className="text-sm text-white text-center mt-5">
                      Are you a new user?{" "}
                      <Link
                        to={"/register"}
                        href="#"
                        className="text-blue-400 hover:underline font-medium"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
