import React, { useEffect, useState } from "react";
import {
  deleteUser,
  getBookingsByUserEmail,
  getUser,
} from "../utils/ApiFunction";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Profile = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: [{ id: "", name: "" }],
  });

  const [bookings, setBookings] = useState([
    {
      bookingId: "",
      room: { id: "", type: "" },
      checkInDate: "",
      checkOutDate: "",
      bookingConfirmationCode: "",
    },
  ]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userEmail, token);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userEmail, token]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByUserEmail(userEmail, token);
        setBookings(response);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
        setErrorMessage(error.message);
      }
    };

    fetchBookings();
  }, [userEmail, token]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      await deleteUser(userEmail)
        .then((response) => {
          setMessage(response.data);
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userRole");
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          setErrorMessage(error.data);
        });
    }
  };

  return (
    <div className="container">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {message && <p className="text-danger">{message}</p>}
      {user ? (
        <div
          className="card p-5 mt-5"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <h3 className="card-title text-center">User Information</h3>
          <div className="card-body">
            <div className="col-md-10 mx-auto">
              <div className="card mb-5 shadow">
                <div className="row g-0">
                  <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <div>
                      <img
                        alt="Profile"
                        src="https://img.icons8.com/?size=100&id=JZ63JkSBTYMx&format=png&color=000000"
                        className="rounded-circle"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-9">
                    <div className="card-body">
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          ID:
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.id}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          First Name:
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.firstName}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Last Name:
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.lastName}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Email:
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.email}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Roles:
                        </label>
                        <div className="col-md-10">
                          <ul className="list-unstyled">
                            {user.roles.map((role) => (
                              <li key={role.id} className="card-text">
                                {role.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="card-title text-center mb-3">Booking History</h3>

              {bookings.length > 0 ? (
                <table className="table table-bordered table-hover shadow">
                  <thead>
                    <tr>
                      <th scope="col">Booking ID</th>
                      <th scope="col">Room ID</th>
                      <th scope="col">Room Type</th>
                      <th scope="col">Check In Date</th>
                      <th scope="col">Check Out Date</th>
                      <th scope="col">Confirmation Code</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr key={index}>
                        <td className="text-center">{booking.bookingId}</td>
                        <td className="text-center">{booking.room.id}</td>
                        <td>{booking.room.type}</td>
                        <td>
                          {moment(booking.checkInDate)
                            .subtract(1, "month")
                            .format("MMM Do, YYYY")}
                        </td>
                        <td>
                          {moment(booking.checkOutDate)
                            .subtract(1, "month")
                            .format("MMM Do, YYYY")}
                        </td>
                        <td>{booking.bookingConfirmationCode}</td>
                        <td className="text-success">On-going</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>You have not made any bookings yet.</p>
              )}

              <div className="d-flex justify-content-center mt-4">
                <div className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={handleDeleteAccount}
                  >
                    Close account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
