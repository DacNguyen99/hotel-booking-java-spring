package com.dacnguyen.hotelbookingfullstack.service.implement;

import com.dacnguyen.hotelbookingfullstack.entity.Role;
import com.dacnguyen.hotelbookingfullstack.entity.User;
import com.dacnguyen.hotelbookingfullstack.exception.UserAlreadyExistsException;
import com.dacnguyen.hotelbookingfullstack.exception.UserNotFoundException;
import com.dacnguyen.hotelbookingfullstack.repository.RoleRepository;
import com.dacnguyen.hotelbookingfullstack.repository.UserRepository;
import com.dacnguyen.hotelbookingfullstack.service.UserServiceInterface;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserServiceInterface {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail() + " already exists ！");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role role = roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList(role));
        userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User user = getUser(email);
        if (user != null) {
            userRepository.deleteByEmail(email);
        }

    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFoundException("User not found!"));
    }
}
