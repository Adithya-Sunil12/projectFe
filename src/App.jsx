import { use, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AllBooks } from "./pages/AllBooks";
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import PNF from "./pages/PNF";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";
import ViewBook from "./pages/ViewBook";
import AdminBooks from "./admin/pages/AdminBooks";
import AdminCareers from "./admin/pages/AdminCareers";
import AdminSettings from "./admin/pages/AdminSettings";
import AdminHome from "./admin/pages/AdminHome";
import AdminApplications from "./admin/pages/AdminApplications";
import PaymentSucces from "./components/PaymentSucces";
import PaymentFailure from "./components/PaymentFailure";


function App() {

  const [showHome, setShowHome] = useState(false);
  //display home only after 5 seconds
  setTimeout(() => {
    setShowHome(true);
  }, 1000);

  return (
    <>
    

      <Routes>
        {/* conditional rendering */}
        <Route path="/" element={showHome ? <Home /> : <Loader />} />

        <Route path="/allbooks" element={<AllBooks />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister={true} />} />

        {/* params are used so : (params wil come)id  belongs to react router dom url has params*/}
        <Route path="/:id/viewbook" element={<ViewBook/>}/> 

        <Route path="/admin-books" element={<AdminBooks/>}/>
          <Route path="/admin-careers" element={<AdminCareers/>}/>
           <Route path="/admin-settings" element={<AdminSettings/>}/>
            <Route path="/admin-home" element={<AdminHome/>}/>
            <Route path="/admin-applications" element={<AdminApplications/>}/>
       <Route path="/payment-success" element={<PaymentSucces/>} />
       <Route path='payment-failure' element={<PaymentFailure/>}/>
        <Route path="/*" element={<PNF />} />
      </Routes>

    
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
