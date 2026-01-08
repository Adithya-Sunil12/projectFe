import React, { use, useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { addBook, getSoldBooks } from "../../services/allApi";
import EditProfile from "../components/EditProfile";
import { AuthContext } from "../context/AuthContext";


const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [sellBookFlag, setSellBookFlag] = useState(true);
  const [bookStatusFlag, setBookStatusFlag] = useState(false);
  const [purchaseFlag, setPurchaseFlag] = useState(false);

  const {token}=useContext(AuthContext)
  const[soldBookData,setSoldBookData]=useState([])

  const [uploadedImage, setUploadedImage] = useState(null);
  const [preview, setPreview] = useState(
    "https://demos.creative-tim.com/vue-black-dashboard-pro/img/image_placeholder.jpg"
  );
  //to show the image when we upload

  const [previewList, setPreviewList] = useState([]);

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: 0,
    abstract: "",
    noOfPages: 0,
    imageUrl: "",
    uploadedImages: [], //pushed into this array --we get from handleUploadImage
    discountPrice: 0,
    publisher: "",
    language: "",
    ISBN: "",
    category: "",
  });

  const loadProfileData = () => {
    let userDetails = localStorage.getItem("user");
    userDetails = JSON.parse(userDetails);
    setUserData(userDetails);
  };

  const handleUploadImage = (e) => {
    console.log(e.target.files);

    setUploadedImage(e.target.value); //to store the images uploaded--not necessary

    setBookData({
      ...bookData,
      uploadedImages: [...bookData.uploadedImages, e.target.files[0]],
    });
    setPreview(URL.createObjectURL(e.target.files[0]));

    if (previewList.length <= 2) {
      setPreviewList([...previewList, URL.createObjectURL(e.target.files[0])]);
    }
  };
  const addBookClick = async () => {
    try {
      if (
        bookData.title == "" ||
        bookData.author == "" ||
        bookData.ISBN == "" ||
        bookData.abstract == "" ||
        bookData.category == "" ||
        bookData.discountPrice == 0 ||
        bookData.imageUrl == "" ||
        bookData.language == "" ||
        bookData.noOfPages == 0 ||
        bookData.price == 0 ||
        bookData.publisher == "" ||
        bookData.uploadedImages == []
      ) {
        toast.warning("please fill all the fields in the form");
      } else {
        //proceed to api call

        //create new form dataa to handle file uploads
        let reqBody = new FormData();

        //loops thru bookData obj to access each
        for (let key in bookData) {
          console.log(key);
          //we need all keys except the imageUploads becos it is an array and has diff logic
          if (key != "uploadedImages") {
            reqBody.append(key, bookData[key]);
          } else {
            bookData.uploadedImages.forEach((eachFile) => {
              reqBody.append("uploadedImages", eachFile);
            });
          }
        }
        //get the token for providing headers
      
        //header for api calll
        let header = {
          //bearer token and multipart form data
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };
        let apiResponse = await addBook(reqBody, header);
        console.log(apiResponse);
        if (apiResponse.status == 201) {
          toast.success("Successfully added the book");
        } else {
          toast.error(apiResponse.response.data.message);
        }
      }
    } catch (error) {
      toast.error("Error occcured while adding book");
    }
  };

  useEffect(()=>{
    loadProfileData(),
    getSoldBooksList()
  },[])


  const getSoldBooksList=async()=>{
    try {
      let header={
        Authorization:`Bearer ${token}`
      }
      let apiResponse= await getSoldBooks(header)
      if(apiResponse.status==200){
       setSoldBookData(apiResponse.data)
      }else{
        toast.error(apiResponse.response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Error occured while getting sold book details")
      
    }
  }
  return (
    <>
      <Header />

      <div className="bg-black h-52">
        <img
          className="w-50 relative ms-10 top-18 start-11 rounded-full"
          src={userData?.profilePic}
          alt=""
        />
      </div>

      <div className="md:mx-24 mx-7">
        <div className="mt-28 flex justify-between">
          <h1 className="text-4xl">
           {userData?.userName}
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "#B197FC" }}
            />
          </h1>
        
         <EditProfile/>
        </div>
 
        <p className="mt-5">
         {
          userData?.bio
         }
        </p>
      </div>

      <div className="flex justify-center my-14">
        <div className="shadow-2xl">
          <button
            onClick={() => {
              setSellBookFlag(true);
              setPurchaseFlag(false);
              setBookStatusFlag(false);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-300 hover:text-gray-900"
          >
            Sell Book
          </button>

          <button
            onClick={() => {
              setSellBookFlag(false);
              setPurchaseFlag(false);
              setBookStatusFlag(true);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-300 hover:text-gray-900"
          >
            Book Status
          </button>

          <button
            onClick={() => {
              setSellBookFlag(false);
              setPurchaseFlag(true);
              setBookStatusFlag(false);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-300 hover:text-gray-900"
          >
            Purchase History
          </button>
        </div>
      </div>

      {sellBookFlag && (
        <div className="p-6 bg-gray-200 shadow-lg rounded-lg mx-[10%] mb-20">
          <h1 className="text-3xl font-bold mb-6 text-center">Book Details</h1>
          {/* leftt */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, title: e.target.value })
                }
                type="text"
                placeholder="Title"
                className="w-full p-3 rounded bg-white shadow-sm"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, author: e.target.value })
                }
                type="text"
                placeholder="Author"
                className="w-full p-3 rounded bg-white shadow-sm"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, noOfPages: e.target.value })
                }
                type="number"
                placeholder="No of Pages"
                className="w-full p-3 rounded bg-white shadow-sm"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, imageUrl: e.target.value })
                }
                type="text"
                placeholder="Image URL"
                className="w-full p-3 rounded bg-white shadow-sm"
              />

              <input
                onChange={(e) =>
                  setBookData({ ...bookData, price: e.target.value })
                }
                type="number"
                placeholder="Price"
                className="w-full p-3 rounded bg-white shadow-sm"
              />

              <input
                onChange={(e) =>
                  setBookData({ ...bookData, discountPrice: e.target.value })
                }
                type="number"
                placeholder="Discount Price"
                className="w-full p-3 rounded bg-white shadow-sm"
              />

              <textarea
                onChange={(e) =>
                  setBookData({ ...bookData, abstract: e.target.value })
                }
                placeholder="Abstract"
                className="w-full p-3 rounded bg-white shadow-sm h-28"
              />
            </div>
            {/* rgt */}
            <div className="flex-1 space-y-4">
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, publisher: e.target.value })
                }
                type="text"
                placeholder="Publisher"
                className="w-full p-3 rounded bg-white shadow-sm"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, language: e.target.value })
                }
                type="text"
                placeholder="Language"
                className="w-full p-3 rounded bg-white shadow-sm"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, ISBN: e.target.value })
                }
                type="text"
                placeholder="ISBN"
                className="w-full p-3 rounded bg-white shadow-sm"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, category: e.target.value })
                }
                type="text"
                placeholder="Category"
                className="w-full p-3 rounded bg-white shadow-sm"
              />
              <label htmlFor="imgUpload">
                {" "}
                <img className="w-50" src={preview} alt="" />
                <input
                  type="file"
                  id="imgUpload"
                  className="hidden"
                  onChange={(e) => handleUploadImage(e)}
                />
              </label>
              <div className="flex gap-2 mt-3">
                {previewList.length > 0 &&
                  previewList.map((eachPreview) => (
                    <img className="w-25" src={eachPreview} alt="" />
                  ))}

                {previewList.length > 0 && previewList.length <= 2 && (
                  <label htmlFor="plus">
                    <img
                      className="w-10"
                      src="https://www.shutterstock.com/image-vector/plus-sign-icon-positive-symbol-260nw-1147358093.jpg"
                      alt=""
                    />
                    <input
                      type="file"
                      name=""
                      id="plus"
                      className="hidden"
                      onChange={(e) => handleUploadImage(e)}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="flex gap-4">
              <button className=" bg-green-400 text-black px-4 py-2 rounded hover:bg-green-600 hover:text-white">
                Reset
              </button>

              <button
                onClick={addBookClick}
                className=" bg-green-700  text-white px-4 py-2 rounded  hover:bg-green-800  hover:text-black"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {bookStatusFlag && <div>

        {
          soldBookData.length>0 &&

          <div>

            {
              soldBookData.map((eachBook)=>(
                <div>
                  <h1>{eachBook.bookName}</h1>
                  <h1>{eachBook.bookId}</h1>
                </div>
              ))
            }



          </div>
        }
        
        </div>}
      {purchaseFlag && <div>Purchase history</div>}
      <Footer />
    </>
  );
};

export default Profile;
