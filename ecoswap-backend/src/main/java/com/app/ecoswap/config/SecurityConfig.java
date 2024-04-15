package com.app.ecoswap.config;

import com.app.ecoswap.models.Role;
import com.app.ecoswap.models.RoleUser;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;



@Configuration
@EnableWebSecurity
public class SecurityConfig {

//    @Bean
//    public UserDetailsService users(){
//        UserDetails admin = User.builder()
//                .username("admin@gmail.com")
//                .password("admin")
//                .roles("ROLE_ADMIN")
//                .build();
//        UserDetails user = User.builder()
//                .username("user@gmail.com")
//                .password("user")
//                .roles("ROLE_USER")
//                .build();
//        return new InMemoryUserDetailsManager(admin, user);
//    }

//
//    @Bean
//    public PasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder();
//    }
//
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authRequest ->
                        authRequest
//                                .requestMatchers("/auth/**").permitAll()
//                                .requestMatchers("/api/v1/**").hasRole("ADMIN")
                                .anyRequest().permitAll()



                )
                .httpBasic(Customizer.withDefaults())
                .build();
    }




}
