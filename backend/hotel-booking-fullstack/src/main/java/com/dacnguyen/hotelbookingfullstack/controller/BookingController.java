package com.dacnguyen.hotelbookingfullstack.controller;

import com.dacnguyen.hotelbookingfullstack.dto.response.BookingResponse;
import com.dacnguyen.hotelbookingfullstack.dto.response.RoomResponse;
import com.dacnguyen.hotelbookingfullstack.entity.BookedRoom;
import com.dacnguyen.hotelbookingfullstack.entity.Room;
import com.dacnguyen.hotelbookingfullstack.exception.InvalidBookingRequestException;
import com.dacnguyen.hotelbookingfullstack.exception.ResourceNotFoundException;
import com.dacnguyen.hotelbookingfullstack.service.BookingServiceInterface;
import com.dacnguyen.hotelbookingfullstack.service.RoomServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookings")
public class BookingController {

    private final BookingServiceInterface bookingService;
    private final RoomServiceInterface roomService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<BookedRoom> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = toBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            BookedRoom booking = bookingService.findByConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = toBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/book/{id}")
    public ResponseEntity<?> saveBooking(@PathVariable long id, @RequestBody BookedRoom bookingRequest) {
        try {
            String confirmationCode = bookingService.saveBooking(id, bookingRequest);
            return ResponseEntity.ok(
                    "Room booked successfully! Your booking confirmation code is " + confirmationCode);
        } catch (InvalidBookingRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/cancel/{id}")
    public void cancelBooking(@PathVariable long id) {
        bookingService.cancelBooking(id);
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String email) {
        List<BookedRoom> bookings = bookingService.getBookingsByUserEmail(email);
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = toBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    // mapper
    private BookingResponse toBookingResponse(BookedRoom booking) {
        Room room = roomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponse roomResponse = new RoomResponse(room.getId(), room.getType(), room.getPrice());
        return new BookingResponse(
                booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getGuestFullName(),
                booking.getGuestEmail(),
                booking.getNumOfAdults(),
                booking.getNumOfChildren(),
                booking.getTotalNumOfGuests(),
                booking.getBookingConfirmationCode(),
                roomResponse
        );
    }
}
