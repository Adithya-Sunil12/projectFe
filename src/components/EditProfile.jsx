import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState } from "react";
import { use } from "react";
import { updateProfile } from "../../services/allApi";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
  );
//for editing profile
  const [editData, setEditData] = useState({
    userName: "",
    confirmPassword: "",
    password: "",
    bio: "",
    profilePic: "",
  });
//to display the old data when edit button clicked
  useEffect(()=>{
    let userDetails=JSON.parse(localStorage.getItem('user'))     //from 'user' we get data
    console.log(userDetails)
      setEditData(userDetails)
     
  },[])


  const handleUploadImage = (e) => {
    console.log(e.target.files);
    setEditData({ ...editData, profilePic: e.target.files[0] });

    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const updateUser=async()=>{
    try {
       if(editData.password==editData.confirmPassword){
       //proceed to api call 
       let token=localStorage.getItem("token")

       //multimedia uploading---photo is uploded--to send file to backend  multipart/form-data
       let header={ 
          Authorization : `Bearer ${token}`,
          'Content-Type':'multipart/form-data'
       }
      let reqBody=new FormData()   //key value pairs akknm enkile multipart form data undayond send cheyyn pattuu
      //looping to gt each key and values
      for(let key in editData){
          // console.log(key,editData[key])
          reqBody.append(key,editData[key])   //adding each key value pair to reqbody
        }

        let apiResponse=await updateProfile(editData._id,reqBody,header)
        console.log(apiResponse)
        
        if(apiResponse.status==200){
          toast.success("profile updated")

          //store the updated user in local storage 
          localStorage.setItem('user',JSON.stringify(apiResponse.data.updatedUser))
          setOpenModal(false)
        }else{
          toast.error(apiResponse.response.data.message)
        }
       }else{
        toast.error("passwords are not matching")
       }
    } catch (error) {
      console.log(error)
        toast.error("error occured while updating the profile")
    }
  }
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-4 py-2 rounded mr-[10%]"
      >
        Edit
      </button>
      <Modal
        className="w-90 "
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalBody>
          <div className="space-y-6 flex flex-col items-center">
            <label htmlFor="imgUP">
              <input
                type="file"
                name=""
                id="imgUP"
                className="hidden"
                onChange={(e) => handleUploadImage(e)}
              />
              <img src={preview} alt="" className="rounded-full w-45" />
            </label>
            <input
              type="text"
              className="bg-white p-2 text-black rounded-xl w-60"
              placeholder="Username"
              value={editData?.userName}
              onChange={(e) =>
                setEditData({ ...editData, userName: e.target.value })
              }
            />
            <input
              type="password"
              className="bg-white  p-2 text-black rounded-xl w-60"
              placeholder="Password"
              value={editData?.password}
              onChange={(e) =>
                setEditData({ ...editData, password: e.target.value })
              }
            />
            <input
              type="password"
              className="bg-white p-2 text-black rounded-xl w-60"
              placeholder="Confirm Password"
              value={editData?.confirmPassword}
              onChange={(e) =>
                setEditData({ ...editData, confirmPassword: e.target.value })
              }
            />
            <textarea
              name=""
              id=""
              className="bg-white  text-black rounded-xl w-60"
              placeholder="bio"
              value={editData?.bio}
              onChange={(e) =>
                setEditData({ ...editData, bio: e.target.value })
              }
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="border border-blue-700 bg-blue-100
           text-blue-700 hover:bg-green-700 hover:text-white px-4 py-2 rounded mr-[10%]"
            onClick={updateUser}
          >
            Save Changes
          </Button>
          <Button
            className="border border-blue-700 bg-blue-100
           text-blue-700 hover:bg-red-700 hover:text-white px-4 py-2 rounded mr-[10%]"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditProfile;
