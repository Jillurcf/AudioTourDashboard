import { Input, Modal, Table } from "antd";
import React, { useState } from "react";
import image from "../assets/Images/Notifications/Avatar.png";
import { Trash, Search, Pencil } from "lucide-react";
import ModalComponent from "../component/share/ModalComponent";
import { useAllProductListQuery } from "../redux/features/getAllProductListApi";
import { usePutApprovedMutation } from "../redux/features/putProductApprovedApi";
import { usePutCancelMutation } from "../redux/features/putCancelProduct";
import { usePutPendingMutation } from "../redux/features/putPendingProductApi";

interface UserAction {
  sId: number;
  image: React.ReactNode;
  name: string;
  email: string;
  status: string;
  dateOfBirth: string;
  contact: string;
}

interface UserData {
  sId: number;
  image: React.ReactNode;
  name: string;
  email: string;
  status: string;
  action: UserAction;
}

interface ProductListingProps {}

const ProductListing: React.FC<ProductListingProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserAction>({} as UserAction);
  const [type, setType] = useState<string>("");
  const [putApproved] = usePutApprovedMutation();
  const [ putCancel] = usePutCancelMutation();
  const [putPending] = usePutPendingMutation()
  const [searchQuery, setSearchQuery] = useState<string>("");

    const {data:userLists, isLoading, isError} = useAllProductListQuery({
      search: searchQuery
    });
  console.log("37",userLists)

  const pageSize = 5;

  const data= userLists?.data?.data?.map((item, index) => ({
    sId: item?.id,
    image: <img src={item?.image} className="w-9 h-9 rounded" alt="avatar" />,
    name: item?.product_name,
    category: item?.product_category,
    price: item?.price,
    quantity: "Quantity",
    status: item?.product_status,
    action: {
      sId: item?.id,
    image: <img src={item?.image} className="w-9 h-9 rounded" alt="avatar" />,
    name: item?.product_name,
    category: item?.product_category,
    price: item?.price,
    quantity: "Quantity",
    status: item?.product_status,
      dateOfBirth: "24-05-2024",
      contact: "0521545861520",
    },
  }));

  const columns = [
    {
      title: "Listing",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: UserData) => (
        <div className="flex items-center">
          {record.image}
          <span className="ml-3">{record.name}</span>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    // {
    //   title: "Quantity",
    //   dataIndex: "quantity",
    //   key: "quantity",
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, record: UserData) => (
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => handleUser(record.action)}
            className="hover:bg-primary p-1 rounded bg-blue"
          >
            <Pencil />
          </button>
          {/* <button
            onClick={() => handleDelete(record.action)}
            className="bg-secondary px-3 py-1 rounded hover:bg-primary"
          >
            <Trash />
          </button> */}
        </div>
      ),
    },
  ];

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleUser = (values: UserAction) => {
    setUserData(values);
    setOpenModel(true);
    setType("user");
  };

  const handleDelete = (values: UserAction) => {
    setUserData(values);
    setOpenDeleteModal(true);
  };

  const confirmApprove =async () => {
    console.log("Approved:", userData);
    setOpenModel(false);
    await putApproved({
      id: userData?.sId,
      _method: "PUT"
    })
  };
  const confirmCancel =async () => {
    console.log("Approved:", userData);
    setOpenModel(false);
    await putCancel({
      id: userData?.sId,
      _method: "PUT"
    })
  };
  const confirmPending =async () => {
    console.log("Approved:", userData);
    setOpenModel(false);
    await putPending({
      id: userData?.sId,
      _method: "PUT"
    })
  };

  const confirmDelete =async () => {
    console.log("Deleted:", userData);
    setOpenDeleteModal(false);
   
  };
const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value)
}
console.log(searchQuery)
  return (
    <div className="py-4">
      <div>
        <Input
          prefix={<Search />}
          className="w-full rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
          placeholder="Search for Listing"
          onChange={handleSearchChange}
          style={{
            backgroundColor: "#f0f0f0",
            color: "#333333",
          }}
        />
      </div>
      <div className="py-8">
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            pageSize,
            total: 50,
            current: currentPage,
            onChange: handlePage,
          }}
          rowClassName={() => "hover:bg-transparent"}
        />
        <ModalComponent
          openModel={openModel}
          setOpenModel={setOpenModel}
          title="Approve Item"
          subtitle="Are you sure you want to approve the product?"
          pendingLabel="Pending"
          cancelLabel="Cancel"
          confirmLabel="Approve"
          onPending={confirmPending}
          onCancel={confirmCancel}
          onConfirm={confirmApprove} // Your approve logic
        />
{/* 
        <ModalComponent
          openModel={openDeleteModal}
          setOpenModel={setOpenDeleteModal}
          title="Delete Item"
          subtitle="Are you sure you want to delete this item?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={confirmDelete} // Your delete logic
        /> */}
        {/* Modal for delete confirmation using Ant Design Modal */}
        <Modal
          title="Delete Item"
          visible={openDeleteModal}
          onOk={confirmDelete}
          onCancel={() => setOpenDeleteModal(false)}
          okText="Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete this item?</p>
        </Modal>

      </div>
    </div>
  );
};

export default ProductListing;
