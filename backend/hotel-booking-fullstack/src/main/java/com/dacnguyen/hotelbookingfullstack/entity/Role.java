package com.dacnguyen.hotelbookingfullstack.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @JsonIgnore // ignore or else create an infinite loop
    @ManyToMany(mappedBy = "roles", fetch = FetchType.EAGER)
    private Collection<User> users = new HashSet<>();

    public Role(String name) {
        this.name = name;
    }

    public void assignRoleToUser(User user) {
        // add role to user's role list and update that role's user list
        user.getRoles().add(this);
        this.users.add(user);
    }

    public void removeUserFromRole(User user) {
        user.getRoles().remove(this);
        this.users.remove(user);
    }

    public void removeAllUsersFromRole() {
        if (this.getUsers() != null) {
            List<User> usersToRemove = this.getUsers().stream().toList();
            usersToRemove.forEach(this::removeUserFromRole);
        }
    }

    // avoid null pointer
    public String getName() {
        return (name != null) ? name : "";
    }
}
