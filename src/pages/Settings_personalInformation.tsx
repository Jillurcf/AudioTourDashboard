
import React, { useEffect, useState } from 'react';
import { Upload, Input, Button, Form, message, Modal } from 'antd';
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
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [error, setError] = useState<string | null>(null);  
console.log("error+++++++++", error)
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
            name: data.data?.name || 'profile.png',
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

        // try {
        //   const response = await updateImage(formData); // Call the mutation
        //   console.log('Image upload response:', response);

        //   if (response) {
        //     Swal.fire({
        //       icon: 'success',
        //       title: 'Image Updated',
        //       text: 'Your profile image has been successfully updated!',
        //       timer: 3000,
        //       toast: true,
        //       position: 'center',
        //       showConfirmButton: false,
        //     });
        //   } else {
        //     Swal.fire({
        //       icon: 'error',
        //       title: 'Error',
        //       text: 'Failed to update the image.',
        //     });
        //   }
        // } catch (error) {
        //   console.error('Image upload error:', error);
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: 'An error occurred while updating the image.',
        //   });
        // }
      }
    }
  };

  // const onPreview = async (file: UploadFile) => {
  //   let src = file.url as string;
  //   if (!src) {
  //     src = await new Promise<string>((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj as FileType);
  //       reader.onload = () => resolve(reader.result as string);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };


  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;

    if (!src) {
      src = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    setPreviewImage(src);
    setIsPreviewVisible(true);
    setPreviewTitle(file.name || 'Image Preview');
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
      console.log("formdata", response?.error?.data?.message?.phone[0]);
      setError(response?.error?.data?.message?.phone[0]);
      if(response?.data.success === true){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Profile and image updated successfully!',
          timer: 3000,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
        });
      }
      // console.log("formdata", response?.data.success === true);
    
     

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
      console.log("Failed to update profile");
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
          rules={
            [
              { required: false, message: 'Please input your name!' },
              { max: 30, message: 'Text atmost 30 character' }

            ]}
        >
          <Input

            maxLength={30}
            minLength={6}
            placeholder="Name" className='h-12' />
        </Form.Item>
        <Form.Item<FieldType>
          name="email"
          label="Email"
          
        >
          <Input
            readOnly
            placeholder="Your email" className='h-12' />
            
        </Form.Item>
        <Form.Item<FieldType>
          name="contact"
          label="Phone number"
          
          rules={
            [
              { required: false, message: 'Please add contact' },
              { max: 14, message: 'Contact atmost 14 digit' },
              { min: 11, message: 'Contact minimum 11 digit' }

            ]}
        >
          <Input
          type='text'
            maxLength={14}
            minLength={11}

            placeholder="Your Contact" className='h-12' />
        </Form.Item>
        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}
        {/* <Form.Item<FieldType>

          name="contact"
          label="Contact"
          rules={[
            { required: false, message: 'Please input your name!' },
            { max: 14, message: 'Contack atmost 14 chaaracter' }
          ]}
        >
          <Input
            type='number'
            minLength={11}
            maxLength={14}
            placeholder="Contact no" className='h-12' />
        </Form.Item> */}


        <Form.Item>
          <Button type="primary" className='w-full h-12 bg-[#4964C6]' htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={isPreviewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setIsPreviewVisible(false)}
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>

    </div>
  );
};

export default SettingsPersonalInformation;
