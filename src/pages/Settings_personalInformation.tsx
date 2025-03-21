
import React, { useEffect, useState } from 'react';
import { Upload, Input, Button, Form, message } from 'antd';
import type { UploadFile, UploadProps, FormProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useGetPersonalInformationQuery } from '../redux/features/getPersonalInformationApi';
import { useUpdatePersonalInformationMutation } from '../redux/features/putUpdatePersonalInfromation';
import { useUpdateImageMutation } from '../redux/features/putUpdtaeImage';
import Swal from 'sweetalert2';

type FileType = Exclude<Parameters<UploadProps['beforeUpload']>[0], undefined>;

interface FieldType {
  name?: string;
  email?: string;
  contact: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const SettingsPersonalInformation: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [form] = Form.useForm();

  // Fetch personal information data
  const { data, isLoading, isError } = useGetPersonalInformationQuery({});
  const [updateImage] = useUpdateImageMutation();
  const [updatePersonalInformation, { isSuccess }] = useUpdatePersonalInformationMutation();

  console.log("personal information", data?.data);

  useEffect(() => {
    if (data && data.data) {
      form.setFieldsValue({
        name: data.data?.name || "No contact found",
        email: data.data.email || "No data found",
        contact: data?.data?.phone || "No data found"
      });

      if (data.data.avatar) {
        const imageUrl = data.data.avatar;
        setFileList([
          {
            uid: '-1',
            name: 'profile.png',
            status: 'done',
            url: imageUrl, // Set the existing image URL
          } as UploadFile,
        ]);
        setPreviewImage(imageUrl);
      }
    } else if (isError) {
      message.error("Failed to load personal information");
    }
  }, [data, isError, form]);
  const onChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
  
    if (newFileList.length > 0) {
      const uploadedFile = newFileList[0].originFileObj; // Get the uploaded file
  
      if (uploadedFile) {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('image', uploadedFile, uploadedFile.name); // Append the image file to FormData
  
        try {
          const response = await updateImage(formData); // Call the mutation
          console.log('Image upload response:', response);
  
          if (response) {
            Swal.fire({
              icon: 'success',
              title: 'Image Updated',
              text: 'Your profile image has been successfully updated!',
              timer: 3000,
              toast: true,
              position: 'center',
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to update the image.',
            });
          }
        } catch (error) {
          console.error('Image upload error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while updating the image.',
          });
        }
      }
    }
  };
  
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const formData = new FormData();
    // formData.append("_method", "PUT");
    formData.append("fullname", values.name || "");
    formData.append("phone", values.contact || "");
    // formData.append("old_password", values.oldPassword || "");
    // formData.append("new_password", values.newPassword || "");
    // formData.append("confirm_password", values.confirmPassword || "");

    // Check if a new image was uploaded
    if (fileList.length && fileList[0].originFileObj) {
      const imageFile = fileList[0].originFileObj as File;
      formData.append("avatar", imageFile, imageFile.name);
    }

    try {
      const response = await updatePersonalInformation(formData);
      console.log("formdata", response);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Profile and image updated successfully!',
        timer: 3000,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
      });

      // If the personal information update is successful, update the image as well.
      if (response.status) {
        // Perform image update only if a new image was selected
        if (fileList.length && fileList[0].originFileObj) {
          const imageFile = fileList[0].originFileObj as File;
          const imageData = new FormData();
          imageData.append('image', imageFile, imageFile.name);

          // Update the image via the updateImage mutation
          await updateImage(imageData);
          message.success("Profile and image updated successfully");
        }  
      }

      console.log("FormData content:", Array.from(formData.entries()));
    } catch (error) {
      message.error("Failed to update profile");
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='border border-gray-200 h-[80vh] py-12 rounded-2xl flex flex-col items-center'>
      <div className='flex justify-center mb-6'>
        <ImgCrop rotationSlider>
          <Upload

            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </ImgCrop>
      </div>
      <Form
        name="basic"
        form={form}
        layout="vertical"
        style={{ width: '100%', maxWidth: '800px', marginTop: "50px" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="name"
          label="Name"
          rules={[{ required: false, message: 'Please input your name!' }]}
        >
          <Input placeholder="Name" className='h-12' />
        </Form.Item>
        <Form.Item<FieldType>
          name="email"
          label="Email"
          rules={[{ required: false, message: 'Please input your name!' }]}
        >
          <Input placeholder="Name" className='h-12' />
        </Form.Item>
        <Form.Item<FieldType>
          name="contact"
          label="contact"
          rules={[{ required: false, message: 'Please input your name!' }]}
        >
          <Input placeholder="Contact no" className='h-12' />
        </Form.Item>
        
        {/* <Form.Item<FieldType>
          name="oldPassword"
          label="Old Password"
          rules={[{ required: true, message: 'Please input your old password!' }]}
        >
          <Input.Password
            placeholder='Old Password'
            className='h-12'
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="newPassword"
          label="New Password"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password
            placeholder='New Password'
            className='h-12'
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="confirmPassword"
          label="Confirm Password"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password
            placeholder='Confirm Password'
            className='h-12'
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" className='w-full h-12 bg-[#4964C6]' htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingsPersonalInformation;
