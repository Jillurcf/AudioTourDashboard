import React, { useState } from "react";
import { Input, Modal, Table } from "antd";
import { Search, Pencil } from "lucide-react";
import { usePutApprovedMutation } from "../redux/features/putProductApprovedApi";
import { usePutCancelMutation } from "../redux/features/putCancelProduct";
import { usePutPendingMutation } from "../redux/features/putPendingProductApi";
import { useRejectionQuery } from "../redux/features/getAllRection";
import { usePutReturnMutation } from "../redux/features/putReturnAmount";

interface UserAction {
  sId: number;
  orderId: number,
  name: string;
  email: string;
  status: string;
  dateOfBirth: string;
  contact: string;
}

interface UserData {
  sId: number;
  orderId: number,
  name: string;
  email: string;
  status: string;
  action: UserAction;
}

const RejectionOrder: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserAction | null>(null);

  const [putReturn] = usePutReturnMutation()

  

  const { data: userLists, isLoading, isError } = useRejectionQuery();

  const pageSize = 5;

  const data = userLists?.data?.map((item: any) => ({
    sId: item?.id,
    name: item?.user?.full_name,
    email: item?.user?.email,
    productId: item?.product_id,
    orderId: item?.order_id,
    rejectionTime: item?.created_at.slice(-14).slice(0, 8),
    status: item?.status,
    userId: item?.user_id,
    action: {
        sId: item?.id,
        name: item?.user?.full_name,
        email: item?.user?.email,
        productId: item?.product_id,
        orderId: item?.order_id,
        rejectionTime: item?.created_at.slice(-14).slice(0, 8),
        status: item?.status,
        userId: item?.user_id,
    },
  }));

  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Product Id",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Rejection Time",
      dataIndex: "rejectionTime",
      key: "rejectionTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: UserData) => (
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => handleModal(record.action, "approve")}
            className="hover:bg-primary p-1 rounded bg-blue"
          >
            <Pencil />
          </button>
        </div>
      ),
    },
  ];

  const handleModal = (user: UserAction, type: string) => {
    setSelectedUser(user);
    setModalType(type);
    setOpenModal(true);
  };

  const handleModalConfirm = async () => {
    if (!selectedUser) return;

    switch (modalType) {
      case "approve":
        await putReturn({ id: selectedUser.orderId, _method: "PUT" });
        break;
     }
    setOpenModal(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="py-4">
      {/* Table */}
      <div className="py-8">
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            pageSize,
            total: userLists?.data?.length || 0,
            current: currentPage,
            onChange: setCurrentPage,
          }}
          rowClassName={() => "hover:bg-transparent"}
        />

        {/* Modal */}
        <Modal
          title={
            modalType === "approve"
              ? "Approve Item"
              : modalType === "cancel"
              ? "Cancel Item"
              : "Mark as Pending"
          }
          open={openModal}
          onOk={handleModalConfirm}
          onCancel={() => setOpenModal(false)}
          okText={
            modalType === "approve"
              ? "Return Money"
              : modalType === "cancel"
              ? "Cancel"
              : "Mark as Pending"
          }
          cancelText="Close"
        >
          <p>
            Are you sure you want to{" "}
            {modalType === "approve"
              ? "approve"
              : modalType === "cancel"
              ? "cancel"
              : "mark as pending"}{" "}
            this item?
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default RejectionOrder;
