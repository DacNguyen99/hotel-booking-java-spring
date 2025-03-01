package com.dacnguyen.hotelbookingfullstack.controller;

import com.dacnguyen.hotelbookingfullstack.entity.Role;
import com.dacnguyen.hotelbookingfullstack.entity.User;
import com.dacnguyen.hotelbookingfullstack.exception.RoleAlreadyExistsException;
import com.dacnguyen.hotelbookingfullstack.service.RoleServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/roles")
public class RoleController {

    private final RoleServiceInterface roleService;

    @GetMapping("/all")
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<>(roleService.getRoles(), HttpStatus.FOUND);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createRole(@RequestBody Role role) {
        try {
            roleService.createRole(role);
            return ResponseEntity.ok("Role created successfully!");
        } catch (RoleAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{roleId}")
    public ResponseEntity<String> deleteRole(@PathVariable long roleId) {
        roleService.deleteRole(roleId);
        return ResponseEntity.ok("Role deleted successfully!");
    }

    @PostMapping("/remove-all/{roleId}")
    public Role removeAllUsersFromRole(@PathVariable long roleId) {
        return roleService.removeAllUsersFromRole(roleId);
    }

    @PostMapping("/remove")
    public User removeUserFromRole(
            @RequestParam("userId") long userId,
            @RequestParam("roleId") long roleId) {
        return roleService.removeUserFromRole(userId, roleId);
    }

    @PostMapping("/assign")
    public User assignRoleToUser(
            @RequestParam("userId") long userId,
            @RequestParam("roleId") long roleId) {
        return roleService.assignRoleToUser(userId, roleId);
    }
}
