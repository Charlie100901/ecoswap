package com.app.ecoswap.controllers;

import com.app.ecoswap.models.User;
import com.app.ecoswap.services.impl.UserServiceImp;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api/v1/")
public class UserController {

    @Autowired
    private UserServiceImp userServiceImp;


    @GetMapping("/users")
    public List<User> getUsers(@RequestHeader("Authorization") String token){
        return userServiceImp.getUsers(token);
    }

    @GetMapping("user/{id}")
    public User getUserById(@PathVariable Long id, @RequestHeader("Authorization") String token)  {
        return userServiceImp.getUserById(id);
    }

    @PostMapping("user/create")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user){
        User userCreated = userServiceImp.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userCreated);
    }

    @PutMapping("user/{id}/update")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user){
        User userUpdated = userServiceImp.updateUserById(id, user);
        return ResponseEntity.status(HttpStatus.OK).body(userUpdated);
    }

    @DeleteMapping("user/{id}/delete")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        String response = userServiceImp.deleteUser(id);
        return ResponseEntity.ok(response);
    }
}
