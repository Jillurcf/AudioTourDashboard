import React, { useEffect, useState } from "react";
import { Collapse, Input, Button, message } from "antd";
import type { CollapseProps } from "antd";

import { useAddFaqMutation } from "../redux/features/postFaqApi";
import { useUpdateFaqMutation } from "../redux/features/putUpdateFaq";
import { useDeleteFaqMutation } from "../redux/features/deleteFaqApi";
import { Pencil, Trash } from "lucide-react";
import { useGetAllFaqQuery } from "../redux/features/getAllFaq";

interface FaqData {
  [key: string]: {
    question: string;
    status: string;
    answer: string;
  };
}

const SettingsFaq: React.FC = () => {
  const {data, isLoading, isError} = useGetAllFaqQuery();
  const [addFaq] = useAddFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();
  const allFaq = data?.data?.data || [];
  console.log("24", data?.data?.data)

  const [panelData, setPanelData] = useState<FaqData>({});
  const [editingPanel, setEditingPanel] = useState<string | null>(null);
  const [tempQuestion, setTempQuestion] = useState<string>("");
  const [tempAnswer, setTempAnswer] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const initialData: FaqData = {};
    allFaq.forEach((item: any) => {
      initialData[item.id] = {
        status: item.status,
        question: item.question,
        answer: item.answer,
      };
    });
    setPanelData(initialData);
  }, [allFaq]);

  const handleAddFaq = () => {
    const newKey = `new-${Date.now()}`;
    const newPanel = {
      [newKey]: {
        question: "",
        status: "active",
        answer: "",
      },
    };
    setPanelData((prevState) => ({
      ...newPanel,
      ...prevState,
    }));
    setEditingPanel(newKey);
  };

  const handleEdit = (key: string) => {
    const faqData = panelData[key];
    setEditingPanel(key);

    if (faqData) {
      setTempQuestion(faqData.question);
      setTempAnswer(faqData.answer);
      // setStatus(faqData.status);
    } else if (key.startsWith("new-")) {
      setTempQuestion("");
      setTempAnswer("");
      setStatus("active");
    }
  };

  const handleSave = async (key: string) => {
    try {
      const isNewFaq = key.startsWith("new-");
      const faqDetails = {
        question: tempQuestion,
        answer: tempAnswer,
        // status,
      };

      if (isNewFaq) {
        const response = await addFaq(faqDetails).unwrap();
        if (response?.success) {
          const createdFaq = response.data;

          setPanelData((prevState) => ({
            ...prevState,
            [createdFaq.id]: {
              question: createdFaq.question,
              answer: createdFaq.answer,
              status: createdFaq.status,
            },
          }));
          message.success("FAQ created successfully.");
        } else {
          message.error("Failed to create FAQ.");
        }
      } else {
        const response = await updateFaq({
          id: key,
          data: { ...faqDetails, _method: "PUT" },
        }).unwrap();
        if (response?.success) {
          setPanelData((prevState) => ({
            ...prevState,
            [key]: faqDetails,
          }));
          message.success("FAQ updated successfully.");
        } else {
          message.error("Failed to update FAQ.");
        }
      }

      setEditingPanel(null);
    } catch (error) {
      message.error("An error occurred while saving the FAQ.");
    }
  };

  const handleCancel = () => {
    setEditingPanel(null);
  };

  const items: CollapseProps["items"] = Object.keys(panelData).map((key) => ({
    key,
    label:
      editingPanel === key ? (
        <Input
          value={tempQuestion}
          onChange={(e) => setTempQuestion(e.target.value)}
          placeholder="Edit question"
        />
      ) : (
        <div className="items-center">
          <div className="flex justify-between">
            <div className="flex items-center">
              <span>{panelData[key].question}</span>
            </div>
            <div>
              <Button
                onClick={() => handleEdit(key)}
                type="link"
                className="ml-2"
              >
                <Pencil />
              </Button>
              <Button
                danger
                onClick={() => handleDelete(key)}
                type="link"
                className="ml-2"
              >
                <Trash />
              </Button>
            </div>
          </div>
        </div>
      ),
    children:
      editingPanel === key ? (
        <div>
          <Input.TextArea
            value={tempAnswer}
            onChange={(e) => setTempAnswer(e.target.value)}
            rows={4}
            placeholder="Edit answer"
          />
          <Button
            onClick={() => handleSave(key)}
            type="primary"
            className="mt-2"
          >
            Save
          </Button>
          <Button onClick={handleCancel} className="mt-2 ml-2">
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          <p>{panelData[key].answer}</p>
        </div>
      ),
  }));

  // Handle panel changes
  const handlePanelChange = (activeKey: string | string[]) => {
    console.log("Active panel changed: ", activeKey);
  };

  const handleDelete = async (key: string) => {
    try {
      await deleteFaq({ id: key }).unwrap();
      const updatedData = { ...panelData };
      delete updatedData[key];
      setPanelData(updatedData);
      message.success("FAQ deleted successfully.");
    } catch (error) {
      message.error("Failed to delete FAQ.");
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddFaq} className="mb-4">
        Add FAQ
      </Button>
      <Collapse
        items={items}
        defaultActiveKey={["1"]}
        onChange={handlePanelChange}
      />
    </div>
  );
};

export default SettingsFaq;
