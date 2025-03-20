import { Input, Table, Modal, Button, Radio } from "antd";
import { Pencil, Search, Trash, Eye } from "lucide-react";
import React, { useState, useEffect } from "react";
import image from "../assets/Images/Notifications/Avatar.png";
import { useGetAllUsersQuery } from "../redux/features/getAllUsersApi";
import { useGetUserDetailsQuery } from "../redux/features/getUserDetialsApi";
import { useDeleteUserMutation } from "../redux/features/deleteUserApi";
import { useSearchUsersQuery } from "../redux/features/getSearchUser";
import { usePutChangeUserStatusMutation } from "../redux/features/putChangeUserStatus";

const Manage_Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserAction | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("active");

  const pageSize = 5;

  const { data, isLoading, isError } = searchTerm
    ? useSearchUsersQuery(searchTerm)
    : useGetAllUsersQuery({
        page: currentPage,
        perPage: pageSize,
      });
console.log("29", data?.users?.data);
  const { data: userDetails } = useGetUserDetailsQuery(userId, { skip: !userId });
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [putChangeUserStatus, { isLoading: isUpdating }] = usePutChangeUserStatusMutation();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const userDataSource = data?.users?.data?.map((user) => ({
    sId: user?.id,
    image: <img src={user?.avatar || image} className="w-9 h-9 rounded" alt="avatar" />,
    name: user?.name,
    email: user.email,
    role: user?.role|| "N/A",
    level: user.level || "N/A",
    status: user.status === "banned" ? "Blocked" : "Active",
    action: {
      sId: user.id,
      image: <img src={user.avatar || image} className="w-9 h-9 rounded" alt="avatar" />,
      name: user.name,
      role: user?.role|| "N/A",
      dateOfBirth: "24-05-2024",
      contact: "0521545861520",
      status: user.status,
      email: user.email,
    },
  })) || [];

  const columns = [
    {
      title: "Users",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: UserData) => (
        <div className="flex items-center gap-4">
          {record.image}
          {record.name}
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    // { title: "Level", dataIndex: "level", key: "level" },
    // { title: "Status", dataIndex: "status", key: "status" },
    // {
    //   title: <div className="text-right">Action</div>,
    //   dataIndex: "action",
    //   key: "action",
    //   render: (_: any, record: UserData) => (
    //     <div className="flex items-center justify-end gap-3">
    //       <button onClick={() => handleViewDetails(record.sId)} className="hover:bg-primary p-1 rounded bg-blue">
    //         <Eye />
    //       </button>
    //       <button onClick={() => handleUser(record.action)} className="hover:bg-primary p-1 rounded bg-blue">
    //         <Pencil />
    //       </button>
    //       <button onClick={() => handleDelete(record.action)} className="bg-secondary px-3 py-1 rounded hover:bg-primary">
    //         <Trash />
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  const handlePage = (page: number) => setCurrentPage(page);

  const handleUser = (action: UserAction) => {
    console.log("97",action);
    setUserData(action);
    setStatus(action.status); 
    setOpenModel(true);
  };

  const handleViewDetails = (id: number) => {
    setUserId(id);
    setOpenViewModal(true);
  };

  const handleDelete = (action: UserAction) => {
    console.log("109", action);
    setUserData(action);
    setOpenDeleteModal(true);
  };

  const onDeleteConfirm = async () => {
    console.log("113", userData);
    if (userData?.sId) {
      try {
        await deleteUser({ id: userData?.sId });
        setOpenDeleteModal(false);
        console.log("User deleted successfully");
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const onConfirmRoleChange = async () => {
    if (userData?.sId) {
      try {
        await putChangeUserStatus({
          id: userData.sId,
          data: { status, _method: "PUT" },
        }).unwrap();
        setOpenModel(false);
        console.log("Status updated successfully");
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  const onViewModalClose = () => {
    setOpenViewModal(false);
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users. Please try again later.</p>;

  return (
    <div>
      {/* <Input
        prefix={<Search />}
        className="w-full rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
        placeholder="Search by email"
        style={{ backgroundColor: "#f0f0f0", color: "#333333" }}
        onChange={(e) => handleSearch(e.target.value)}
      /> */}
      <div className="py-8">
        <Table
          dataSource={userDataSource}
          columns={columns}
          pagination={{
            pageSize,
            total: data?.data?.meta?.total || 50,
            current: currentPage,
            onChange: handlePage,
          }}
          rowClassName={() => "hover:bg-transparent"}
        />

        <Modal
          visible={openModel}
          onCancel={() => setOpenModel(false)}
          title="User Status"
          footer={[
            <Button key="cancel" onClick={() => setOpenModel(false)}>
              Cancel
            </Button>,
            <Button key="confirm" type="primary" onClick={onConfirmRoleChange} loading={isUpdating}>
              Save Changes
            </Button>,
          ]}
        >
          <p><strong>Name:</strong> {userData?.name}</p>
          <p><strong>Email:</strong> {userData?.email}</p>
          <Radio.Group onChange={(e) => setStatus(e.target.value)} value={status}>
            <Radio value="active">Active</Radio>
            <Radio value="banned">Blocked</Radio>
          </Radio.Group>
        </Modal>

        <Modal
          visible={openDeleteModal}
          onCancel={() => setOpenDeleteModal(false)}
          title="Delete User"
          footer={[
            <Button key="cancel" onClick={() => setOpenDeleteModal(false)}>
              Cancel
            </Button>,
            <Button key="confirm" type="primary" danger onClick={onDeleteConfirm} loading={isDeleting}>
              Delete
            </Button>,
          ]}
        >
          <p>Are you sure you want to delete this user?</p>
        </Modal>

        <Modal
          visible={openViewModal}
          onCancel={onViewModalClose}
          title="User Details"
          footer={[
            <Button key="close" type="primary" onClick={onViewModalClose}>
              Close
            </Button>,
          ]}
        >
          {userDetails ? (
            <div className="border border-gray-200 rounded-lg p-12">
              {userDetails?.data?.image && (
                <img src={userDetails?.data?.image} alt="User Avatar" className="w-24 flex mx-auto mb-12 h-24 rounded-full mb-4" />
              )}
              <p className="text-black text-lg "><strong>Full Name:</strong> {userDetails.data.full_name}</p>
              <p className="text-black py-2"><strong>Email:</strong> {userDetails.data.email}</p>
              <p className="text-black"><strong>Location:</strong> {userDetails.data.location || "N/A"}</p>
              <p className="text-black py-2"><strong>Level:</strong> {userDetails.data.level_name}</p>
              <p className="text-black"><strong>Points:</strong> {userDetails.data.points}</p>
              <p className="text-black py-2"><strong>Role:</strong> {userDetails.data.role}</p>
              <p className="text-black"><strong>Created At:</strong> {userDetails.data.created_at}</p>
            </div>
          ) : (
            <p>Loading user details...</p>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Manage_Users;
