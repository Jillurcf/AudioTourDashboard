import React, { useState, useEffect } from 'react';
import { Upload, Input, Button, Form, message } from 'antd';
import type { UploadFile, FormProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useGetPersonalInformationQuery } from '../redux/features/getPersonalInformationApi';
import { useUpdatePersonalInformationMutation } from '../redux/features/putUpdatePersonalInfromation';
import { useUpdateImageMutation } from '../redux/features/putUpdtaeImage';
import Swal from 'sweetalert2';
import { usePostChangePasswordMutation } from '../redux/features/postChangePassword';

type FileType = Exclude<Parameters<Upload['beforeUpload']>[0], undefined>;

interface FieldType {
  name?: string;
  email?: string;
  contact: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const SettingsChangePassword: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  // Fetch personal information data
  const { data, isLoading, isError } = useGetPersonalInformationQuery({});
  const [updateImage] = useUpdateImageMutation();
  const [postChangePassword, { isSuccess, isLoading: isPasswordChanging }] = usePostChangePasswordMutation();

  // Handle password change form submission
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const formData = new FormData();
    formData.append('password', values.newPassword || '');
    formData.append('password_confirmation', values.confirmPassword || '');

    try {
      const response = await postChangePassword(formData).unwrap();
      console.log('Password change response:', response);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password updated successfully!',
        timer: 3000,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
      });
    } catch (error) {
      message.error('Failed to update password');
    }
  };

  // Handle form submission failure
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // Handling file upload preview
  const handleFileChange = (file: UploadFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileList([file]);
    };
    reader.readAsDataURL(file.originFileObj as Blob);
  };

  return (
    <div className="border border-gray-200 h-[80vh] py-12 rounded-2xl flex flex-col items-center">
      <Form
        name="basic"
        form={form}
        layout="vertical"
        style={{ width: '100%', maxWidth: '800px', marginTop: '50px' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="newPassword"
          label="New Password"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password
            placeholder="New Password"
            className="h-12"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="confirmPassword"
          label="Confirm Password"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password
            placeholder="Confirm Password"
            className="h-12"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className="w-full h-12 bg-[#4964C6]"
            htmlType="submit"
            loading={isPasswordChanging}
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingsChangePassword;
