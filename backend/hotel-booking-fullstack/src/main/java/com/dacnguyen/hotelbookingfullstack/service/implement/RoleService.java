package com.dacnguyen.hotelbookingfullstack.service.implement;

import com.dacnguyen.hotelbookingfullstack.entity.Role;
import com.dacnguyen.hotelbookingfullstack.entity.User;
import com.dacnguyen.hotelbookingfullstack.exception.RoleAlreadyExistsException;
import com.dacnguyen.hotelbookingfullstack.exception.UserNotFoundException;
import com.dacnguyen.hotelbookingfullstack.repository.RoleRepository;
import com.dacnguyen.hotelbookingfullstack.repository.UserRepository;
import com.dacnguyen.hotelbookingfullstack.service.RoleServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService implements RoleServiceInterface {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role createRole(Role role) {
        String roleName = "ROLE_" + role.getName().toUpperCase();
        if (roleRepository.existsByName(roleName)) {
            throw new RoleAlreadyExistsException(role.getName() + " role already exists!");
        }
        role.setName(roleName);
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(long id) {
        // remove this role from all users having it before deleting it
        this.removeAllUsersFromRole(id);
        roleRepository.deleteById(id);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(long userId, long roleId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User not found!"));
        Role role = roleRepository.findById(roleId).orElseThrow(
                () -> new RuntimeException("Role not found!")
        );
        if (role.getUsers().contains(user)) {
            role.removeUserFromRole(user);
            roleRepository.save(role);
        }
        return user;
    }

    @Override
    public User assignRoleToUser(long userId, long roleId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User not found!"));
        Role role = roleRepository.findById(roleId).orElseThrow(
                () -> new RuntimeException("Role not found!")
        );
        if (user.getRoles().contains(role)) {
            throw new RuntimeException(
                    user.getFirstName() + " " + user.getLastName() + " is already assigned to" + role.getName()
            );
        }

        role.assignRoleToUser(user);
        roleRepository.save(role);
        return user;
    }

    @Override
    public Role removeAllUsersFromRole(long roleId) {
        Role role = roleRepository.findById(roleId).orElseThrow(
                () -> new RuntimeException("Role not found!")
        );
        role.removeAllUsersFromRole();
        return roleRepository.save(role);
    }
}
