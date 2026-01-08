import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Footer } from "flowbite-react";
import { getSingleBook, makePayment } from "../../services/allApi";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { BaseUrl } from "../../services/baseUrl";
import { AuthContext } from "../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
const ViewBook = () => {
  const { token } = useContext(AuthContext);
  //will get as an object-Returns an object of key/value-pairs of the dynamic params from the current URL that were matched by the routes.
  let { id } = useParams();

  const [singleBookData, setSingleBookData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [imageArray, setImageArray] = useState([]);

  useEffect(() => {
    getSingleBookData();
  }, []);

  console.log(singleBookData.uploadedImages);

  const getSingleBookData = async () => {
    try {
      // let token = localStorage.getItem("token");
      //to send that token we use reqHeader
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getSingleBook(id, reqHeader);
      console.log(apiResponse.data);
      if (apiResponse.status == 200) {
        setSingleBookData(apiResponse.data);
        setImageArray(apiResponse.data.uploadedImages);
      } else {
        toast.error(apiResponse.response.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("error occured while calling the api");
    }
  };

  const onBuyClick = async () => {
    const stripe = await loadStripe(
      "pk_test_51SmfEj67ZdYjbcnm65oPAQ8PJ2bMxiNAunPJcRL9cbDB0rCKZeqOcLjseVfEVL7gPfZLgquAfuoSgChuKzqmbSJN00OQY6No2m"
    );

let header={
  Authorization:`Bearer ${token}`
}
let reqBody={
       bookId:singleBookData._id,
       bookName:singleBookData.title,
      bookDesc:singleBookData.abstract,
      sellerMail:singleBookData.userMail,
      bookImage:singleBookData.imageUrl,
      price:singleBookData.price,
      discountPrice:singleBookData.discountPrice
} 

let apiResponse=await makePayment(reqBody,header)
if(apiResponse.status==200){
  //success operation
let session=apiResponse.data.session
window.location.href=session.url
}else{
  toast.error(apiResponse.response.data.message)
}
  };
  return (
    <div>
      <Header />
      <div class="w-full min-h-screen bg-gray-50 px-6 py-10 flex justify-center">
        <div class="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div class="flex justify-center">
              <img
                src={singleBookData?.imageUrl}
                alt="Book Cover"
                class="w-65 rounded-lg shadow-md"
              />
            </div>

            <div class="flex flex-col justify-center space-y-4">
              {/* optional chaning operator if left has something right will be displayed */}
              <h1 class="text-4xl font-semibold text-gray-900">
                {singleBookData?.title}
              </h1>
              <div className="flex justify-end">
                <button onClick={() => setOpenModal(true)}>
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
              <p class="text-blue-600 text-lg">{singleBookData?.author}</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                <p>
                  <span class="font-semibold">Publisher :</span>{" "}
                  {singleBookData?.publisher}
                </p>
                <p>
                  <span class="font-semibold">Language :</span>{" "}
                  {singleBookData?.language}
                </p>

                <p>
                  <span class="font-semibold">Seller Mail :</span>{" "}
                  {singleBookData?.userMail}
                </p>
                <p>
                  <span class="font-semibold">Real Price :</span>{" "}
                  Rs {singleBookData?.price}
                </p>
                 <p>
                  <span class="font-semibold">Discount Price:</span>{" "}
                  Rs {singleBookData?.discountPrice}
                </p>
                <p>
                  <span class="font-semibold">No. of pages :</span>{" "}
                  {singleBookData?.noOfPages}
                </p>
                <p>
                  <span class="font-semibold">ISBN :</span>{" "}
                  {singleBookData?.ISBN}
                </p>
              </div>

              <p class="text-gray-700">{singleBookData?.abstract}</p>

              <div class="flex gap-4 mt-5">
                <Link to={"/allbooks"}>
                  <button class="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition">
                    <span>&#9664;&#9664;</span> Back
                  </button>
                </Link>
                <button onClick={onBuyClick} class="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition">
                  Buy Rs {singleBookData.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="mt-50"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader>Images</ModalHeader>
        <ModalBody>
          {imageArray.map((eachImage) => (
            <img src={`${BaseUrl}/uploads/${eachImage}`} className="w-25" />
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Footer />
    </div>
  );
};

export default ViewBook;
