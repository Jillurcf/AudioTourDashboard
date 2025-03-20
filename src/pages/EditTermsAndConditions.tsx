import { Button } from "antd";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import React from "react";
import { usePostTermsAndConditionMutation } from "../redux/features/postTermsAndCondition";
import { useGetTermsAndConditionQuery } from "../redux/features/getTermsAndConditionApi";

const EditTermsAndCondition: React.FC = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState<string>("");
  
  // Initialize the mutation
  const [postTermsAndCondition, { isLoading }] = usePostTermsAndConditionMutation();
  const {data} = useGetTermsAndConditionQuery();

  useEffect(() => {
    const existingData = data?.data?.content
    // Load initial data (replace with actual data fetching)
    setContent(existingData); // Use the mock data content
  }, []);

  const handleUpdate = async () => {
    console.log("click")
    try {
      const div = document.createElement("div");
      div.innerHTML = content;
      const cleanedContent = div.textContent || div.innerHTML || "";
      // Make the API call
      const response = await postTermsAndCondition({ content: cleanedContent, status: "1",}).unwrap();

      if (response) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
       
        navigate("/settings/termsAndCondition");
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
    navigate("/settings/termsAndCondition");
  };

  return (
    <div className="relative ml-[24px] bg-white p-6 rounded-lg shadow-lg">
      <div
        onClick={handleBackTermsAndCondition}
        className="mt-[44px] cursor-pointer flex items-center pb-3 gap-2"
      >
        <MdOutlineKeyboardArrowLeft size={34} />
        <h1 className="text-[24px] font-semibold">Edit Terms & Condition</h1>
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

export default EditTermsAndCondition;
