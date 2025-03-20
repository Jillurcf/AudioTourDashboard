import React, { useState } from "react";
import { ChevronLeft, Pencil, Search, Trash } from "lucide-react";
import { Input } from "antd";
import image from "../assets/Images/Notifications/Avatar.png";
import SelectBox from "../component/share/SelectBox";
import SellerActivityChart from "../component/manageUsers/SellerActivityChart";
import CustomTable from "../component/share/CustomTable";
import ModalComponent from "../component/share/ModalComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserDetailsQuery } from "../redux/features/getUserDetialsApi";

type Props = {};
interface UserAction {
  sId: number;
  image: React.ReactNode;
  productName: string;
  productCategory: string;
  email: string;
  status: string;
  dateOfBirth: string;
  contact: string;
}

interface UserData {
  sId: number;
  image: React.ReactNode;
  productName: string;
  productCategory: string;
  email: string;
  status: string;
  action: UserAction;
}

const Seller_Profile = (props: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserAction>({} as UserAction);
  const [type, setType] = useState<string>("");
 
  const pageSize = 3;
  const { id } = useParams();
  
  // Ensure that id is passed as a string (if it's an object)
  const { data: userDetails, isLoading, isError } = useGetUserDetailsQuery({
    id: id ? id : null // Only use `id` if it's available
  });

  console.log("49", userDetails?.data?.products);

  const activities =userDetails?.data?.activities
  console.log("43", id);

  const [selectedValue, setSelectedValue] = useState();
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    console.log("Selected", value);
  };

  const selectOptions = [
    { value: "1", label: "Last week" },
    { value: "2", label: "Last Month" },
    { value: "3", label: "Last Year" },
  ];

  const data = userDetails?.data?.products.map((item, index) => ({
    sId: item?.id,
    image: item?.product_images,
    productName: item?.product_name || "KTM 390Duke",  // Adjust with actual field name
    productCategory: item?.product_category || "Vehicle",  // Adjust with actual field name
    price: item?.price || "$6729.00",  // Adjust with actual field name
    quantity: item?.quantity || "Quantity",  // Adjust with actual field name
    action: {
      sId: index + 1,
      image: item?.product_images,
      productName: item?.product_name || "KTM 390Duke",  // Adjust with actual field name
      productCategory: item?.product_category || "Vehicle",  // Adjust with actual field name
      price: item?.price || "$6729.00",  // Adjust with actual field name
      quantity: item?.quantity || "Quantity",  // Adjust with actual field name
      dateOfBirth: "24-05-2024",
      contact: "0521545861520",
    },
  }));
  

  const columns = [
    {
      title: "Listing",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: UserData) => {
        console.log("Record:", record); // Log the record here
  
        return (
          <div className="flex items-center">
            {Array.isArray(record.image) && record.image.length > 0 ? (
              record.image.map((img, idx) => (
                <div key={idx} className="mr-2">
                  <img src={img} className="w-9 h-9 rounded" alt={`product-image-${idx}`} />
                </div>
              ))
            ) : (
              <span>No images available</span>
            )}
            <span className="ml-3">{record.productName}</span>
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "productCategory",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, record: UserData) => (
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => handleDelete(record.action)}
            className="bg-secondary px-3 py-1 rounded hover:bg-primary"
          >
            <Trash />
          </button>
        </div>
      ),
    },
  ];
  

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleUser = (values: UserAction) => {
    setUserData(values);
    setOpenModal(true);
    setType("user");
  };

  const handleDelete = (values: UserAction) => {
    setUserData(values);
    setOpenDeleteModal(true);
  };

  const confirmApprove = () => {
    console.log("Approved:", userData);
    setOpenModal(false);
    // Add approve logic here
  };

  const confirmDelete = () => {
    console.log("Deleted:", userData);
    setOpenDeleteModal(false);
    // Add delete logic here
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/manage-users');
  };

  return (
    <div>
      <div className="flex justify-between w-full">
        <div onClick={handleBack} className="flex cursor-pointer">
          <ChevronLeft />
          <h1>User Profile</h1>
        </div>
        <div>
          <Input
            prefix={<Search />}
            className="rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
            placeholder="Search for Listing"
            style={{
              backgroundColor: "#f0f0f0",
              color: "#333333",
            }}
          />
        </div>
      </div>
      <div className="flex gap-2 h-48 items-center justify-center mt-28">
        <div className="w-1/2 h-[380px] items-center justify-center py-8 bg-white rounded-2xl">
          <div className="mx-auto text-center items-center">
            <img src={userDetails?.data?.user?.image} className="w-24 h-24 rounded mx-auto" alt="" />
            <h1 className="text-xl font-bold py-2">{userDetails?.data?.user?.full_name}</h1>
            <p className="">Balance: {userDetails?.data?.user?.balance}</p>
            <p>{userDetails?.data?.user?.email}</p>
          </div>
          <div className="grid grid-cols-5 gap-4 p-4">
            <div className="border border-gray-200 py-6 items-center justify-center text-center 4/12 rounded-xl px-6 ">
              <p>Approved Products</p>
              <h1 className="text-xl font-bold">{userDetails?.data?.counts?.approvedProduct}</h1>
            </div>
            <div className="border border-gray-200 py-6 4/12 text-center rounded-xl px-6 ">
              <p>Cancel Product</p>
              <h1 className="text-xl font-bold">{userDetails?.data?.counts?.canceledProduct}</h1>
            </div>
            <div className="border border-gray-200 py-6 4/12 text-center rounded-xl px-6 ">
              <p>Pending orders</p>
              <h1 className="text-xl font-bold">{userDetails?.data?.counts?.pendingOrders}</h1>
            </div>
            <div className="border border-gray-200 py-6 4/12 text-center rounded-xl px-6 ">
              <p>Pending orders</p>
              <h1 className="text-xl font-bold">{userDetails?.data?.counts?.pendingProduct}</h1>
            </div>
            <div className="border border-gray-200 py-6 4/12 text-center rounded-xl px-6 ">
              <p>Pending orders</p>
              <h1 className="text-xl font-bold">{userDetails?.data?.counts?.saleOrders}</h1>
            </div>
          </div>
        </div>

        <div className="h-[380px] w-1/2 py-4 justify-center bg-white rounded-2xl">
          <div className="flex justify-between w-full px-6">
            <div className="text-lg font-bold">Activities</div>
            <div>
              <SelectBox
                placeholder="Last week"
                options={selectOptions}
                onChange={handleSelectChange}
                style={{ width: 150 }}
              />
            </div>
          </div>
          <SellerActivityChart activities={activities} />
        </div>
      </div>
      <div className="mt-28 bg-white">
        <h1 className="p-4 text-xl font-bold">Product Listing</h1>
        <CustomTable
          dataSource={data}
          columns={columns}
          pagination={{
            pageSize,
            total: 50,
            current: currentPage,
          }}
          handlePageChange={handlePage}
        />

        <ModalComponent
          openModel={openModal}
          setOpenModel={setOpenModal}
          title="Approve Item"
          subtitle="Are you sure you want to approve the product?"
          cancelLabel="Cancel"
          confirmLabel="Approve"
          onConfirm={confirmApprove} // Your approve logic
        />

        <ModalComponent
          openModel={openDeleteModal}
          setOpenModel={setOpenDeleteModal}
          title="Delete Item"
          subtitle="Are you sure you want to delete this item?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={confirmDelete} // Your delete logic
        />
      </div>
    </div>
  );
};

export default Seller_Profile;
