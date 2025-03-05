package com.dacnguyen.hotelbookingfullstack.repository;

import com.dacnguyen.hotelbookingfullstack.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT DISTINCT r.type FROM Room r")
    List<String> findDistinctRoomTypes();

    @Query(" SELECT r FROM Room r " +
            " WHERE r.type LIKE %:roomType% " +
            " AND r.id NOT IN (" +
            "  SELECT bk.room.id FROM Booking bk " +
            "  WHERE ((bk.checkInDate <= :checkOutDate) AND (bk.checkOutDate >= :checkInDate))" +
            ")")
    List<Room> findAvailableRoomsByDatesAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);
}
