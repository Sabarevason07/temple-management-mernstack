import React, { useEffect, useState } from "react";
import { getAllApprovedPandiths } from "../api/api";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { Row } from "antd";
import PandithList from "../components/PandithList";

const Homepage = () => {
  const [pandiths, setPandiths] = useState([]);
  const dispatch = useDispatch();

  //Get all approved pandiths
  const fetchAllApprovedPandiths = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllApprovedPandiths();
      setPandiths(response.data);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllApprovedPandiths();
  }, []);
  return (
    <>
      <Layout>
        <h1 className="text-center mb-3">Available Pandithars</h1>
        <Row>
          {pandiths && pandiths.map((pandith) => <PandithList key={pandith._id} pandith={pandith} />)}
        </Row>
      </Layout>
    </>
  );
};

export default Homepage;
