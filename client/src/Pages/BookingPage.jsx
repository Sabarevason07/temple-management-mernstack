import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  bookingPooja,
  bookingAvailability,
  getPandithById,
} from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import toast from "react-hot-toast";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";

const BookingPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [pandith, setPandith] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);

  //Fetching pandith
  const fetchPandithById = async () => {
    try {
      dispatch(showLoading());
      const response = await getPandithById({ pandithId: params.pandithId });
      dispatch(hideLoading());
      setPandith(response.data);
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  // Booking poojas
  const handleBooking = async () => {
    const data = {
      pandithId: params.pandithId,
      userId: user._id,
      pandithInfo: pandith,
      userInfo: user,
      date: date,
      time: time,
    };
    try {
      dispatch(showLoading());
      const res = await bookingPooja(data);
      dispatch(hideLoading());
      toast.success(res.message);
      navigate("/");
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  //
  const handleAvailability = async () => {
    const data = { pandithId: params.pandithId, date, time };
    try {
      dispatch(showLoading());
      const res = await bookingAvailability(data);
      console.log(res);
      dispatch(hideLoading());
      if (res.success) {
        setIsAvailable(true);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchPandithById();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <h1 className="text-center mb-5">Booking Page</h1>
        {pandith && (
          <div className="card w-100 mt-3">
            <div className="card-body">
              <h3 className="card-title text-center">
                 {pandith.firstName} {pandith.lastName}
              </h3>
              <p className="card-text">
                <b>Fees:</b> <i>₹ {pandith.feePerConsultation}</i>
              </p>
              <p className="card-text">
                <b>Experience:</b> <i>{pandith.experience} Years</i>
              </p>
              <p className="card-text">
                <b>Timings:</b>{" "}
                <i>
                  {pandith.timings?.[0]} - {pandith.timings?.[1]}
                </i>
              </p>
              <p className="card-text">
                <b>Specialization:</b> <i>{pandith.specialization}</i>
              </p>
              <div className="d-flex flex-column">
                <DatePicker
                  aria-required={"true"}
                  className="mb-2"
                  format={"DD-MM-YYYY"}
                  onChange={(value) => setDate(value.format("DD-MM-YYYY"))}
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                />

                <TimePicker
                  aria-required={"true"}
                  className="mb-2"
                  format={"HH:mm"}
                  onChange={(time) => setTime(time.format("HH:mm"))}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleAvailability}
                >
                  Check Availability
                </button>

                {isAvailable && (
                  <button
                    className="btn btn-success mt-2"
                    onClick={handleBooking}
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
