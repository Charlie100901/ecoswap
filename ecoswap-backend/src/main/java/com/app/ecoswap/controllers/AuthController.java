package com.app.ecoswap.controllers;

import com.app.ecoswap.config.SessionTokenService;
import com.app.ecoswap.exceptions.UserNotFoundException;
import com.app.ecoswap.models.LoginForm;
import com.app.ecoswap.models.User;
import com.app.ecoswap.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private SessionTokenService sessionTokenService;
    @Autowired
    private IUserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm){
        User user = userRepository.findUserByEmail(loginForm.getEmail()).orElseThrow(()->new UserNotFoundException("Usuario no encontrado"));
        if (user != null && user.getPassword().equals(loginForm.getPassword())) {
            String sessionToken = sessionTokenService.generateSessionToken(user.getEmail());
            return ResponseEntity.ok(sessionToken);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    @PostMapping("/register")
    public String register(){
        return "register";
    }

}
