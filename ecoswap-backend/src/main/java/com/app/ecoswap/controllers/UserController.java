package com.app.ecoswap.controllers;

import com.app.ecoswap.models.User;
import com.app.ecoswap.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Validated
@RestController
@RequestMapping("/api/v1/")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/users")
    public List<User> getUsers(@RequestHeader("Authorization") String token){
        return userService.getUsers(token);
    }

    @GetMapping("user/{id}")
    public User getUserById(@PathVariable Long id, @RequestHeader("Authorization") String token)  {
        return userService.getUserById(id, token);
    }

    @PostMapping("user/create")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user){
        User userCreated = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userCreated);
    }

    @PutMapping("user/{id}/update")
    public ResponseEntity<User> updateUser(@PathVariable Long id,@Valid @RequestBody User user, @RequestHeader("Authorization") String token){
        User userUpdated = userService.updateUserById(id, user, token);
        return ResponseEntity.status(HttpStatus.OK).body(userUpdated);
    }

    @DeleteMapping("user/{id}/delete")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id, @RequestHeader("Authorization") String token){
        return ResponseEntity.ok(userService.deleteUser(id, token));
    }
}
