import { Button, Spin, Alert } from "antd";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useGetAboutusQuery } from "../redux/features/getAboutusApi";



const Settings_AboutUs = () => {
  const { data, isLoading, isError } = useGetAboutusQuery()
  console.log("about", data)
  const navigate = useNavigate();

  const handleBackSettings = () => {
    navigate("/settings/aboutus");
  };

  const handleEdit = () => {
    console.log("Edit not works")
    // if (id) {
      navigate(`/settings/aboutus/editAboutus`);
    // }
  };

  if (isLoading) {
    return <Spin tip="Loading..." className="flex justify-center mt-10" />;
  }

  if (isError) {
    return (
      <Alert
        message="Error"
        description="Failed to load content."
        type="error"
        showIcon
      />
    );
  }

 
  const content = data?.data?.about;
  const noData = !content || content.trim() === "";

  return (
    <div className="w-[79vw]">
      <div>
        <div
          onClick={handleBackSettings}
          className="border-none text-[#193664] flex items-center gap-2 cursor-pointer"
        >
          <IoIosArrowBack />
          About us
        </div>
      </div>
      <div className="pl-10 text-justify py-12">
        {noData ? (
          <p>No data found</p>
        ) : (
          <p>{content}</p>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => handleEdit()}
          style={{
            backgroundColor: "#193664",
            color: "#fff",
            height: "56px",
          }}
          htmlType="submit"
          className="w-[300px] h-[56px] py-4 mt-2 text-white hover:border-none border-none rounded-lg"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};



export default Settings_AboutUs