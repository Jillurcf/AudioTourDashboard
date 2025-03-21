import React from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Images/Logo.png";
import Swal from "sweetalert2";
import { usePostChangePasswordMutation } from "../redux/features/postChangePassword";

interface SetNewPasswordFormValues {
  password: string;
  passwordConfirmation: string;
  
}

const SetNewPassword: React.FC = () => {
  const navigate = useNavigate();
  // const [setSetPassword, { isLoading: setPasswordLoading }] =
  //   usePostSetPasswordMutation();
  const [postChangePassword, { isSuccess, isLoading: isPasswordChanging }] = usePostChangePasswordMutation();

  const onFinish = async (values: SetNewPasswordFormValues) => {
    try {
      console.log("Received values of form:", values);

      if (values.password !== values.passwordConfirmation) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Passwords do not match.",
        });
        return;
      }

      const data = {
      
        password: values.password,
        password_confirmation: values.passwordConfirmation,
      };
      console.log("Data to send:", data);

      const response = await postChangePassword(data).unwrap();
      console.log("API response:", response);

      if (response?.success === true) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/auth/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.message || "Validation Error.",
        });
      }
    } catch (error: any) {
      console.error("Error response:", error);

      const errorMessage =
        error?.data?.message || "An error occurred. Please try again.";
      const validationErrors = error?.data?.data;

      let formattedError = errorMessage;
      if (validationErrors) {
        formattedError += Object.entries(validationErrors)
          .map(([field, messages]) => `\n${field}: ${messages.join(", ")}`)
          .join("\n");
      }

      Swal.fire({
        icon: "error",
        title: "Error...",
        text: formattedError,
      });
    }
  };

  return (
    <AuthWrapper>
      <div className="text-center mb-12">
        <div className="flex py-8">
          <div className="flex items-center mx-auto gap-2">
            <img src={logo} alt="Logo" className="w-40" />
          
          </div>
        </div>
        <p>
          Create a new password. Ensure it differs from previous ones for
          security.
        </p>
      </div>
      <Form<SetNewPasswordFormValues> layout="vertical" onFinish={onFinish}>
        
        <Form.Item
          label="New password"
          name="password"
          rules={[
            { required: true, message: "Please enter your new password" },
          ]}
        >
          <Input.Password
            placeholder="Write new password"
            style={{ height: "50px" }}
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="passwordConfirmation"
          rules={[{ required: true, message: "Please confirm your password" }]}
        >
          <Input.Password
            placeholder="Write confirm password"
            style={{ height: "50px" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-[#4964C6] h-12 text-white text-lg w-full mt-6"
            htmlType="submit"
            loading={isPasswordChanging}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default SetNewPassword;
