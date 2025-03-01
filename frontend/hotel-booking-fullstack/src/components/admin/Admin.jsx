import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-5">
      <h2>Welcome to Admin Panel</h2>
      <hr />
      <div>
        <Link to={"/existing-rooms"}>Manage Rooms</Link>
      </div>
      <div>
        <Link to={"/existing-bookings"}>Manage Bookings</Link>
      </div>
    </section>
  );
};

export default Admin;
