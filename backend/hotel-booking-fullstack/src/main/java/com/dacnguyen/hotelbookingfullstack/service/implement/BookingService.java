package com.dacnguyen.hotelbookingfullstack.service.implement;

import com.dacnguyen.hotelbookingfullstack.entity.Booking;
import com.dacnguyen.hotelbookingfullstack.entity.Room;
import com.dacnguyen.hotelbookingfullstack.exception.InvalidBookingRequestException;
import com.dacnguyen.hotelbookingfullstack.exception.ResourceNotFoundException;
import com.dacnguyen.hotelbookingfullstack.repository.BookingRepository;
import com.dacnguyen.hotelbookingfullstack.service.BookingServiceInterface;
import com.dacnguyen.hotelbookingfullstack.service.RoomServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService implements BookingServiceInterface {

    private final BookingRepository bookingRepository;
    private final RoomServiceInterface roomService;

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public void cancelBooking(long id) {
        bookingRepository.deleteById(id);
    }

    @Override
    public String saveBooking(long id, Booking bookingRequest) {
         if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
             throw new InvalidBookingRequestException("Check-in date must come before check-out date!!!");
         }

         Room room = roomService.getRoomById(id).get();
         List<Booking> bookingHistory = room.getBookings();
         boolean isAvailable = checkAvailable(bookingRequest, bookingHistory);
         if (isAvailable) {
             room.addBooking(bookingRequest);
             bookingRepository.save(bookingRequest);
         } else {
             throw new InvalidBookingRequestException(
                     "Sorry, this room is not available for these selected dates!!!");
         }

         return bookingRequest.getBookingConfirmationCode();
    }

    @Override
    public Booking findByConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode).orElseThrow(()
                -> new ResourceNotFoundException(
                        "There is no booking with this confirmation code or has been cancelled!"));
    }

    @Override
    public List<Booking> getBookingsByUserEmail(String email) {
        return bookingRepository.findByGuestEmail(email);
    }

    private boolean checkAvailable(Booking bookingRequest, List<Booking> bookingHistory) {
        return bookingHistory.stream().noneMatch(existingBooking ->
                bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()) &&
                        bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckInDate())
        );
    }
}
