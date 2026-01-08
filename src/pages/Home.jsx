import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React,{useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getLimitedBooks } from "../../services/allApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const Home = () => {
const[homeBooks,setHomeBooks]=useState({})


useEffect(()=>{
  getHomeBooks()
},[])

const getHomeBooks=async()=>{

  
try {
  let apiResponse=await getLimitedBooks()
  if(apiResponse.status==200){
    setHomeBooks(apiResponse.data.getLimitedBooks)
  }else{
   toast.error(apiResponse.response.data.message)
  }
} catch (error) {
  console.log(error)
  toast.error("error getting home books")
  
}
}
  return ( 
    <>
    <Header/>
    <div className="overflow-x-hidden"> 
      <div
        className="bg-[url(https://images.unsplash.com/photo-1532012197267-da84d127e765?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHx8MA%3D%3D)] bg-cover bg-center bg-no-repeat
             flex flex-col justify-center items-center 
             w-screen h-[510px] text-white text-center"
      >
        <h1 className="text-center text-6xl font-bold">Wonderful Gifts</h1>
        <h6 className="font-semibold">Give your family and friends a book</h6>

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
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm text-white border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Books"
              required
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div>
        <h1 className="text-xl text-center">NEW ARRIVALS</h1>
        <h1 className="text-3xl text-center">Explore Our Latest Collection</h1>
      </div>

      <div>
        {/* cards to be displayed  if we want give grid use a div*/}
       {
        homeBooks?.length>0 && <div className="grid grid-cols-[1fr_1fr_1fr] gap-10">  
                 {
                  homeBooks?.map((eachBook)=>(
                       <div class="w-70 h-165 ms-20 mt-20 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              class="rounded-t-lg"
              src={eachBook.imageUrl}
              alt=""
            />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {eachBook.title}
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
             {
              eachBook.abstract
             }
            </p>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
             {eachBook.price}
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
                  ))
                 }
        </div> 
       }
      </div>
      <div>
       <br />
        <Link
        to={'/allbooks'}
          type="button"
          class="text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ms-150"
        >
          Explore More
        </Link>
      </div>

      <div className="mt-9  flex justify-content-centre">
      <div className="ms-35 w-125" >
        <h1 style={{textAlign:'center', fontSize:'19px'}}>FEATURED AUTHORS</h1>
        <h1 style={{textAlign:'center',fontSize:'25px',fontWeight:'400'}}>Captivates with every word</h1>
        <p style={{textAlign:'justify',marginTop:'20px',fontSize:'16px'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam labore maxime non ea similique officia culpa debitis minima numquam. Veniam, totam quasi. Voluptates adipisci illo rerum aspernatur, alias deserunt ratione. Nam labore maxime non ea similique officia culpa debitis minima numquam. Veniam, totam quasi. Voluptates adipisci illo rerum aspernatur, alias deserunt ratione
          .</p><br />
       <p style={{textAlign:'justify',fontSize:'16px'}}>Lorem ipsum  ndi, quos? Dolore dignissimos itaque hic adipisci nostrum soluta ipsam distinctio, ex delectus ratione aliquid blanditiis numquam, veniam magni porro velit error!
      dolor sit amet consectetur adipisicing elit. Eligendi, quos? Dolore dignissimos itaque hic adipisci nostrum soluta ipsam distinctio, ex delectus ratione aliquid blanditiis numquam, veniam magni porro velit error!
     </p> </div>
      <div className="w-100 ms-10 mt-8">
        <img src="https://thumbs.dreamstime.com/b/portrait-male-african-american-professional-possibly-business-executive-corporate-ceo-finance-attorney-lawyer-sales-stylish-155546880.jpg" alt="" />
      </div>
      </div>
      {/* testimonials */}
      <div className="mt-10 ">
        <h1 style={{textAlign:'center'}}>TESTIMONIALS</h1>
        <h1  style={{textAlign:'center',fontWeight:'500',fontSize:'25px'}}>See What Others Are Saying</h1>
        <div className="ms-140 mt-5">
        <img src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" style={{height:'140px',width:'140px',borderRadius:'50%'}} />
     </div>
        <h1 style={{textAlign:'center'}}>Treesa Joseph</h1>
        <div className="ms-40 me-40 mt-3 " >
        <p >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore perspiciatis porro eveniet. Optio necessitatibus provident autem, quam qui, dicta molestiae quis quia deleniti aliquam magnam temporibus mollitia ex repellendus! Dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, deserunt optio eum dolorum iure consectetur quia facilis porro modi placeat ea quis explicabo maxime voluptatum unde animi nemo aperiam quos!</p>
     </div> </div>
    </div>
    <Footer/>
    </>
  );
};

export default Home;
