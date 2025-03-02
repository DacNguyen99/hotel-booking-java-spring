import React, { useState, useEffect } from "react";
import { getRoomTypes } from "../utils/ApiFunction";

const RoomTypeSelector = ({ handleRoomTypeInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([""]);
  const [showNewTypeInput, setShowNewTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleNewTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowNewTypeInput(false);
    }
  };

  return (
    <div>
      <select
        required
        id="type"
        name="type"
        value={newRoom.type}
        onChange={(e) => {
          if (e.target.value === "Add new type") {
            setShowNewTypeInput(true);
          } else {
            setShowNewTypeInput(false);
            handleRoomTypeInputChange(e);
          }
        }}
        className="form-select"
      >
        <option value="">Select a room type</option>
        <option value={"Add new type"}>Add new</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      {showNewTypeInput && (
        <div className="mt-2">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Enter a new room type"
              value={newRoomType}
              onChange={handleNewTypeInputChange}
            />
            <button
              className="btn btn-hotel"
              type="button"
              onClick={handleAddNewType}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomTypeSelector;
