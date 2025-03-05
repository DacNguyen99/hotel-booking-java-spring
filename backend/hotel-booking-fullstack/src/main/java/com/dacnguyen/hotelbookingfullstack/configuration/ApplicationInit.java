package com.dacnguyen.hotelbookingfullstack.configuration;

import com.dacnguyen.hotelbookingfullstack.entity.Role;
import com.dacnguyen.hotelbookingfullstack.entity.User;
import com.dacnguyen.hotelbookingfullstack.repository.RoleRepository;
import com.dacnguyen.hotelbookingfullstack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Optional;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class ApplicationInit {

    private final PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        return args -> {
            if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {

                // create role admin if not present
                if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
                    roleRepository.save(new Role("ROLE_ADMIN"));
                }

                Role adminRole = roleRepository.findByName("ROLE_ADMIN").get();
                User adminUser = new User();

                // assign role to user
                adminRole.assignRoleToUser(adminUser);
                adminUser.setFirstName("Admin");
                adminUser.setLastName("Admin");
                adminUser.setEmail("admin@gmail.com");
                adminUser.setPassword(passwordEncoder.encode("admin"));

                userRepository.save(adminUser);
                log.warn("Admin user created with default password: admin");
            }
        };
    }
}
