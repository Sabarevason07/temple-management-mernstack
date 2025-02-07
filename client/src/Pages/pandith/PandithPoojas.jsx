import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/spinnerSlice";
import { getPandithPoojas, updatePoojaStatus } from "../../api/api";
import moment from "moment";
import { Table } from "antd";
import toast from "react-hot-toast";

const PandithPoojas = () => {
  const [poojas, setPoojas] = useState([]);
  const dispatch = useDispatch();

  // Fetch Pandith Poojas
  const fetchPandithPoojas = async () => {
    try {
      dispatch(showLoading());
      const res = await getPandithPoojas();
      setPoojas(res.data);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      toast.error("Failed to fetch pooja. Please try again later.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPandithPoojas();
  }, []);
  

  // Handle Pooja Booking Status
  const handleStatus = async (record, status) => {
    try {
      const poojasId = record._id;
      const data = { poojasId, status };
      dispatch(showLoading());
      const response = await updatePoojaStatus(data);
      if (response.success) {
        toast.success(response.message);
        fetchPandithPoojas();
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  // Antd table columns
  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => <span>{record.userInfo.email}</span>,
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
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
        {record.status === "pending" && (
          <div className="d-flex">
            <button
              className="btn btn-success mx-2"
              onClick={() => handleStatus(record, "approved")}
            >
              Approved
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleStatus(record, "rejected")}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    ),
  },
];

  return (
    <Layout>
      <div className="table-responsive">
        <h1 className="m-4 text-center">Pooja Bookings List</h1>
        <Table
          columns={columns}
          dataSource={poojas}
          rowKey={(record) => record._id}
          scroll={{ x: "max-content" }}
        />
      </div>
    </Layout>
  );
};

export default PandithPoojas;
