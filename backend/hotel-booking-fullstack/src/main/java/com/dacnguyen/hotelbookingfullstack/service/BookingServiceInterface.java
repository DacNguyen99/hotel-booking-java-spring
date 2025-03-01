package com.dacnguyen.hotelbookingfullstack.service;

import com.dacnguyen.hotelbookingfullstack.entity.BookedRoom;

import java.util.List;

public interface BookingServiceInterface {
    void cancelBooking(long id);

    String saveBooking(long id, BookedRoom bookingRequest);

    List<BookedRoom> getAllBookings();

    BookedRoom findByConfirmationCode(String confirmationCode);

    List<BookedRoom> getBookingsByUserEmail(String email);
}
