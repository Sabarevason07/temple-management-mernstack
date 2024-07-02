import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { submitDonation } from "../api/api";
import './donation.css';
import Layout from "../components/Layout";

const DonationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      await submitDonation(values);
      dispatch(hideLoading());
      toast.success("Donation submitted successfully!");
      navigate("/");
    } catch (err) {
      dispatch(hideLoading());
      toast.error("Failed to submit donation. Please try again.");
    }
  };

  return (
    <Layout>
    <Form name="donation-form" layout="vertical" onFinish={onFinish} className="donation-form">
      <h3 className="mb-2 text-secondary">Donation Information:</h3>
      <Row gutter={16}>
        <Col span={12} xs={24} sm={24} lg={12}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
        </Col>

        <Col span={12} xs={24} sm={24} lg={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
        </Col>

        <Col span={12} xs={24} sm={24} lg={12}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter the amount!" }]}
          >
            <Input type="number" placeholder="Enter donation amount" />
          </Form.Item>
        </Col>

        <Col span={12} xs={24} sm={24} lg={12}>
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: false }]}
          >
            <Input.TextArea placeholder="Enter your message" rows={4} />
          </Form.Item>
        </Col>
      </Row>

      <div className="text-center mt-4">
        <Button type="primary" htmlType="submit">
          Submit Donation
        </Button>
      </div>
    </Form>
    </Layout>
  );
};

export default DonationForm;
