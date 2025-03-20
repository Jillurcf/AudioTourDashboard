import React, { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Title from "../share/Title";
import { useGetDashHomeApiQuery } from "../../redux/features/getDashHomeApi";

// Define the type for each data point
interface DataPoint {
  month: string;
  data: number;
}

const RevenueChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("monthly"); // Default to monthly
  const {
    data: RevenueData,
    isSuccess,
    isError,
    isLoading,
  } = useGetDashHomeApiQuery({});

  const data: DataPoint[] = isSuccess && RevenueData?.data
    ? RevenueData.data
    : [];

  // Format the Y-axis values (e.g., 0k, 2k)
  const formatYAxis = (tickItem: number) => {
    return `${tickItem / 1}k`;
  };

  // Handling different states (loading, error, etc.)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="bg-[#FFFFFF] rounded-2xl mt-2 p-2 text-gray-300 pr-14">
      <div className="flex justify-between">
        <Title className="mb-5">Statistics Analytics</Title>
      </div>
      <Title className="mb-5">Revenue</Title>
      <ResponsiveContainer width="100%" height={380}>
        <AreaChart data={data} syncId="anyId">
          <defs>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00D6FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00D6FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" axisLine={false} />
          <YAxis
            axisLine={false}
            tickFormatter={formatYAxis}
            interval={0}
            domain={[0, "auto"]}
            padding={{ top: 30, bottom: 30 }}
            tickCount={7}
          />
          <Tooltip formatter={(value: number) => `${value}`} />
          <Area
            type="monotone"
            dataKey="data"
            stroke="#00D6FF"
            fill="url(#colorAmt)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
