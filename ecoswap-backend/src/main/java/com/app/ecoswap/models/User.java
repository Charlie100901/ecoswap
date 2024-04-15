package com.app.ecoswap.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @Column(nullable = false)
    @NotBlank
    private String name;
    @Column(nullable = false, unique = true)
    @NotBlank
    private String email;
    @Column(nullable = false)
    @NotBlank
    private String password;
    @Column(nullable = false)
    @NotBlank
    private String address;
    @Column(nullable = false, name = "cellphone_number")
    @NotNull
    private int cellphoneNumber;
    @ManyToMany
    @JoinTable(name = "role_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"),
            uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "role_id"})}
    )
    private List<Role> roles;

    @Transient
    private boolean admin;

    @OneToMany(mappedBy = "userFrom")
    private List<RequestExchange> requestSent;

    @OneToMany(mappedBy = "userTo")
    private List<RequestExchange> requestReceived;


}
