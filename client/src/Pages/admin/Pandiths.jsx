import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { changeAccountStatus, getAllPandith } from "../../api/api";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/spinnerSlice";
import toast from "react-hot-toast";

const Pandiths = () => {
  const [pandiths, setPandiths] = useState([]);
  const dispatch = useDispatch();

  //Fetch all pandiths req
  const fetchAllPandiths = async () => {
    try {
      dispatch(showLoading());
      const res = await getAllPandith();
      dispatch(hideLoading());

      if (res.success) {
        setPandiths(res.data);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  //Change Pandith account status
  const handleAccountStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const res = await changeAccountStatus(record._id, status);
      toast.success(res.message);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllPandiths();
  }, []);

  //Antd Table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Exp",
      dataIndex: "experience",
    },
    {
      title: "Fees",
      dataIndex: "feePerConsultation",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Apv.
            </button>
          ) : (
            <button className="btn btn-danger">Rej.</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="table-responsive">
        <h1>Pooja pandith</h1>
        <Table
          dataSource={pandiths}
          columns={columns}
          rowKey={(record) => record._id}
          scroll={{ x: "max-content" }}
        />
      </div>
    </Layout>
  );
};

export default Pandiths;
