package com.dacnguyen.hotelbookingfullstack.service;

import com.dacnguyen.hotelbookingfullstack.entity.User;

import java.util.List;

public interface UserServiceInterface {
    void registerUser(User user);

    List<User> getUsers();

    void deleteUser(String email);

    User getUser(String email);
}
