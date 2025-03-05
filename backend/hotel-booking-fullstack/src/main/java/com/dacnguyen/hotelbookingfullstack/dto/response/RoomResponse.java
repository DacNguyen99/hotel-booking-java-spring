package com.dacnguyen.hotelbookingfullstack.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;

@Data
@NoArgsConstructor
public class RoomResponse {

    private long id;

    private String type;

    private BigDecimal price;

    private boolean available;

    private String photo;

    private List<BookingResponse> bookings;

    public RoomResponse(long id, String type, BigDecimal price) {
        this.id = id;
        this.type = type;
        this.price = price;
    }

    public RoomResponse(long id, String type, BigDecimal price, boolean available,
                        byte[] photoBytes) {
        this.id = id;
        this.type = type;
        this.price = price;
        this.available = available;
        this.photo = photoBytes != null ? Base64.getEncoder().encodeToString(photoBytes) : null;
    }
}
