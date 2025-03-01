package com.dacnguyen.hotelbookingfullstack.repository;

import com.dacnguyen.hotelbookingfullstack.entity.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<BookedRoom, Long> {
    Optional<BookedRoom> findByBookingConfirmationCode(String bookingConfirmationCode);

    List<BookedRoom> findByGuestEmail(String email);
}
