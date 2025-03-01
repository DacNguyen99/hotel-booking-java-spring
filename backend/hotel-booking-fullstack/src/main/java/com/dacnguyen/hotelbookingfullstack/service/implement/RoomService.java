package com.dacnguyen.hotelbookingfullstack.service.implement;

import com.dacnguyen.hotelbookingfullstack.entity.Room;
import com.dacnguyen.hotelbookingfullstack.exception.InternalServerException;
import com.dacnguyen.hotelbookingfullstack.exception.ResourceNotFoundException;
import com.dacnguyen.hotelbookingfullstack.repository.RoomRepository;
import com.dacnguyen.hotelbookingfullstack.service.RoomServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RoomService implements RoomServiceInterface {

    private final RoomRepository roomRepository;

    @Override
    public Room addNewRoom(MultipartFile photo, String type, BigDecimal price)
            throws SQLException, IOException {
        Room room = new Room();
        room.setPrice(price);
        room.setType(type);
        if (!photo.isEmpty()) {
            byte[] photoBytes = photo.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
        }

        return roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoById(long id) throws SQLException {
        Optional<Room> roomOptional = roomRepository.findById(id);
        if (roomOptional.isEmpty()) {
            throw new ResourceNotFoundException("Sorry, Room not found!");
        }
        Blob photoBlob = roomOptional.get().getPhoto();
        if (photoBlob != null) {
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }
        return null;
    }

    @Override
    public void deleteRoomById(long id) {
        Optional<Room> roomOptional = roomRepository.findById(id);
        if (roomOptional.isPresent()) {
            roomRepository.deleteById(id);
        }
    }

    @Override
    public Room updateRoom(long id, String roomType, BigDecimal roomPrice, byte[] photoBytes) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sorry, Room not found!"));
        if (roomType != null) room.setType(roomType);
        if (roomPrice != null) room.setPrice(roomPrice);
        if (photoBytes != null && photoBytes.length > 0) {
            try {
                room.setPhoto(new SerialBlob(photoBytes));
            } catch (SQLException e) {
                throw new InternalServerException("Error Updating Room!!!");
            }
        }
        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> getRoomById(long id) {
        return roomRepository.findById(id);
    }

    @Override
    public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        return roomRepository.findAvailableRoomsByDatesAndType(checkInDate, checkOutDate, roomType);
    }
}
