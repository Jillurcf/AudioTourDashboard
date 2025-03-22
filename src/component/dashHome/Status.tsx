import React, { useState, useEffect } from "react";
import SelectBox from "../share/SelectBox";
import { HiMiniUsers } from "react-icons/hi2";
import { SiPaypal } from "react-icons/si";
import { FcComboChart } from "react-icons/fc";
import "./Style_dashboard.css";
import { useGetDashHomeStatusApiQuery } from "../../redux/features/getDashHomeStatusApi";
import { useGetDashHomeApiQuery } from "../../redux/features/getDashHomeApi";

const Status: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("weekly");

  // Fetch data based on the selected period
 const {data, isLoading, isError} = useGetDashHomeApiQuery({})
  console.log("data", data?.usersCount);
  // Handle period change from SelectBox
  const handleSelectChange = (value: string) => {
    setSelectedPeriod(value); // Update the selected period
    console.log("Selected Period:", value);
  };

  // Prepare the card data using the API response
  const cardData = [
    {
      id: 1,
      icon: <HiMiniUsers size={20} />,
      value: `${data?.usersCount}` || 0,
      title: "Active Users",
    },
    {
      id: 2,
      icon: <SiPaypal size={20} />,
      value: `$${data?.totalEarning}` || 0,
      title: "Total earnings",
    },
    {
      id: 3,
      icon: <FcComboChart size={20} />,
      value: data?.totalListenAudio || "0.00",
      title: "Listening Audio",
    },
  ];

  const selectOptions = [
    { value: "weekly", label: "Week" },
    { value: "monthly", label: "Month" },
    { value: "yearly", label: "Year" },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-[#FFFFFF] p-6 rounded-xl">
      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-xl font-bold text-[#5D5D5D]">Overview</h1>
          <p className="text-[#5D5D5D]">Activities summary at a glance</p>
        </div>
        {/* <div className="pr-8">
          <SelectBox
            options={selectOptions}
            placeholder="Select Period"
            onChange={handleSelectChange}
            style={{ width: 100 }}
          />
        </div> */}
      </div>
      <div className="grid grid-cols-3 w-[calc(100% -300px)] mt-[12px]">
        {cardData.map((card, index) => (
          <div
            key={card.id}
            className={`2xl:w-[450px] xl:w-[320px] lg:w-[190px] w-[450px] h-[170px] px-[20px] py-[32px] flex justify-center items-center rounded-2xl cursor-pointer ${
              selectedCard === index
                ? "bg-[#02B5AA] text-[#E8EBF0]"
                : "border border-[#E7E7E7]"
            }`}
            onClick={() => setSelectedCard(index)}
          >
            <div>
              <div
                className={`bg-[#F6F6F6] w-[47px] h-[47px] rounded-2xl flex items-center justify-center ${
                  selectedCard === index
                    ? "bg-white text-[#02B5AA]"
                    : "bg-[#E8EBF0]"
                }`}
              >
                {card.icon}
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-secondary py-4 text-[34px] font-bold">
                  {card.value}
                </h1>
              </div>
              <h1 className="text-[16px] font-bold">{card.title}</h1>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;
