package com.dacnguyen.hotelbookingfullstack.controller;

import com.dacnguyen.hotelbookingfullstack.dto.response.RoomResponse;
import com.dacnguyen.hotelbookingfullstack.entity.Booking;
import com.dacnguyen.hotelbookingfullstack.entity.Room;
import com.dacnguyen.hotelbookingfullstack.exception.InternalServerException;
import com.dacnguyen.hotelbookingfullstack.exception.PhotoRetrievalException;
import com.dacnguyen.hotelbookingfullstack.service.RoomServiceInterface;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
@Slf4j
public class RoomController {

    private final RoomServiceInterface roomService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("type") String type,
            @RequestParam("price") BigDecimal price)
            throws SQLException, IOException {

        Room room = roomService.addNewRoom(photo, type, price);
        return ResponseEntity.ok(new RoomResponse(room.getId(), room.getType(), room.getPrice()));
    }

    @GetMapping("/types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    @GetMapping("/all")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();

        // map room to room response
        for (Room room : rooms) {
            // using mapper
            RoomResponse roomResponse = toRoomResponse(room);
            roomResponses.add(roomResponse);
        }
        return ResponseEntity.ok(roomResponses);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable long id,
                                                   @RequestParam(required = false) String roomType,
                                                   @RequestParam(required = false) BigDecimal roomPrice,
                                                   @RequestParam(required = false) MultipartFile roomPhoto)
            throws IOException, SQLException {

        byte[] photoBytes = (roomPhoto != null && !roomPhoto.isEmpty()) ?
                roomPhoto.getBytes() : roomService.getRoomPhotoById(id);
        Room room = roomService.updateRoom(id, roomType, roomPrice, photoBytes);
        RoomResponse roomResponse = toRoomResponse(room);
        return ResponseEntity.ok(roomResponse);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteRoom(@PathVariable long id) {
        roomService.deleteRoomById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable long id) {
        Optional<Room> roomOptional = roomService.getRoomById(id);
        return roomOptional.map(room -> {
            RoomResponse roomResponse = toRoomResponse(room);
            return ResponseEntity.ok(Optional.of(roomResponse));
        }).orElseThrow(() -> new InternalServerException("Room not found!!!"));
    }

    @GetMapping("/available")
    public ResponseEntity<List<RoomResponse>> getAvailableRooms(
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam("type") String roomType) throws SQLException {
        List<Room> availableRooms = roomService.getAvailableRooms(checkInDate, checkOutDate, roomType);
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room : availableRooms) {
            RoomResponse roomResponse = toRoomResponse(room);
            roomResponses.add(roomResponse);
        }

        if (roomResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(roomResponses);
        }
    }

    // mapper - Room to RoomResponse
    private RoomResponse toRoomResponse(Room room) {
        byte[] photoBytes = null;
        Blob photoBlob = room.getPhoto();
        if (photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetrievalException("Error retrieving photo!!!");
            }
        }

        return new RoomResponse(room.getId(),
                room.getType(),
                room.getPrice(),
                room.isAvailable(),
                photoBytes
        );
    }
}
