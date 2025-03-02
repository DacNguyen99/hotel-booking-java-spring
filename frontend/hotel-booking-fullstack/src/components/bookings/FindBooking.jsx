import React, { useState } from "react";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunction";
import moment from "moment";
import { FaCopy } from "react-icons/fa";

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const [bookingInfo, setBookingInfo] = useState({
    bookingId: "",
    room: { id: "", type: "" },
    bookingConfirmationCode: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuests: "",
  });

  const clearBookingInfo = {
    bookingId: "",
    room: { id: "", type: "" },
    bookingConfirmationCode: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChildren: "",
    totalNumOfGuests: "",
  };

  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
    } catch (error) {
      setBookingInfo(clearBookingInfo);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError(error.response);
      }
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleBookingCancellation = async () => {
    try {
      await cancelBooking(bookingInfo.bookingId);
      setIsDeleted(true);
      setSuccessMessage("Booking has been cancelled successfully!");
      setBookingInfo(clearBookingInfo);
      setConfirmationCode("");
      setError("");
    } catch (error) {
      setError(error.message);
    }

    setTimeout(() => {
      setSuccessMessage("");
      setIsDeleted(false);
    }, 2000);
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h2>Find My Booking</h2>
        <form onSubmit={handleFormSubmit} className="col-md-6">
          <div className="input-group mb-3">
            <input
              className="form-control"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Enter your booking confirmation code"
            />

            <button className="btn btn-hotel input-group-text">
              Find Booking
            </button>
          </div>
        </form>

        {isLoading ? (
          <div>Finding your booking...</div>
        ) : error ? (
          <div className="text-danger">Error: {error}</div>
        ) : bookingInfo.bookingConfirmationCode ? (
          <div className="col-md-6 mt-4 mb-5">
            <h3 className="mb-3 text-center">Booking Information</h3>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Booking Confirmation Code
              </span>
              <input
                disabled
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={bookingInfo.bookingConfirmationCode}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Booking ID
              </span>
              <input
                disabled
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={bookingInfo.bookingId}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Room Number
              </span>
              <input
                disabled
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={bookingInfo.room.id}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Room Type
              </span>
              <input
                disabled
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={bookingInfo.room.type}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Check-in Date
              </span>
              <input
                disabled
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={moment(bookingInfo.checkInDate)
                  .subtract(1, "month")
                  .format("MMM Do, YYYY")}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Check-out Date
              </span>
              <input
                disabled
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={moment(bookingInfo.checkOutDate)
                  .subtract(1, "month")
                  .format("MMM Do, YYYY")}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Full Name
              </span>
              <input
                disabled
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={bookingInfo.guestFullName}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Email
              </span>
              <input
                disabled
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={bookingInfo.guestEmail}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Number of Adults
              </span>
              <input
                disabled
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={bookingInfo.numOfAdults}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Number of children
              </span>
              <input
                disabled
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={bookingInfo.numOfChildren}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Total Number of Guests
              </span>
              <input
                disabled
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={bookingInfo.totalNumOfGuests}
              />
            </div>

            {!isDeleted && (
              <button
                className="btn btn-danger mt-3"
                onClick={handleBookingCancellation}
              >
                Cancel Booking
              </button>
            )}
          </div>
        ) : (
          <div>
            Enter your booking confirmation code to find your booking !!!
          </div>
        )}

        {isDeleted && (
          <div className="alert alert-success mt-3 fade show" role="alert">
            {successMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default FindBooking;
