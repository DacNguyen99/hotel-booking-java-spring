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
    private List<Booking> bookings;

    // create a new list of bookings when create a new instance to avoid null pointer
    public Room() {
        this.bookings = new ArrayList<>();
    }

    // create a convenient method to handle a new booking
    public void addBooking(Booking booking) {
        if (this.bookings == null) {
            this.bookings = new ArrayList<>();
        }

        this.bookings.add(booking);
        booking.setRoom(this);
        this.available = false;

        // create booking confirmation code using UUID and set it
        booking.setBookingConfirmationCode(UUID.randomUUID().toString());
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
