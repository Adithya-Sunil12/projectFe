import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { applyJob, getAllJobs } from "../../services/allApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { toast } from "react-toastify";
const Careers = () => {
  const [jobData, setJobData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [applyData, setApplyData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    qualification: "",
    jobRole: "",
    jobId: "",
    resume: "",
  });

  const loadJobs = async () => {
    let apiResponse = await getAllJobs();
    if (apiResponse.status == 200) {
      setJobData(apiResponse.data);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  console.log(applyData)
  const onApplyBtnClick=(job)=>{
       setApplyData({...applyData,jobId:job._id,jobRole:job.jobTitle})
      //  setApplyData({...applyData,jobRole:job.jobTitle})     we does not use this method because useState need some time to update its state value,so in this situtaiion when we update same state multiple times the last updation only takes place
       setOpenModal(true)
  }
  const applyJobClick=async()=>{
       try {
        
        let header={
          "Content-Type":"multipart/form-data"
        }
        let reqBody=new FormData()   //used becoz file resume
        for(let key in applyData){
          reqBody.append(key,applyData[key])


        }
        let apiResponse=await applyJob(reqBody,header)
        console.log(apiResponse)
        if(apiResponse.status==201){
          toast.success("Successfully applied")
          setOpenModal(false)

        }else{
          toast.error(apiResponse.response.data.message)
        }
       } catch (error) {
        console.log(error)
        toast.error("Something went wrong while applying job")
       }
  }
  return (
    <>
      <div>
        <Header />

        <div className="flex-col text-center  mx-40 my-5 justify-center items-center ">
          <h1 className="text-3xl font-medium">Careers</h1>
          <p className="my-5 ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
            impedit molestiae, sint, harum unde in quis, quas perspiciatis
            facilis modi reiciendis corporis architecto eum! Modi officiis
            maiores expedita reiciendis blanditiis!Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Sequi impedit molestiae, sint, harum
            unde in quis, quas perspiciatis facilis modi reiciendis corporis
            architecto eum! Modi officiis maiores expedita reiciendis
            blanditiis!
          </p>
        </div>
        <h1 className="text-2xl ms-20">Current Openings</h1>
        <div className="flex justify-center items-center">
          <input type="text" placeholder="Job Title" className="py-2 w-80" />
          <button className="border border-green-500 text-white px-4 py-2 rounded hover:bg-white hover:text-green-800 transition bg-green-800">
            Search
          </button>
        </div>
      </div>

      <div>
        {jobData?.length > 0 ? (
          <div>
            {jobData.map((eachJob) => (
              <div>
                <div className="my-15 h-90 w-220 border-gray-500 bg-blue-200 border mx-50 ">
                  <div className="mx-5 my-5 ">
                    <div className="flex justify-between items-center">
                      <h1 className="text-xl font-extrabold text-blue-950">
                        {eachJob.jobTitle}
                      </h1>
                      <button
                        className="border border-blue-700 text-white px-4 py-2 rounded hover:bg-white hover:text-blue-700 bg-blue-700"
                      onClick={()=>onApplyBtnClick(eachJob)}
                      >
                        Apply <FontAwesomeIcon icon={faArrowAltCircleUp} />
                      </button>
                    </div>
                    <hr className="my-1" />
                  </div>
                  <div className="mx-5">
                    <h1>
                      <FontAwesomeIcon
                        icon={faLocationPin}
                        className="text-blue-600 font-bold"
                      />{" "}
                      {eachJob.jobLocation}
                    </h1>
                    <h1 className="my-3 font-bold">
                      {" "}
                      Published date: {eachJob.publishedDate}
                    </h1>
                    <h1 className="my-3 font-bold">
                      {" "}
                      Last date: {eachJob.lastDate}
                    </h1>
                    <h1 className="font-bold">Salary :{eachJob.salary}</h1>
                    <h1 className="my-3 font-bold">
                      {" "}
                      Qualification :{eachJob.qualification}
                    </h1>
                    <h1 className="font-bold">
                      Experience :{eachJob.experience}
                    </h1>
                    <h1 className="my-3 font-bold">
                      {" "}
                      Description :{eachJob.jobDescription}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1>No Jobs Added</h1>
        )}
      </div>
    
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="mx-85 mt-30"
      >
        <ModalHeader>Apply Job</ModalHeader>
        <ModalBody>
          <div className="flex justify-around ">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                className="bg-white text-black p-1 rounded-xl"
                onChange={(e) =>
                  setApplyData({ ...applyData, name: e.target.value })
                }
              />
              <input
                type="text"
                className="bg-white text-black p-1 rounded-xl"
                placeholder="Email"
                 onChange={(e) =>
                  setApplyData({ ...applyData, email: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                className="bg-white text-black p-1 rounded-xl"
                placeholder="Phone Number"
                 onChange={(e) =>
                  setApplyData({ ...applyData, phoneNo: e.target.value })
                }
              />
              <input
                type="text"
                className="bg-white text-black p-1 rounded-xl"
                placeholder="Qualification"
                 onChange={(e) =>
                  setApplyData({ ...applyData, qualification: e.target.value })
                }
              />

              <label htmlFor="resume" className="text-white">
                Resume
              </label>
              <input
                 onChange={(e) =>
                  setApplyData({ ...applyData, resume: e.target.files[0] })
                }
                type="file"
                name="resume"
                id="resume"
                className="text-white"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={applyJobClick}>Apply</Button>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </ModalFooter>
      </Modal>
        <Footer />
    </>
  );
};

export default Careers;
