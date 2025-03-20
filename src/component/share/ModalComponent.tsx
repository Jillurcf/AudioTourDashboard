import {
  Modal,
  Button,
  Select,
  Radio,
  Space,
  Input,
  RadioChangeEvent,
} from "antd";
import React, { useState } from "react";

const { Option } = Select;

interface ModalComponentProps {
  openModel: boolean;
  setOpenModel: (open: boolean) => void;
  title: string;
  subtitle: string;
  cancelLabel?: string;
  confirmLabel?: string;
  pendingLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  onPending: () => void;
  children?: React.ReactNode;
  role?: string; // The role to display or change
  setRole?: (role: string) => void; // Function to change the role
  showRoleSelect?: boolean; // New prop to conditionally show the Select dropdown
  value?: any; // Dynamic data value (User data)
  inputValue: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  openModel,
  setOpenModel,
  title,
  subtitle,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  pendingLabel="Pending",
  onCancel,
  onConfirm,
  onPending,
  children,
  role, // The selected role
  setRole, // Function to set the role dynamically
  showRoleSelect = false, // Default: hide the role select
  value, // Dynamic user data
}) => {
  const hideModal = () => {
    setOpenModel(false);
    if (onCancel) onCancel();
  };

  const handleApprove = () => {
    if (onConfirm) onConfirm();
    // hideModal();
  };
  const handlePending = () => {
    if (onPending) onPending();
    // hideModal();
  };

  const [inputValue, setInputValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setInputValue(e.target.value);
  };

  return (
    <Modal
      open={openModel}
      onCancel={hideModal}
      footer={null}
      bodyStyle={{
        backgroundColor: "white",
        padding: "20px",
        textAlign: "center",
      }}
      style={{
        top: "35%", // Flexbox to center
        left: "35%",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        position: "fixed",
      }}
      closable={false}
      centered={true} // Use Ant Design's centered property
    >
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-black">{title}</h1>
        <h2 className="text-lg text-gray-600">{subtitle}</h2>
      </div>

      {/* Conditionally display the role selection */}
      {showRoleSelect && setRole && (
        <div className="mb-4 py-6 flex-col">
          <Radio.Group onChange={onChange} inputvalue={value}>
            <Space className="text-start" direction="vertical">
              <Radio value={1}>Admin</Radio>
              <Radio value={2}>Member</Radio>
              <Radio value={3}>Block</Radio>
              {/* <Radio value={4}>
          More...
          {value === 4 ? <Input style={{ width: 100, marginInlineStart: 10 }} /> : null}
        </Radio> */}
            </Space>
          </Radio.Group>
          {/* <Select
            value={role}
            onChange={(value) => setRole(value)}
            style={{ width: 200 }}
          >
            <Option value="Admin">Admin</Option>
            <Option value="Member">Member</Option>
            <Option value="Block">Block</Option>
          </Select> */}
        </div>
      )}

      {/* Display specific properties of the userData */}
      {value && (
        <div className="mb-4">
          <p>
            <strong>Name:</strong> {value.name}
          </p>
          <p>
            <strong>Date of Birth:</strong> {value.dateOfBirth}
          </p>
          <p>
            <strong>Contact:</strong> {value.contact}
          </p>
        </div>
      )}

      {children && <div className="mb-4">{children}</div>}

      <div className="flex justify-center">
        <Button
          onClick={hideModal}
          style={{
            backgroundColor: "white",
            color: "#000",
            border: "1px solid #d9d9d9",
            marginRight: "10px",
          }}
        >
          {cancelLabel}
        </Button>

        <Button
          onClick={handlePending}
          style={{
            backgroundColor: "white",
            color: "#000",
            border: "1px solid #d9d9d9",
            marginRight: "10px",
          }}
        >
          { pendingLabel}
        </Button>
        <Button type="primary" onClick={handleApprove}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalComponent;
