import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'
const Footer = () => {
  return (
    <div >
      <div className="flex justify-evenly text-m  bg-blue-950 text-white">
        <div className="w-100 mt-10 ">
          <h1>ABOUT US</h1>
          <h2 style={{textAlign:'justify'}}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
            dolorem veniam deserunt quisquam eius ad hic maxime dicta ipsum nemo
            itaque necessitatibus quas nobis, illum voluptate, pariatur
            recusandae alias harum!
          </h2>
        </div>
        <div className="w-100 mt-10 ">
          <h1>NEWSLETTER</h1>
          <h1 className="mt-4">Stay updated with our latest trends</h1>

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
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 square-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
                placeholder="Email ID"
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 "
              >
                 <FontAwesomeIcon icon={faArrowRight}/>
              </button>
            </div>
          </form>
        </div>

        <div className=" mt-10 ">
            <h1>FOLLOW US</h1>
            <h1>Let us be social</h1>
            <div className="flex justify-evenly">
                <FontAwesomeIcon icon={faInstagram}/>
                  <FontAwesomeIcon icon={faXTwitter}/>
                  <FontAwesomeIcon icon={faFacebook}/>
                   <FontAwesomeIcon icon={faLinkedin}/>
            </div>
        </div>
      </div>
      <div >
     <p className="bg-black text-white text-sm text-center"> Copyright © 2023 All rights reserved | This website is made with💛 by  Amina Beevi</p>
      </div>
    </div>
  );
};

export default Footer;