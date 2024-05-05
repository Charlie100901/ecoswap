package com.app.ecoswap.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 60)
    @NotBlank
    private String name;
    @Column(nullable = false, unique = true, length = 255)
    @NotBlank
    private String email;
    @Column(nullable = false)
    @NotBlank
    @Size(min = 6)
    private String password;
    @Column(nullable = false, length = 70)
    @NotBlank
    private String address;
    @Column(nullable = false, name = "cellphone_number", length = 10)
    @NotNull
    private int cellphoneNumber;
    @ManyToMany
    @JoinTable(name = "role_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"),
            uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "role_id"})}
    )
    private List<Role> roles;


}
