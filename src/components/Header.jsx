import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSignOut, faUserEdit, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AllBooks } from "../pages/AllBooks";
import { Dropdown, DropdownItem } from "flowbite-react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  // const [token, setToken] = useState("");
  const{removeToken,token}=useContext(AuthContext)
  
  // useEffect(() => {
  //   let tkn = localStorage.getItem("token");
  //   if (tkn) {
  //     setToken(tkn);
  //   }
  // }, [token]);

  const onLogOutClick=()=>{
           removeToken()
           navigate('/')
  }
  const navigate=useNavigate()

  return (
    <div>
      <div className="flex justify-between items-center">
        <img
          src="https://thumbs.dreamstime.com/b/open-book-cartoon-illustration-education-school-reading-374170385.jpg"
          alt=""
          className="w-15 ms-6 "
        />
        <h1 className="text-center text-4xl font-bold">BOOK STORE</h1>

        <div className="me-4 flex items-center">
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faXTwitter} />
          <FontAwesomeIcon icon={faFacebook} />
          {token ? (
            <Dropdown  label={
               <div>
      <img className="w-10" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
     </div>
            } dismissOnClick={false}>
    
             <div className="bg-white w-25">
               <DropdownItem className=" text-md ps-2"> <Link to={'/profile'}>Profile  <FontAwesomeIcon icon={faUserEdit}/></Link>
            </DropdownItem>
              <DropdownItem className=" text-md ps-2"> <button onClick={onLogOutClick}>Logout <FontAwesomeIcon icon={faSignOut}/></button></DropdownItem>
             </div>
             
            </Dropdown>
          ) : (
            <Link to={"/login"}>
              <button className="border-2 p-2 font-bold hover:bg-black hover:text-white rounded-2xl">
                {" "}
                <FontAwesomeIcon icon={faUser} /> Login
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="bg-black">
        <nav>
          <div className="flex justify-center items-center text-white bg-black h-10">
            <Link to={"/"}>Home</Link>

            <Link to={"/allbooks"} className="ms-10">
              Books
            </Link>
            <Link to={"/careers"} className="ms-10">
              Careers{" "}
            </Link>
            <Link to={"/contact"} className="ms-10">
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
