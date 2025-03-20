import { Button } from "antd";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import React from "react";
import { usePostAboutusMutation } from "../redux/features/postAboutus";
import { useGetAboutusQuery } from "../redux/features/getAboutusApi";



const EditAboutus: React.FC = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState<string>("");
  
  // Initialize the mutation
  const [postAboutus, { isLoading }] = usePostAboutusMutation();
  const {data} = useGetAboutusQuery();

  useEffect(() => {
    const existingData = data?.data?.about
    // Load initial data (replace with actual data fetching)
    setContent(existingData); // Use the mock data content
  }, []);

  const handleUpdate = async () => {
    try {
      const div = document.createElement("div");
      div.innerHTML = content;
      const cleanedContent = div.textContent || div.innerHTML || "";
      // Make the API call
      const response = await postAboutus({ about: cleanedContent }).unwrap();

      if (response) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
       
        navigate("/settings/aboutus");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Try Again...",
        text: error?.data?.message || "An error occurred",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  const handleBackTermsAndCondition = () => {
    navigate("/settings/aboutus");
  };

  return (
    <div className="relative ml-[24px] bg-white p-6 rounded-lg shadow-lg">
      <div
        onClick={handleBackTermsAndCondition}
        className="mt-[44px] cursor-pointer flex items-center pb-3 gap-2"
      >
        <MdOutlineKeyboardArrowLeft size={34} />
        <h1 className="text-[24px] font-semibold">Edit About Us</h1>
      </div>
      <div className="text-justify mt-[24px] relative">
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
        <Button
          onClick={handleUpdate}
          loading={isLoading} // Show loading state on the button
          style={{
            backgroundColor: "#193664",
            color: "#fff",
            height: "56px",
          }}
          block
          className="mt-[30px] hover:text-white bg-secondary hover:bg-gradient-to-r from-red-500 via-red-600 to-red-800
          text-white py-3 rounded-lg w-full text-[18px] font-medium duration-200"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditAboutus;
