import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllBooks } from "../../services/allApi";
import { Button } from "flowbite-react";
import { AuthContext } from "../context/AuthContext";

export const AllBooks = () => {

  const navigate=useNavigate()
  const{token}=useContext(AuthContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [bookData, setBookData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dummyBooks, setDummyBooks] = useState([]);

  const [search, setSearch] = useState("");
  //page load check --side effct so useEffct
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getBookData();
    }
  }, [search]); //we will get data 2times because of react strict mode
  const getBookData = async () => {
    try {
     // let token = localStorage.getItem("token");
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getAllBooks(reqHeader, search);
      if (apiResponse.status == 200) {
        setBookData(apiResponse.data.AllBooks);
        setDummyBooks(apiResponse.data.AllBooks); //to filter we have edummy books
        let catArray = apiResponse.data.AllBooks.map(
          (eachBook) => eachBook.category
        );
        // console.log(catArray);

        setCategories(catArray);

        let dummyCat = [];

        //to avoid adding same category again and again
        catArray.forEach((eachCategory) => {
          if (!dummyCat.includes(eachCategory)) {
            // setCategories([...categories,eachCategory])  //avoided this because usestate doesnt update on time,so created an array and pushed elements to thatbarray and later updated that array to state
            dummyCat.push(eachCategory);
          }
        });
        setCategories(dummyCat);
      } else {
        toast.error(apiResponse.response.data.message);
      navigate('/login')
      }
    } catch (error) {
      toast.error("error occured while calling the api");
      console.log(error);
    }
  };

  const filterBooks = (category) => {
    let filteredBooks = dummyBooks.filter(
      (eachBook) => eachBook.category == category
    );
    setBookData(filteredBooks);
  };
  return (
    <>
      <Header />
      {isLoggedIn ? (
        <>
          {" "}
          <div>
            <h1 className="text-center text-2xl mt-5">Collections</h1>
            <div className="text-center mt-5">
              <form class="max-w-md mx-auto">
                <label
                  for="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    id="default-search"
                    class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 sqaure-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search By Title"
                    required
                  />
                  <button
                    type="submit"
                    class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            <div className="flex ms-20 mt-20">
              {/* //filters */}
              <div>
                <h1 className="text-2xl">Filters</h1>

                <fieldset>
                  <button
                    className="border px-2 ms-2 bg-blue-600"
                    onClick={getBookData}
                  >
                    All
                  </button>
                  {/* <legend class="sr-only">Countries</legend> */}
                  {categories?.length > 0 && (
                    <div>
                      {categories?.map((eachCategory, index) => (
                        <div
                          class="flex items-center mb-4"
                          onClick={() => filterBooks(eachCategory)}
                        >
                          <input
                            id={index}
                            type="radio"
                            name="countries"
                            class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for={index}
                            class="block ms-2  text-sm font-medium text-gray-900 dark:text-black"
                          >
                            {eachCategory}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </fieldset>
              </div>
              {/* cards */}
              {
                //left rue only write will execute
                bookData?.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {bookData?.map((eachBook, index) => (
                      <div
                        key={index}
                        className="ms-15 w-60 h-150 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-white dark:border-gray-700 "
                      >
                        <a href="#">
                          <img
                            class="rounded-t-lg"
                            src={eachBook.imageUrl}
                            className="w-full h-83"
                            alt="imageUrl"
                          />
                        </a>
                        <div class="p-5">
                          <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-blue-900">
                              {eachBook.title}
                            </h5>
                          </a>
                          <p class="mb-3 font-normal text-black">
                            {eachBook.abstract}
                          </p>
                          <Link to={`/${eachBook._id}/viewbook`}>
                            <Button color="blue" className="w-full ">
                              {" "}
                              View Book{" "}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <img
            src="https://cdn-icons-gif.flaticon.com/11255/11255957.gif"
            alt=""
            className="w-80 "
          />
          <h1 className="text-xl">
            {" "}
            Please{" "}
            <Link className="text-blue-500 underline " to={"/login"}>
              {" "}
              Login In
            </Link>{" "}
            to explore more
          </h1>
        </div>
      )}
      <Footer />
    </>
  );
};
