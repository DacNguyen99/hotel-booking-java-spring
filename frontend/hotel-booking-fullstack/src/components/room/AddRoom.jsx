import React, { useState } from "react";
import { addRoom } from "../utils/ApiFunction";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    type: "",
    price: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeHandler = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name == "price") {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(newRoom.photo, newRoom.type, newRoom.price);
      if (success !== undefined) {
        setSuccessMessage("A new room was added to DB!!!");
        setNewRoom({ photo: null, type: "", price: "" });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding a new room!?!");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <section className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-5 text-center">Add a new room</h2>
          {successMessage && (
            <div className="alert alert-success fade show">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="alert alert-danger fade show">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="type">
                Room Type
              </label>
              <div>
                <RoomTypeSelector
                  handleRoomTypeInputChange={onChangeHandler}
                  newRoom={newRoom}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="price">
                Room Price
              </label>
              <input
                className="form-control"
                required
                id="price"
                type="number"
                name="price"
                value={newRoom.price}
                onChange={onChangeHandler}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="photo">
                Room Photo
              </label>
              <input
                id="photo"
                name="photo"
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview Room Photo"
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                  className="mt-3"
                />
              )}
            </div>

            <div className="d-flex gap-2">
              <div className="mt-2">
                <Link className="btn btn-secondary ml-5" to={"/existing-rooms"}>
                  Back
                </Link>
              </div>

              <div className="mt-2">
                <button className="btn btn-primary ml-5">Save Room</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddRoom;
