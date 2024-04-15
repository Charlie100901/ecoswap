package com.app.ecoswap.config;

import com.app.ecoswap.exceptions.EmailNotFoundException;
import com.app.ecoswap.models.Role;
import com.app.ecoswap.models.User;
import com.app.ecoswap.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private IUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByEmail(username).orElseThrow(() -> new EmailNotFoundException("Email no encontrado"));
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRoles().stream().map(Role::getName).toArray(String[]::new))
                .build();
    }
}
