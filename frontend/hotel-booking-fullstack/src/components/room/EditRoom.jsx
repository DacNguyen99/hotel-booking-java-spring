import React, { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunction";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link, useParams } from "react-router-dom";

const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    type: "",
    price: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { roomId } = useParams();

  useEffect(() => {
    const getRoom = async () => {
      try {
        const room = await getRoomById(roomId);
        setRoom(room);
        setImagePreview(room.photo);
      } catch (error) {
        console.log(error);
      }
    };

    getRoom();
  }, [roomId]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateRoom(roomId, room);
      if (response.status === 200) {
        setSuccessMessage("Update room successfully!!!");
        const updatedRoom = await getRoomById(roomId);
        setRoom(updatedRoom);
        setImagePreview(updatedRoom.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating this room!?!");
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
          <h2 className="mt-5 mb-5 text-center">Update room</h2>
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
                  newRoom={room}
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
                value={room.price}
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
                <div className="mt-3 text-center">
                  <img
                    src={`data:image/png;base64, ${imagePreview}`}
                    alt="Preview Room Photo"
                    style={{
                      maxWidth: "400px",
                      maxHeight: "400px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="d-flex gap-2 justify-content-center">
              <div className="mt-2">
                <Link className="btn btn-info" to={"/existing-rooms"}>
                  Back
                </Link>
              </div>

              <div className="mt-2">
                <button className="btn btn-warning">Update Room</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditRoom;
