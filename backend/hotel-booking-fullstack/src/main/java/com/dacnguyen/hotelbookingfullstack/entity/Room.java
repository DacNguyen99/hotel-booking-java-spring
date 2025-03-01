package com.dacnguyen.hotelbookingfullstack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String type;

    private BigDecimal price;

    private boolean available = true;

    @Lob
    private Blob photo;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookedRoom> bookedRooms;

    // create a new list of bookings when create a new instance to avoid null pointer
    public Room() {
        this.bookedRooms = new ArrayList<>();
    }

    // create a convenient method to handle new booking
    public void addBooking(BookedRoom booking) {
        if (this.bookedRooms == null) {
            this.bookedRooms = new ArrayList<>();
        }

        this.bookedRooms.add(booking);
        booking.setRoom(this);
        this.available = false;
        String bookingCode = UUID.randomUUID().toString();
        booking.setBookingConfirmationCode(bookingCode);
    }

    @Override
    public String toString() {
        return "Room{" +
                "available=" + available +
                ", price=" + price +
                ", type='" + type + '\'' +
                ", id=" + id +
                '}';
    }
}
