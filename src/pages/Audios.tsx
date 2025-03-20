import {
  Button,
  Input,
  Modal,
  Form,
  Select,
  Upload,
  message,
  Table,
  Alert,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { Trash, Search, Pencil } from "lucide-react";
import ModalComponent from "../component/share/ModalComponent";
import { useAllProductListQuery } from "../redux/features/getAllProductListApi";
import { usePutApprovedMutation } from "../redux/features/putProductApprovedApi";
import { usePutCancelMutation } from "../redux/features/putCancelProduct";
import { usePutPendingMutation } from "../redux/features/putPendingProductApi";
import { useGetAllAudiosQuery } from "../redux/features/getAllAudioSlice";
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { usePostCreateAudioMutation } from "../redux/features/postCreateAudioApi";
import { useAllCategoriesQuery } from "../redux/features/getAllCategoriesApi";

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
const LocationPicker = () => {
  return (
    <div>
      {/* Add Map Location Picker Here */}
      <input type="text" placeholder="Choose on map -" />
    </div>
  );
};

const Audios: React.FC<ProductListingProps> = () => {
  const [openAddAudioModal, setOpenAddAudioModal] = useState<boolean>(false); // State for Add Audio Modal
  const [fileList, setFileList] = useState<any[]>([]);
  const [bannerFileList, setBannerFileList] = useState<any[]>([]);
  const [audioCategory, setAudioCategory] = useState<string>("");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    number | null
  >(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserAction>({} as UserAction);
  const [type, setType] = useState<string>("");
  const [putApproved] = usePutApprovedMutation();
  const [putCancel] = usePutCancelMutation();
  const [putPending] = usePutPendingMutation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [form] = Form.useForm();

  const [postCreateclub] = usePostCreateAudioMutation();
  const { data: categories } = useAllCategoriesQuery({});
  console.log("categories", categories?.categories);
  console.log("upload file+++++++++++++++++++++", fileList);
  const googleMapApiKey = "AIzaSyC84mj3YlqcaBWRyi1pxloQ4n3JcbL93XY";
  useEffect(() => {
    console.log("fileList:", fileList);
    if (!Array.isArray(fileList)) {
      setFileList([]);
    }
  }, [fileList]);

  const { data: userLists, isLoading, isError } = useGetAllAudiosQuery({});
  console.log("audioCategory", audioCategory);
  const pageSize = 5;

  const data = userLists?.audios?.data?.map((item) => ({
    sId: item?.id,
    image: <img src={item?.artwork} className="w-9 h-9 rounded" alt="avatar" />,
    name: item?.title,
    category: item?.category?.title,
    language: item?.language,
    artist: item?.artist || "artist name",
    quantity: "Quantity",
    created_at: item?.created_at.slice(0, 10),
    action: {
      sId: item?.id,
      image: <img src={item?.image} className="w-9 h-9 rounded" alt="avatar" />,
      name: item?.product_name,
      category: item?.product_category,
      language: item?.language,
      artist: item?.artist,
      quantity: "Quantity",
      created_at: item?.created_at.slice(0, 10),
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
      title: "Language",
      dataIndex: "language",
      key: "Language",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
    },
    {
      title: "Created_at",
      dataIndex: "created_at",
      key: "created_at",
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
        </div>
      ),
    },
  ];

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleUser = (values: UserAction) => {
    setOpenAddAudioModal(true);
    // setUserData(values);
    // setOpenModel(true);
    // setType("user");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddAudio = () => {
    setOpenAddAudioModal(true); // Open Add Audio Modal when clicked
  };

  const handleAddAudioSubmit = (values: any) => {
    console.log("New Audio Data:", values);
    // Logic to add audio data to the backend or state goes here
    setOpenAddAudioModal(false); // Close modal after submission
  };

  const handleUploadAudio = (info: any) => {
    console.log("info", info);
    let updatedFileList = info.fileList || []; // Ensure it's always an array
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    // Log the updated fileList for debugging
    console.log("Updated fileList:", updatedFileList);

    // if (info.file.status) {
    //   message.success(`${info.file.name} file uploaded successfully`);
    // } else {
    //   message.error(`${info.file.name} file upload failed.`);
    // }

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      // message.error(`${info.file.name} file upload failed.`);
      console.log("upload failed");
    }

    setBannerFileList(updatedFileList); // Update the file list state
  };
  const handleUploadChange = (info: any) => {
    console.log("info", info);
    let updatedFileList = info.fileList || []; // Ensure it's always an array
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    // Log the updated fileList for debugging
    console.log("Updated fileList:", updatedFileList);

    // if (info.file.status) {
    //   message.success(`${info.file.name} file uploaded successfully`);
    // } else {
    //   message.error(`${info.file.name} file upload failed.`);
    // }

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      // message.error(`${info.file.name} file upload failed.`);
      console.log("upload failed");
    }

    setFileList(updatedFileList); // Update the file list state
  };

  const hanldlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const location = place.geometry?.location;
      if (location) {
        setLatitude(location.lat());
        setLongitude(location.lng());
        form.setFieldsValue({ location: place.formatted_address });
        form.validateFields(["location"]);
      }
    } else {
      console.log("autocomplete");
    }
  };

  const handleCategoryChange = (value: string) => {
    setAudioCategory(value);
    const selectedCategory = categories?.categories.find(
      (category) => category?.title === value
    );
    const selectCategoryId = selectedCategory ? selectedCategory?.id : null;
    setSelectedCategoryIndex(selectCategoryId)
  };
  const HandleCreateAudio = async () => {
    const formData = new FormData();
    formData.append("category_id", selectedCategoryIndex)
    formData.append("title", title)
   
    // if(fileList?.length && fileList[0]?.originFileObj){
    //   const bannerImg = fileList[0]?.originFileObj as File;
    //   formData.append("artwork", bannerImg, bannerImg?.name);
    // }
    // if (bannerFileList.length && bannerFileList[0].originFileObj) {
    //   const audioFile = bannerFileList[0].originFileObj as File;
    //   formData.append("url", audioFile, audioFile.name);
    // }
   
// Check if the image file exists and append it to FormData
// Append image file if it exists
if (fileList?.length && fileList[0]?.originFileObj) {
  const bannerImg = fileList[0].originFileObj as File;
  formData.append("artwork", bannerImg, bannerImg.name); // Ensure the file is appended as a file
}

// Append audio file if it exists
if (bannerFileList.length && bannerFileList[0].originFileObj) {
  const audioFile = bannerFileList[0].originFileObj as File;
  formData.append("url", audioFile, audioFile.name); // Ensure the file is appended as a file
}


    formData.append("description", des)
    formData.append("lat", latitude)
    formData.append("lng", longitude)
    formData.append("language", "english")
    const res = await postCreateclub(formData);
    notification.open({
      message: 'Audio Added',
      description: 'Your audio file has been successfully added.',
    });
  };
  console.log("indexCategory", selectedCategoryIndex);
  return (
    <div className="py-4">
      <div>
        <div className="flex justify-end">
          {/* <Input
            prefix={<Search />}
            className="w-[50%] rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
            placeholder="Search for Listing"
            onChange={handleSearchChange}
            style={{
              backgroundColor: "#f0f0f0",
              color: "#333333",
            }}
          /> */}
          <Button
            onClick={handleAddAudio}
            className="w-24 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Audio
          </Button>
        </div>
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
          onPending={() => putPending({ id: userData.sId, _method: "PUT" })}
          onCancel={() => putCancel({ id: userData.sId, _method: "PUT" })}
          onConfirm={() => putApproved({ id: userData.sId, _method: "PUT" })}
        />
        <Modal
          title="Delete Item"
          visible={openDeleteModal}
          onOk={() => setOpenDeleteModal(false)} // Delete logic
          onCancel={() => setOpenDeleteModal(false)}
          okText="Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete this item?</p>
        </Modal>
        {/* Modal for adding audio */}
        <Modal
          title="Add New Audio"
          visible={openAddAudioModal}
          onCancel={() => setOpenAddAudioModal(false)} // Close modal
          footer={null}
          width={800}
        >
          <Form onFinish={handleAddAudioSubmit} layout="vertical">
            {/* Upload Story Banner */}

            {/* Upload Audio */}
            <div className="flex justify-between w-[100%] gap-4">
              <div className="w-[50%]">
                <Form.Item label="Upload banner" name="audio">
                  <div className="w-[] items-center justify-center flex h-full border border-y-2 border-gray-200 p-8 rounded-2xl">
                    <Upload
                      name="banner"
                      listType="picture-card"
                      fileList={fileList}
                      onChange={handleUploadChange}
                      style={{ width: "100%", height: "auto" }} // Set to width 100% for responsiveness and height 'auto'
                    >
                      {fileList.length < 1 && "+ Upload image"}
                    </Upload>
                  </div>
                </Form.Item>
              </div>
              <div className="w-[50%]">
                <Form.Item label="Upload audio" name="audio">
                  <div className="w-[] items-center justify-center flex h-full border border-y-2 border-gray-200 p-8 rounded-2xl">
                    <Upload
                      name="audio"
                      listType="picture-card"
                      fileList={bannerFileList}
                      onChange={handleUploadAudio}
                      style={{ width: "100%", height: "auto" }} // Set to width 100% for responsiveness and height 'auto'
                    >
                      {bannerFileList.length < 1 && "+ Upload audio"}
                    </Upload>
                  </div>
                </Form.Item>
              </div>
            </div>

            {/* Category Selection */}
            <Form.Item
              label="Select Category"
              name="category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select
                className="border rounded-lg h-8"
                defaultValue={audioCategory}
                value={audioCategory}
                onChange={handleCategoryChange}
              >
                {categories?.categories?.map((category, i) => (
                  <Select.Option key={category?.id} value={category?.title}>
                    {category?.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {/* Title and Description */}
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Type here"
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter a description" },
              ]}
            >
              <Input.TextArea
                onChange={(e) => setDes(e.target.value)}
                placeholder="Type here"
                rows={4}
              />
            </Form.Item>
            {/* Location Picker */}
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please enter the location" }]}
            >
              <LoadScript
                googleMapsApiKey={googleMapApiKey}
                libraries={["places"]}
              >
                <Autocomplete
                  onLoad={(autocompleteInstance) =>
                    setAutocomplete(autocompleteInstance)
                  }
                  onPlaceChanged={hanldlePlaceChanged}
                >
                  <Input className="w-full" placeholder="Search location" />
                </Autocomplete>
                {/* display google map */}
                <GoogleMap
                  mapContainerStyle={{
                    borderRadius: "10px",

                    width: "100%",
                    height: "200px",
                    marginTop: "16px",
                  }}
                  center={{ lat: latitude, lng: longitude }}
                  zoom={12}
                >
                  <Marker position={{ lat: latitude, lng: longitude }} />
                </GoogleMap>
              </LoadScript>
            </Form.Item>
            {/* Upload Button */}
            <Form.Item>
              <Button
                onClick={HandleCreateAudio}
                type="primary"
                htmlType="submit"
                block
              >
                Add Audio
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Audios;
