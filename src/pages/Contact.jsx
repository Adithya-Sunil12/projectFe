import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faLocation,
  faLocationPin,
  faMailForward,
  faMailReply,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faMap, faMessage } from "@fortawesome/free-regular-svg-icons";

const Contact = () => {
  return (
    <>
      <Header />
      <div>
        <div className="flex justify-center items-center flex-col px-10 ">
          <h1 className="text-3xl my-5 font-medium">Contacts</h1>
          <p className="md:text-center text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            maxime, dolorem, maiores voluptatum blanditiis culpa deleniti vero
            temporibus amet eius consectetur? Voluptatibus alias commodi ea vel
            hic sunt repellendus ad! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quasi maxime, dolorem, maiores voluptatum
            blanditiis culpa deleniti vero temporibus amet eius consectetur?
            Voluptatibus alias commodi ea vel hic sunt repellendus ad!
          </p>
        </div>
        <div className="grid-cols-3 my-10 mx-20 md:grid md:px-40">
          <div className="flex items-center md:justify-center gap-3">
            <div
              className="flex justify-center items-center bg-gray-200 text-gray-900"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            >
              <FontAwesomeIcon icon={faLocationPin} />
            </div>
            <p>
              123 Main Street, Apt 4B <br /> Anytown, CA 91234
            </p>
          </div>
          <div className="flex items-center md:justify-center gap-3">
            <div
              className="flex justify-center items-center bg-gray-200 text-gray-900"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            >
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <p> +91 9874561230</p>
          </div>
          <div className="flex items-center md:justify-center gap-3">
            <div
              className="flex justify-center items-center bg-gray-200 text-gray-900"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            >
              <FontAwesomeIcon icon={faMailForward} />
            </div>
            <p>Bookstore@gmail.com</p>
          </div>
        </div>

        <div className="flex gap-10 mx-60 mb-6">
          <div className="bg-gray-200 h-103 w-100">
            <h1 className="my-5 text-center">Send Me Message</h1>
            <div className="mx-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-white placeholder-gray-600 p-2 rounded"
              />
              <input
                type="text"
                placeholder="Email ID"
                className="w-full bg-white placeholder-gray-600 p-2 rounded my-5"
              />
              <textarea
                type="text"
                rows="6"
                placeholder="Message"
                className="w-full bg-white placeholder-gray-600 p-2 rounded"
              />

              <div className="w-full bg-black text-white text-center p-3 hover:bg-white hover:text-black">
                <button>
                  Send <FontAwesomeIcon icon={faMailForward} />
                </button>
              </div>
            </div>
          </div>
          <div>
           <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62865.55832720318!2d76.30948101195872!3d10.008813464713272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c8e94a07a07%3A0x49921cdfae82660!2sKakkanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1745418349896!5m2!1sen!2sin"
  width="100%"
  height="415"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  style={{ border: "0px" }}
></iframe>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
