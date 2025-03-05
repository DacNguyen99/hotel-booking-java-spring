package com.dacnguyen.hotelbookingfullstack.service;

import com.dacnguyen.hotelbookingfullstack.entity.Booking;

import java.util.List;

public interface BookingServiceInterface {
    void cancelBooking(long id);

    String saveBooking(long id, Booking bookingRequest);

    List<Booking> getAllBookings();

    Booking findByConfirmationCode(String confirmationCode);

    List<Booking> getBookingsByUserEmail(String email);
}
