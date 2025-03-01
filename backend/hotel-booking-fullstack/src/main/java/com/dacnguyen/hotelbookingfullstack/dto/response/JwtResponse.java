package com.dacnguyen.hotelbookingfullstack.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class JwtResponse {

    private long id;

    private String email;

    private String jwt;

    private String type = "Bearer";

    List<String> roles;

    public JwtResponse(long id, String email, String jwt, List<String> roles) {
        this.id = id;
        this.email = email;
        this.jwt = jwt;
        this.roles = roles;
    }
}
