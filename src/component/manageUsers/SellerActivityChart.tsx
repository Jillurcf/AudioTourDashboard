import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {};

interface SellerActivitieschartProps {
  activities: {
    purchaseOrders?: {
      total: number;
    };
    salesOrders?: {
      total: number;
    };
    year?: number;
  };
}

const SellerActivityChart: React.FC<SellerActivitieschartProps> = ({ activities }) => {
  // Set default values in case activities or nested properties are undefined
  const salesTotal = activities?.salesOrders?.total || 0;
  const purchaseTotal = activities?.purchaseOrders?.total || 0;

  const [opacity, setOpacity] = React.useState({
    Sales: 1,
    Purchases: 1,
  });

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Dynamically generating data for Sales and Purchases for each month
  const data = months.map((month, index) => ({
    name: month,
    Sales: salesTotal + index * 500,  // Adjust dynamic value as needed
    Purchases: purchaseTotal + index * 300,  // Adjust dynamic value as needed
    amt: salesTotal + purchaseTotal,  // Total amount (can be customized)
  }));

  // Event handlers for mouse hover
  const handleMouseEnter = (o: { dataKey: string }) => {
    const { dataKey } = o;
    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o: { dataKey: string }) => {
    const { dataKey } = o;
    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
  };

  return (
    <div style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          {/* Purchases Line */}
          <Line
            type="monotone"
            dataKey="Purchases"
            strokeOpacity={opacity.Purchases}
            stroke="#8884d8"  // Color for Purchases
            activeDot={{ r: 8 }}
          />
          {/* Sales Line */}
          <Line
            type="monotone"
            dataKey="Sales"
            strokeOpacity={opacity.Sales}
            stroke="#82ca9d"  // Color for Sales
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellerActivityChart;
