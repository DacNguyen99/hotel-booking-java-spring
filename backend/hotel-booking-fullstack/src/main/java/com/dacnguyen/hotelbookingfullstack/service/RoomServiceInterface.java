package com.dacnguyen.hotelbookingfullstack.service;

import com.dacnguyen.hotelbookingfullstack.entity.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RoomServiceInterface {
    Room addNewRoom(MultipartFile photo, String type, BigDecimal price)
            throws SQLException, IOException;

    List<String> getAllRoomTypes();

    List<Room> getAllRooms();

    byte[] getRoomPhotoById(long id) throws SQLException;

    void deleteRoomById(long id);

    Room updateRoom(long id, String roomType, BigDecimal roomPrice, byte[] photoBytes);

    Optional<Room> getRoomById(long id);

    List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType);
}
