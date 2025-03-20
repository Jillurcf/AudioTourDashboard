import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge } from "antd";
import { useGetNotificationsQuery } from "../redux/features/getNotificationApi";
import { useMarkAsReadMutation } from "../redux/features/postMarkAsRedApi";

const Notifications = () => {
  const { data, isLoading, isError } = useGetNotificationsQuery();
  const [MarkAsRead] = useMarkAsReadMutation();
 
  console.log("9", data?.data);
  const navigate = useNavigate();
  const newNotifications = data?.data?.map((notice) => notice?.read_at) ||[];
  const nullCount = newNotifications.filter((item) => item === null).length;
console.log("15", nullCount);
  const handleBack = () => {
    navigate("/");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notifications.</p>;
const handleRead =async (id) => {
await MarkAsRead(id)
  console.log("click");
}
  return (
    <div className="px-8">
      <div onClick={handleBack} className="flex items-center cursor-pointer">
        <IoIosArrowBack />
        <h1> Back</h1>
      </div>
      <div className="flex justify-between py-6">
        <div className="flex">
          <h1 className="text-[24px] font-bold">Notifications</h1>
          <a href="#">
            <sup>
              <Badge count={nullCount} />
            </sup>
          </a>
        </div>
        <h1 className="text-[#5E7FD3]">See All</h1>
      </div>
      {/* Display Notifications */}
      {data?.data?.map((item, index) => {
       
        return (
          <div key={item.id} className="flex gap-4 items-center py-2">
          {item.data.creator_image && (
            <Avatar src={item.data.creator_image} size={40} />
          )}
          <div className="flex justify-between w-full border-bg-gray-100 border-b">
            <h1 className="border-bg-gray-100 border-b py-2">
              {/* <span className="text-xl font-bold">{item.data.creator_name || "User"}</span> */}
              {item.data.message}
            </h1>
         
            {item.read_at === null ?
            
             <div onClick={()=>handleRead(item?.id)} className="flex cursor-pointer ">
             <h1 className=" px-2 text-blue-500 hover:bg-gray-200">
               {new Date(item.created_at).toLocaleString()}
             </h1>
             <p className="border w-3 h-3 bg-red-500 rounded-full"></p>
           </div>
            :
            <div className="flex ">
            <h1 className=" px-2">
              {new Date(item.created_at).toLocaleString()}
            </h1>
            {/* <p className="border w-3 h-3 bg-red-500 rounded-full"></p> */}
          </div>
            }
           
          </div>
        </div>
        )
      })}
    </div>
  );
};

export default Notifications;
