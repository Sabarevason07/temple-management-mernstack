import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/yoga-register.webp";
import toast from "react-hot-toast";
import { loginUser } from "../api/api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import "./LoginPage.css"; // Import your custom CSS file

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form submit (Login)
  const onFinish = async (values) => {
    const email = values.email;
    const password = values.password;
    const data = { email, password };

    try {
      dispatch(showLoading());
      const { token } = await loginUser(data);
      dispatch(hideLoading());
      localStorage.setItem("token", token);
      toast.success("Login Success!");
      navigate("/");
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  // Password Validation
  const validatePassword = async (rule, value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject(
        "Password must contain at least 6 characters, including one uppercase letter, one lowercase letter, and one number."
      );
    }
  };

  return (
    <>
      <div className="container-fluid login-container">
        <div className="row">
          <div className="col-md-6 order-md-2 login-image">
            {/* Placeholder for any other image or background */}
          </div>
          <div className="col-md-6 order-md-1 d-flex align-items-center">
            <div className="container mt-5">
              <Form
                name="login-form"
                onFinish={onFinish}
                layout="vertical"
                className="form" // Updated class name
              >
                <h2 className="text-center fw-medium display-5 mb-3 montserrat" id="login-lable">
                  Login Form
                </h2>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Please enter a valid email!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input className="form-content" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      validator: validatePassword,
                    },
                  ]}
                >
                  <Input.Password className="form-content" />
                </Form.Item>

                <Form.Item>
                  <Button
                    className="w-100 btn-primary login-button"
                    type="primary"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
<br></br>
              <div className="text-center mt-3 mb-2">
                Don't have an account?{" "}
                <Link to="/register" className="text-success fw-medium">
                  Register Here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
