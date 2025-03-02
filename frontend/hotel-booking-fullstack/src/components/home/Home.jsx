import React from "react";
import MainHeader from "../layout/MainHeader";
import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const message = location.state?.message;
  const currentUser = localStorage.getItem("userEmail");

  return (
    <section>
      {message && <p className="text-warning text-center">{message}</p>}
      {currentUser && (
        <h6 className="text-success text-center">
          You are logged in as - {currentUser}
        </h6>
      )}
      <MainHeader />

      <section className="container">
        <RoomSearch />
        <HotelService />
        <RoomCarousel />
        <Parallax />
      </section>
    </section>
  );
};

export default Home;
