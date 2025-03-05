package com.dacnguyen.hotelbookingfullstack.repository;

import com.dacnguyen.hotelbookingfullstack.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByBookingConfirmationCode(String bookingConfirmationCode);

    List<Booking> findByGuestEmail(String email);
}
