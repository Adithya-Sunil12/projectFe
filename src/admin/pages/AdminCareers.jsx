import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { toast } from "react-toastify";
import { addJob, deleteJob, getAllJobs } from "../../../services/allApi";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

const AdminCareers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [addJobData, setAddJobData] = useState({
    jobTitle: "",
    jobLocation: "",
    jobDescription: "",
    salary: "",
    qualification: "",
    experience: "",
    lastDate: "",
    publishedDate: "",
  });
  useEffect(() => {
    getJobData();
  
  }, []);

  const getJobData = async () => {
    try {
      let apiResponse = await getAllJobs();
      if (apiResponse.status == 200) {
        setJobData(apiResponse.data);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load Job Details");
    }
  };
  const onDeleteClick = async (id) => {
    try {
      let token = localStorage.getItem("token");

      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await deleteJob(id, header);

      if (apiResponse.status == 200) {
        toast.success("Successfully deleted");
        getJobData();
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occured while deleting");
    }
  };
  const addClick = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await addJob(addJobData, header);
      if(apiResponse.status==201){
            toast(apiResponse.data.message)
      }else{
        toast(apiResponse.response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast("Error occured while adding job");
    }
  };
  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[2fr_5fr]">
        <AdminSideBar />

        <div>
          <button
            className="bg-blue-500 text-white p-2 rounded-xl ms-200 mt-5"
            onClick={() => setOpenModal(true)}
          >
            Add Job
          </button>
          {jobData.length > 0 && (
            <div>
              {jobData.map((eachJob) => (
                <div className="border bg-blue-200 mt-5 px-10 py-10 h-50">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-blue-950">
                        {eachJob.jobTitle}
                      </h1>
                      <div className="flex justify-between">
                        <h1 className="text-xl font-bold">
                          Salary:{eachJob.salary}
                        </h1>{" "}
                        <br />
                        <h1 className="text-xl font-bold">
                          {eachJob.jobLocation}
                        </h1>
                      </div>
                      <div>
                        <h1 className="text-md font-bold">
                          Published Date:{eachJob.publishedDate}
                        </h1>
                        <h1 className="text-md font-bold">
                          Last Date:{eachJob.lastDate}
                        </h1>
                      </div>
                    </div>
                    <div>
                      <button
                        className="border-2 rounded-2xl bg-red-600 p-2"
                        onClick={() => onDeleteClick(eachJob._id)}
                      >
                        Delete
                      </button>
                      <div>
                        <h1 className="text-xl font-bold">
                          {eachJob.qualification}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <p className="font-bold">{eachJob.jobDescription}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Modal
        className="mt-25 mx-60"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader>Add New Job</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <input
              onChange={(e) =>
                setAddJobData({ ...addJobData, jobTitle: e.target.value })
              }
              value={addJobData.jobTitle}
              type="text"
              placeholder="Job Title"
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
            />
            <input
              type="text"
              placeholder="Salary"
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              onChange={(e) =>
                setAddJobData({ ...addJobData, salary: e.target.value })
              }
              value={addJobData.salary}
            />
            <input
              type="text"
              placeholder="Location"
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              onChange={(e) =>
                setAddJobData({ ...addJobData, jobLocation: e.target.value })
              }
              value={addJobData.jobLocation}
            />
            <input
              type="text"
              placeholder="Published Date"
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              onChange={(e) =>
                setAddJobData({ ...addJobData, publishedDate: e.target.value })
              }
              value={addJobData.publishedDate}
            />
            <input
              type="text"
              placeholder="Last Date"
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              onChange={(e) =>
                setAddJobData({ ...addJobData, lastDate: e.target.value })
              }
              value={addJobData.lastDate}
            />
            <input
              type="text"
              placeholder="Qualification"
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              onChange={(e) =>
                setAddJobData({ ...addJobData, qualification: e.target.value })
              }
              value={addJobData.qualification}
            />
            <input
              type="text"
              placeholder="Experience"
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              onChange={(e) =>
                setAddJobData({ ...addJobData, experience: e.target.value })
              }
              value={addJobData.experience}
            />
            <textarea
              color={43}
              placeholder="Description"
              className="bg-white text-black p-2 mx-2 border rounded-2xl"
              onChange={(e) =>
                setAddJobData({ ...addJobData, jobDescription: e.target.value })
              }
              value={addJobData.jobDescription}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
          <Button color="alternative" onClick={addClick}>
            Add Job
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminCareers;
