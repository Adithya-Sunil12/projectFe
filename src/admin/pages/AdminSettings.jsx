import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { toast } from "react-toastify";
import { updateProfile } from "../../../services/allApi";

const AdminSettings = () => {
  const [preview, setPreview] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
  );
  const [profileData, setProfileData] = useState({
    userName: "",
    profilePic: "",
    password: "",
    confirmPassword: "",
  });
  const handleImage = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setProfileData({ ...profileData, profilePic: e.target.files[0] });
  };
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user"));
    setProfileData(userData);
  }, []);

  const onSubmitClick = async () => {
    try {
      if (
        profileData.userName == "" ||
        profileData.password == "" ||
        profileData.confirmPassword == ""
      ) {
        toast.error("Please fill the form");
      } else {
        if (profileData.password == profileData.confirmPassword) {
          //proceed to api call
          let token = localStorage.getItem("token");
          let header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          };
          let reqBody = new FormData();
          for (let key in profileData) {
            reqBody.append(key, profileData[key]);
          }
          let apiResponse = await updateProfile(
            profileData._id,
            reqBody,
            header
          );
          console.log(apiResponse);
          if (apiResponse.status == 200) {
            toast.success("Succsefully updated");
            localStorage.setItem(
              "user",
              JSON.stringify(apiResponse.data.updatedUser)
            );
          } else {
            toast.error(apiResponse.response.data.message);
          }
        } else {
          toast.error("Password and confirm password do not match");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[2fr_5fr]">
        <AdminSideBar />
        <div>
          <h1 className="text-center text-3xl"> Settings</h1>
          <div className="grid grid-cols-2 gap-10">
            <div className="ms-10 mt-10">
              <p className="text-justify">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
                debitis esse saepe molestiae nemo eaque delectus exercitationem
                deleniti unde iusto distinctio reiciendis recusandae ullam
                fugit, quidem ad soluta inventore. Ea.
              </p>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                maxime corrupti quis dolorem ratione? Corporis a tempora dolor
                voluptates explicabo animi sed, fugiat consequatur, velit dolore
                adipisci beatae doloribus odio!
              </p>
            </div>
            <div className="bg-gray-300 p-10 mt-10 me-3 rounded">
              <label htmlFor="inp">
                <input
                  className="hidden"
                  type="file"
                  name=""
                  id="inp"
                  onChange={(e) => handleImage(e)}
                />
                <img className="w-50" src={preview} alt="" />
              </label>
              <div className="mt-10">
                <input
                  type="text"
                  className="bg-white text-black w-full p-2 rounded-2xl"
                  placeholder="Username"
                  value={profileData.userName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, userName: e.target.value })
                  }
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  className="bg-white text-black w-full p-2 rounded-2xl"
                  placeholder="Password"
                  value={profileData.password}
                  onChange={(e) =>
                    setProfileData({ ...profileData, password: e.target.value })
                  }
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  className="bg-white text-black w-full p-2 rounded-2xl"
                  placeholder="Confirm Password"
                  value={profileData.confirmPassword}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mt-5 text-center">
                <button className="bg-red-800 p-2 w-30 rounded-2xl text-xl text-white">
                  Reset
                </button>
                <button
                  className="bg-green-600 ms-3 p-2 w-30 rounded-2xl text-xl text-white"
                  onClick={onSubmitClick}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
