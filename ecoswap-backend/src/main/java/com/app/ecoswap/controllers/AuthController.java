package com.app.ecoswap.controllers;

import com.app.ecoswap.config.SessionTokenService;
import com.app.ecoswap.exceptions.UserNotFoundException;
import com.app.ecoswap.models.LoginForm;
import com.app.ecoswap.models.User;
import com.app.ecoswap.repositories.IUserRepository;
import com.app.ecoswap.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private SessionTokenService sessionTokenService;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm){
        User user = userRepository.findUserByEmail(loginForm.getEmail()).orElseThrow(()->new UserNotFoundException("Usuario no encontrado"));

        if (user != null && passwordEncoder.matches(loginForm.getPassword(), user.getPassword())) {
            String sessionToken = sessionTokenService.generateSessionToken(user.getEmail());
            Map<String, String> response = new HashMap<>();
            response.put("token", sessionToken);
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Credenciales invalidas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody User user){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(user));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization")String token){
        Map<String, String> response = new HashMap<>();
        sessionTokenService.deleteSessionToken(token);
        response.put("message", "Cierre de sesión exitoso");
        return ResponseEntity.ok(response);
    }


}
