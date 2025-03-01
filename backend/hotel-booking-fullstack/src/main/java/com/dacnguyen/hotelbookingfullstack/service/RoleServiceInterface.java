package com.dacnguyen.hotelbookingfullstack.service;

import com.dacnguyen.hotelbookingfullstack.entity.Role;
import com.dacnguyen.hotelbookingfullstack.entity.User;

import java.util.List;

public interface RoleServiceInterface {

    List<Role> getRoles();

    Role createRole(Role role);

    void deleteRole(long id);

    Role findByName(String name);

    User removeUserFromRole(long userId, long roleId);

    User assignRoleToUser(long userId, long roleId);

    Role removeAllUsersFromRole(long roleId);
}
