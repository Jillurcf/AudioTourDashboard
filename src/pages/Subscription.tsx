import React, { useEffect, useState } from "react";
import Slider from "react-slider";

import { useAddSubscriptionMutation } from "../redux/features/postCreateSubscripton";
import { useGetAllSubscriptionQuery } from "../redux/features/getAllSubscription";

type Plan = {
  name: string;
  price: number;
  audio_limit: number;
};

const Subscription: React.FC = () => {
  const { data, isLoading, isError } = useGetAllSubscriptionQuery({});
  const [price, setPrice] = useState(0);
  console.log(price);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [addSubscription] = useAddSubscriptionMutation();
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null); // Track the selected plan for editing
  console.log("editing", editingPlan);


  const handleSavePlan = async (plan: Plan) => {
    // if (plan?.price > 0 && plan?.audio_limit > 0) {
    //   setEditingPlan(null); // Reset editing mode

    const formData = new FormData();
    formData.append("plan_name", plan?.plan_name);
    formData.append("price", plan?.price.toString());
    formData.append("audio_limit", plan?.audio_limit.toString());

    try {
      const res = await addSubscription(formData).unwrap();
      console.log("res", res);
    } catch (error) {
      console.error("Error updating plan:", error);
      alert("Error updating plan. Please check the console for more details.");
    }
  };

  const handleDeletePlan = (planToDelete: Plan) => {
    setPlans((prevPlans) =>
      prevPlans.filter((plan) => plan.name !== planToDelete.name)
    );
  };

  useEffect(() => {
    setEditingPlan(data?.plans);
  }, [data]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold py-4">Subscription Plan</h1>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {editingPlan?.map((plan, index) => {
          //  setEditingPlan(plan)

          return (
            <div
              key={plan?.id}
              className={`p-6 bg-white rounded-lg shadow-lg text-center transition-all duration-300 hover:translate-y-[-5px] ${
                plan?.plan_name.toLowerCase().includes("yearly")
                  ? "border-l-4 border-teal-500"
                  : plan?.plan_name.toLowerCase().includes("monthly")
                  ? "border-l-4 border-blue-500"
                  : plan?.plan_name.toLowerCase().includes("weekly")
                  ? "border-l-4 border-blue-700"
                  : "border-l-4 border-red-500"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4">{plan?.plan_name}</h2>
              
              <div>
                <label className="block text-sm mb-1">Price</label>
                <input
                  type="number"
                  value={plan?.price}
                  onChange={(e) => {
                    setEditingPlan((prevPlans) => {
                      // Make a copy of the current editingPlan
                      const updatedPlans = [...prevPlans];

                      // Update the price of the plan at the specific index
                      updatedPlans[index] = {
                        ...updatedPlans[index],
                        price: e.target.value,
                      };

                      return updatedPlans;
                    });
                  }}
                  className="w-3/4 p-2 text-center text-lg font-semibold border border-gray-300 rounded-md mb-4"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Audio Limit</label>
                <input
                  type="number"
                  // value={editingPlan?.name === plan.name ? editingPlan?.audioLimit : plan.audioLimit}
                  value={plan?.audio_limit}
                  onChange={(e) =>
                    setEditingPlan((prevPlans) => {
                      const updatedPlans = [...prevPlans];
                      updatedPlans[index] = {
                        ...updatedPlans[index],
                        audio_limit: e.target.value, // Correct property name and value update
                      };
                      return updatedPlans; // Return the updated array to set the new state
                    })
                  }
                  className="w-3/4 p-2 text-center text-lg font-semibold border border-gray-300 rounded-md mb-4"
                />
              </div>
              <div className="mb-4">
                <Slider
                  min={0}
                  max={100}
                  value={
                    plan?.plan_name === plan.plan_name
                      ? plan?.audio_limit
                      : plan.audio_limit === Infinity
                      ? 100
                      : plan.audio_limit
                  }
                  onChange={() => {}}
                  disabled
                  className="w-full"
                />
                   <p className="text-yellow-400">(*Audio limit -1 for unlimited audio) </p>
              </div>
           
              <p className="text-sm text-green-500">
                {plan.name
                  ? "Unlimited audios"
                  : `${plan?.plan_name} upto ${plan.audio_limit} audios`}
              </p>
             
              <div className="mt-4 flex justify-center gap-4">
                {plan?.plan_name === plan.plan_name ? (
                  <button
                    className="bg-teal-500 text-white p-2 rounded-md"
                    onClick={() => handleSavePlan(plan)}
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    className="text-blue-500"
                    onClick={() => setEditingPlan(plan)} // Only edit this plan
                  >
                    Edit
                  </button>
                )}
                <button
                  className="text-red-500"
                  onClick={() => handleDeletePlan(plan)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subscription;
