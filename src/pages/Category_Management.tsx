import {
  Input,
  Table,
  Modal,
  Button,
  Radio,
  Switch,
  notification,
  Form,
  Upload,
  Spin,
} from "antd";
import { Pencil, Search, Trash, Eye } from "lucide-react";
import React, { useState, useEffect, useId } from "react";
import image from "../assets/Images/Notifications/Avatar.png";
import { useGetAllUsersQuery } from "../redux/features/getAllUsersApi";
import { useGetUserDetailsQuery } from "../redux/features/getUserDetialsApi";
import { useDeleteUserMutation } from "../redux/features/deleteUserApi";
import { useSearchUsersQuery } from "../redux/features/getSearchUser";
import { usePutChangeUserStatusMutation } from "../redux/features/putChangeUserStatus";
import { useAllCategoriesQuery } from "../redux/features/getAllCategoriesApi";
import { useFeaturedAddAndRemoveMutation } from "../redux/features/postAndRemoveFeatured";
import { useAddCategoriesMutation } from "../redux/features/postAddCategories";
import { useGetSingleCategoryQuery } from "../redux/features/getSingleCategory";
import { useUpdateCategoriesMutation } from "../redux/features/postUpdatecategory";
import { useDeleteCategoryMutation } from "../redux/features/deleteCategoryApi";

