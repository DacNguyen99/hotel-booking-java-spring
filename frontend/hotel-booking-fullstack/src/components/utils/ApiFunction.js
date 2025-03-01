import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export async function addRoom(photo, type, price) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("type", type);
  formData.append("price", price);

  const response = await api.post("/rooms/add", formData, {
    headers: getHeader(),
  });
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}

export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/types");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching room types");
  }
}

export async function getAllRooms() {
  try {
    const response = await api.get("/rooms/all");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching all rooms");
  }
}

export async function deleteRoom(roomId) {
  try {
    const response = await api.delete(`/rooms/delete/${roomId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting room - ${error.message}`);
  }
}

export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.type);
  formData.append("roomPrice", roomData.price);
  formData.append("roomPhoto", roomData.photo);
  const response = await api.put(`/rooms/update/${roomId}`, formData, {
    headers: getHeader(),
  });
  return response;
}

export async function getRoomById(roomId) {
  try {
    const response = await api.get(`/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching room - ${error.message}`);
  }
}

export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(`/bookings/book/${roomId}`, booking);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error booking room: ${error.message}`);
    }
  }
}

export async function getAllBookings() {
  try {
    const response = await api.get("/bookings/all", { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
}

export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const response = await api.get(
      `/bookings/confirmation/${confirmationCode}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error find booking: ${error.message}`);
    }
  }
}

export async function cancelBooking(bookingId) {
  try {
    const response = await api.delete(`/bookings/cancel/${bookingId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error cancelling booking: ${error.message}`);
  }
}

export async function getAvailableRooms(checkInDate, checkOutDate, type) {
  const result = await api.get(
    `rooms/available?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&type=${type}`
  );
  return result;
}

export async function registerUser(registration) {
  try {
    const response = await api.post("/auth/register", registration);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error registering: ${error.message}`);
    }
  }
}

export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserProfile(userId, token) {
  try {
    const response = await api.get(`/users/profile/${userId}`, {
      headers: getHeader(),
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching user profile: ${error.message}`);
  }
}

export async function deleteUser(userEmail) {
  try {
    const response = await api.delete(`/users/delete/${userEmail}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export async function getUser(userEmail, token) {
  try {
    const response = await api.get(`/users/${userEmail}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

export async function getBookingsByUserEmail(userEmail, token) {
  try {
    const response = await api.get(`/bookings/${userEmail}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching bookings: ${error.message}`);
    throw new Error("Failed to fetch bookings");
  }
}
