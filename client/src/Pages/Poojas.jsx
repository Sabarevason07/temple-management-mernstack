import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getUserPoojas } from "../api/api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import moment from "moment";
import { Table } from "antd";

const Poojas = () => {
  const [poojas, setPoojas] = useState([]);
  const dispatch = useDispatch();

  // Fetch User Poojas
  const fetchUserPoojas = async () => {
    try {
      dispatch(showLoading());
      const res = await getUserPoojas();
      setPoojas(res.data);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    fetchUserPoojas();
  }, []);

  // Create antd table
  const columns = [
    {
      title: "Pandith Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.pandithInfo.firstName} {record.pandithInfo.lastName}
        </span>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      render: (text, record) => <span>{record.pandithInfo.department}</span>,
    },
    {
      title: "Experience",
      dataIndex: "experience",
      render: (text, record) => <span>{record.pandithInfo.experience}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{record.pandithInfo.phoneNumber}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <div className="table-responsive">
        <h1 className="m-4 text-center">Poojas List</h1>
        <Table
          className="mt-3"
          columns={columns}
          dataSource={poojas}
          rowKey={(record) => record._id}
          scroll={{ x: "max-content" }}
        />
      </div>
    </Layout>
  );
};

export default Poojas;
