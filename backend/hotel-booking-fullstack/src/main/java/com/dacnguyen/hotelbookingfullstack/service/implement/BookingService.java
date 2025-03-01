package com.dacnguyen.hotelbookingfullstack.service.implement;

import com.dacnguyen.hotelbookingfullstack.entity.BookedRoom;
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
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public void cancelBooking(long id) {
        bookingRepository.deleteById(id);
    }

    @Override
    public String saveBooking(long id, BookedRoom bookingRequest) {
         if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
             throw new InvalidBookingRequestException("Check-in date must come before check-out date!!!");
         }

         Room room = roomService.getRoomById(id).get();
         List<BookedRoom> bookingHistory = room.getBookedRooms();
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
    public BookedRoom findByConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode).orElseThrow(()
                -> new ResourceNotFoundException(
                        "There is no booking with this confirmation code or has been cancelled!"));
    }

    private boolean checkAvailable(BookedRoom bookingRequest, List<BookedRoom> bookingHistory) {
        return bookingHistory.stream()
                .noneMatch(existedBooking ->
                    bookingRequest.getCheckInDate().equals(existedBooking.getCheckInDate())
                        || bookingRequest.getCheckOutDate().isBefore(existedBooking.getCheckOutDate())
                        || (bookingRequest.getCheckInDate().isAfter(existedBooking.getCheckInDate())
                            && bookingRequest.getCheckOutDate().isBefore(existedBooking.getCheckOutDate()))

                        || (bookingRequest.getCheckInDate().isBefore(existedBooking.getCheckInDate())
                            && bookingRequest.getCheckOutDate().equals(existedBooking.getCheckOutDate()))

                        || (bookingRequest.getCheckInDate().isBefore(existedBooking.getCheckInDate())
                            && bookingRequest.getCheckOutDate().isAfter(existedBooking.getCheckOutDate()))

                        || (bookingRequest.getCheckInDate().equals(existedBooking.getCheckOutDate())
                            && bookingRequest.getCheckOutDate().equals(existedBooking.getCheckInDate()))

                        || (bookingRequest.getCheckInDate().equals(existedBooking.getCheckOutDate())
                            && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }

    @Override
    public List<BookedRoom> getBookingsByUserEmail(String email) {
        return bookingRepository.findByGuestEmail(email);
    }
}
