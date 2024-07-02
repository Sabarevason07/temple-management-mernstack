import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/spinnerSlice";
import { getAllUser } from "../../api/api"; // Adjust this import based on your API structure

const Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.users);

  // Fetch All Users
  const fetchAllUsers = async () => {
    try {
      dispatch(showLoading());
      const res = await getAllUser(); // Call the correct API function here
      dispatch(hideLoading());

      if (res.success) {
        dispatch(setUsers(res.data)); // Update state with fetched users
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Handle block user action
  const handleBlockUser = (userId) => {
    // Implement blocking logic here
    console.log(`Blocking user with ID: ${userId}`);
  };

  // antd table column
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Pandith",
      dataIndex: "isPandith",
      render: (text, record) => <span>{record.isPandith ? "Yes" : "No"}</span>,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (userId) => (
        <div className="d-flex">
          <button className="btn btn-danger" onClick={() => handleBlockUser(userId)}>
            Block
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="table-responsive">
        <h1 className="mb-4 text-center mt-2">Devotees List</h1>
        <Table
          dataSource={users}
          columns={columns}
          rowKey={(record) => record._id}
          scroll={{ x: "max-content" }}
        />
      </div>
    </Layout>
  );
};

export default Users;