const Manage_Users = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserAction | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("active");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCheck, setIscheck] = useState(0)
  const [categoryEdit, setCategoryEdit] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [form] = Form.useForm(); // Ant Design form instance
  console.log("categoryEdit", categoryEdit);
  const pageSize = 5;
  console.log("userData", userData);
  const { data, isLoading, isError, refetch } = useAllCategoriesQuery({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // console.log("29", data?.categories);
  const { data: userDetails } = useGetUserDetailsQuery(userId, {
    skip: !userId,
  });
  const { data: singleCategory } = useGetSingleCategoryQuery(userId);
  console.log("single category", singleCategory?.category);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [putChangeUserStatus, { isLoading: isUpdating }] =
    usePutChangeUserStatusMutation();
  const [addCategories] = useAddCategoriesMutation();
  const [featuredAddAndRemove] = useFeaturedAddAndRemoveMutation();
  const [updateCategories] = useUpdateCategoriesMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [fileList, setFileList] = useState([]);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    image: null,
  });
  console.log("modal Data", modalData?.image?.originFileObj.name);
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (singleCategory?.category) {
      setCategoryEdit(singleCategory?.category);
      setModalData({
        title: singleCategory?.category?.title || "",
        description: singleCategory?.category?.description || "",
        image: singleCategory?.category?.image || null,
      });
    }
  }, [singleCategory?.category]);

  const { title, artwork, description } = categoryEdit || {};


  useEffect(() => {
    if (categoryEdit) {
      form.setFieldsValue({
        title: categoryEdit.title,
        description: categoryEdit.description,
      });

      // Check if categoryEdit has artwork, if yes, set the existing image
      if (categoryEdit?.artwork) {
        form.setFieldsValue({
          image: [
            {
              uid: "-1", // Unique id to represent the existing image
              name: "Existing Image", // Image name
              status: "done", // Mark as done since it's already uploaded
              url: categoryEdit?.artwork, // URL of the existing image
            },
          ],
        });
      }
    }
  }, [categoryEdit, form]);

  const handleImageChanges = (info: any) => {
    const latestFile = info.file; // Get the latest uploaded file
    console.log("latest file", latestFile)
    setFileList([latestFile]); // Keep only the latest file
  
    // Handle image change: update the form state with new image file or file list
    if (info.fileList.length > 0) {
      form.setFieldsValue({
        // image: info.fileList, // Update image list in form state
        image: [latestFile]
      });
    }
  };

  const userDataSource =
    data?.categories?.map((user) => ({
      sId: user?.id,
      image: (
        <img
          src={user?.artwork || image}
          className="w-9 h-9 rounded"
          alt="avatar"
        />
      ),
      name: user?.title,
      updateAt: user?.updated_at,
      role: user?.role || "N/A",
      level: user.level || "N/A",
      featured: user?.is_featured,
      status: user.status === "banned" ? "Blocked" : "Active",
      action: {
        sId: user?.id,
        image: (
          <img
            src={user.avatar || image}
            className="w-9 h-9 rounded"
            alt="avatar"
          />
        ),
        name: user?.title,
        updateAt: user?.updated_at,
        role: user?.role || "N/A",
        level: user.level || "N/A",
        featured: user?.is_featured,
        status: user.status,
      },
    })) || [];
  console.log("userdata ++++++++++++++++", userDataSource);
  const columns = [
    {
      title: "Categories",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: UserData) => (
        <div className="flex items-center gap-4">
          {record.image}
          {record.name}
        </div>
      ),
    },
    { title: "Update Time", dataIndex: "updateAt", key: "updateAt" },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      render: (_: any, record: UserData) => (
        <Switch
          checked={record.featured}
          onChange={(checked) => onChange(checked, record.sId)} // Handle state change
        />
      ),
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, record: UserData) => (
        <div className="flex items-center justify-end gap-3">

          <button
            onClick={() => editCategory(record.action)}
            className="hover:bg-primary p-1 rounded bg-blue"
          >
            <Pencil />
          </button>
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

  const onChange = async (checked: boolean, userId: string) => {
    console.log("userId", userId);
    try {
      // Optimistically update the local data source
      const updatedUserDataSource = userDataSource.map((user) =>
        user.sId === userId ? { ...user, featured: checked } : user
      );
      setIscheck(updatedUserDataSource); // Update the local state
      const formData = new FormData();
      formData.append("category_id", userId);
      // Call the Redux mutation to update the featured status in the backend
      const res = await featuredAddAndRemove(formData).unwrap();
      console.log(res);

      // Optionally show success notification
      notification.success({
        message: `Featured status for user ${userId} updated to ${checked}`,
      });
    } catch (error) {
      // Handle error gracefully
      console.error("Failed to update featured status:", error);

      // Optionally show error notification
      notification.error({
        message: "Failed to update featured status",
        description: "Please try again later.",
      });
    }

    // Log the switch action
    console.log(`Switch for user ${userId} to ${checked}`);
  };
  const handlePage = (page: number) => setCurrentPage(page);

  const editCategory = async (action: UserAction) => {
    console.log("97", action?.sId);
    setUserData(action);
    setUserId(action?.sId);
    setStatus(action.status);
    setOpenModel(true);
    console.log("click");
  };

  const updateCategory = async () => {
    // Create FormData
    const formData = new FormData();

    // Append title and description
    formData.append("title", categoryEdit?.title || "");
    formData.append("description", categoryEdit?.description || "");
    formData.append("_method", "PUT"); // for PUT request simulation

    // Get the image file from the form state
    const imageList = form.getFieldValue("image");

    if (imageList && imageList.length > 0) {
      // If there is a new image selected/uploaded, append it to the FormData
      const imageFile = imageList[0]?.originFileObj as File;
      if (imageFile) {
        formData.append("artwork", imageFile, imageFile.name); // Append new image file
      }
    } else if (categoryEdit?.artwork) {
      // If no new image is uploaded and there's an existing image, do not append anything
      // This will keep the existing image unless your backend needs it (if yes, upload the image again)
      // Example of re-uploading the existing image (not needed if backend doesn't require it)
      // const response = await fetch(categoryEdit.artwork);
      // const blob = await response.blob();
      // formData.append("artwork", blob, "existing_image.jpg");
    }

    // Debug log to check FormData content
    console.log("formData: ", formData);

    try {
      // Send the form data to the backend using the updateCategories function
      const res = await updateCategories({
        data: formData,
        id: categoryEdit?.id,
      }).unwrap();

      refetch(); // Optional: Re-fetch data after update
      setOpenModel(false); // Close the modal after success

      console.log("Response:", res);
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  const handleViewDetails = (id: number) => {
    setUserId(id);
    setOpenViewModal(true);
  };

  const handleDelete = async (action: UserAction) => {
    console.log("109", action);
    setUserData(action);
    setOpenDeleteModal(true);
    // try {
    //   const formData = new FormData();

    //   const res = await deleteCategory(action?.sId);
    //   console.log("resDlete", res);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const onDeleteConfirm = async () => {
    console.log("113", userData);
    if (userData?.sId) {
      try {
        const formData = new FormData();

        const res = await deleteCategory(userData?.sId);
        setOpenDeleteModal(false)
        console.log("resDlete", res);
        if(res){
          setOpenDeleteModal(false);
        }
      } catch (error) {
        console.log(error);
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

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error loading catetgories. Please try again later.</p>;

  const handleAddCategory = async () => {
    setIsModalVisible(true); // Show modal
  };

  // Function to handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to handle form submission
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Logic for submitting the form
        console.log("Form values:", values);

        // Example: Send data to your backend API here
        // For now, just show a success notification
        notification.success({
          message: "Audio Added Successfully",
        });

        // Close modal after successful submission
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Form validation failed:", error);
      });
  };
  // const handleImageChange = ({ fileList }: any) => {
  //   if (fileList.length > 0) {
  //     // Set the uploaded image file to formData state
  //     setModalData((prevData) => ({
  //       ...prevData,
  //       image: fileList[0], // Store the first file in the list
  //     }));
  //     setCategoryEdit((prevData) => ({
  //       ...prevData,
  //       image: fileList[0], // Store the first file in the list
  //     }));
  //   }
  // };

  const handleImageChange = (info: UploadChangeParam) => {
    if (info.file.originFileObj) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target?.result as string);
      reader.readAsDataURL(info.file.originFileObj);
    }

    // Ensure form.setFieldsValue and modalData are updated properly
    form.setFieldsValue({ image: info.fileList });
    setModalData((prevData) => ({
      ...prevData,
      image: info.fileList[0] || null, // Store the first file in the list or null if no file
    }));
  };

  const handleSubmit = async () => {
    console.log("click");

    // Create FormData
    const formData = new FormData();

    // Append title and description
    formData.append("title", modalData?.title || "");
    formData.append("description", modalData?.description || "");

    // Check if the image exists and append to FormData
    if (modalData?.image && modalData.image.originFileObj) {
      const imageFile = modalData.image.originFileObj as File;
      formData.append("artwork", imageFile, imageFile.name); // Append image file
    }

    console.log("formData++++++++++", formData);

    try {
      // Call the addCategories function to send form data to the backend
      const res = await addCategories(formData).unwrap();

      // Handle response
      console.log("res", res);

      // Show success notification
      notification.success({
        message: "Category Added Successfully",
      });
    } catch (error) {
      console.error("Error submitting category:", error);
      // Optionally, show error notification
      notification.error({
        message: "Failed to add category",
      });
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spin size="large" tip="Loading data..." />
      ) : (
        ""
      )}
      <div className="flex justify-end">
        <Button
          onClick={handleAddCategory}
          className=" px-7 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Category
        </Button>
      </div>
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
            // total: data?.data?.meta?.total || 50,
            current: currentPage,
            onChange: handlePage,
          }}
          rowClassName={() => "hover:bg-transparent"}
        />

        <Modal
          visible={openModel}
          onCancel={() => setOpenModel(false)}
          title="Edit category"
          footer={null} // Footer is null to customize it manually
        >
          {/* Form inside the modal */}
          <Form
            onFinish={updateCategory} // onFinish will handle the form submission
            form={form}
            layout="vertical"
          >
            <Form.Item
              label="Title"
              name="title"
              initialValue={categoryEdit?.title} // Set initial value for the title
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input
                value={categoryEdit?.title}
                onChange={(e) =>
                  setCategoryEdit({ ...categoryEdit, title: e.target.value })
                }
                placeholder={categoryEdit?.title}
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              initialValue={categoryEdit?.description} // Set initial value for description
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input.TextArea
                value={categoryEdit?.description}
                onChange={(e) =>
                  setCategoryEdit({
                    ...categoryEdit,
                    description: e.target.value,
                  })
                }
                placeholder={
                  categoryEdit?.description || "Enter the description"
                }
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <Upload
                onChange={handleImageChanges}
                name="file"
                beforeUpload={() => false} // Prevent automatic upload
                listType="picture-card"
                accept="image/*"
                // fileList={fileList}
              >
                <Button>Upload Image</Button>
              </Upload>
            </Form.Item>

            {/* Modal Footer with buttons */}
            <div className="modal-footer">
              <Button
                key="cancel"
                onClick={() => setOpenModel(false)} // Close the modal when clicked
              >
                Cancel
              </Button>
              <Button
                key="confirm"
                type="primary"
                htmlType="submit" // Trigger form submission when clicked
                loading={isUpdating} // Optional loading state
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal>

        <Modal
          visible={openDeleteModal}
          onCancel={() => setOpenDeleteModal(false)}
          title="Delete Category"
          footer={[
            <Button key="cancel" onClick={() => setOpenDeleteModal(false)}>
              Cancel
            </Button>,
            <Button
              key="confirm"
              type="primary"
              danger
              onClick={onDeleteConfirm}
              loading={isDeleting}
            >
              Delete
            </Button>,
          ]}
        >
          <p className="text-red-500">
            Are you sure you want to delete
             <strong className="text-black text-lg"> {userData?.name || "this category"}</strong>?
          </p>
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
                <img
                  src={userDetails?.data?.image}
                  alt="User Avatar"
                  className="w-24 flex mx-auto mb-12 h-24 rounded-full mb-4"
                />
              )}
              <p className="text-black text-lg ">
                <strong>Full Name:</strong> {userDetails.data.full_name}
              </p>
              <p className="text-black py-2">
                <strong>Email:</strong> {userDetails.data.email}
              </p>
              <p className="text-black">
                <strong>Location:</strong> {userDetails.data.location || "N/A"}
              </p>
              <p className="text-black py-2">
                <strong>Level:</strong> {userDetails.data.level_name}
              </p>
              <p className="text-black">
                <strong>Points:</strong> {userDetails.data.points}
              </p>
              <p className="text-black py-2">
                <strong>Role:</strong> {userDetails.data.role}
              </p>
              <p className="text-black">
                <strong>Created At:</strong> {userDetails.data.created_at}
              </p>
            </div>
          ) : (
            <p>Loading user details...</p>
          )}
        </Modal>

        {/*  */}
        {/* Category add modal */}
        <Modal
          title="Add Category"
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={handleOk}
          footer={[
            // Custom footer with Submit Button
            <Button key="submit" type="primary" onClick={handleSubmit}>
              Submit
            </Button>,
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
          ]}
          destroyOnClose // Ensure the form resets when modal closes
        >
          {/* Form inside the modal */}
          <Form form={form} layout="vertical">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input
                onChange={(e) =>
                  setModalData({ ...modalData, title: e.target.value })
                }
                placeholder="Enter the title"
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input.TextArea
                onChange={(e) =>
                  setModalData({ ...modalData, description: e.target.value })
                }
                placeholder="Enter the description"
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <Upload
                onChange={handleImageChange}
                name="file"
                beforeUpload={() => false} // Prevent automatic upload
                listType="picture"
                accept="image/*"
              >
                <Button>Upload Image</Button>
              </Upload>
            </Form.Item>
            {/* Image Preview */}
            {imageUrl && (
              <div style={{ marginTop: 10 }}>
                <Image width={200} src={imageUrl} alt="Uploaded Preview" />
              </div>
            )}
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Manage_Users;
