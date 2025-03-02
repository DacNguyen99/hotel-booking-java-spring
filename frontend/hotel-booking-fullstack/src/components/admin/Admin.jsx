import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-5">
      <h2>Welcome to Admin Panel</h2>
      <hr />
      <div className="d-flex justify-content-around">
        <div>
          <Link to={"/existing-rooms"} className="btn btn-primary">
            Manage Rooms
          </Link>
        </div>
        <div>
          <Link to={"/existing-bookings"} className="btn btn-success">
            Manage Bookings
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Admin;
