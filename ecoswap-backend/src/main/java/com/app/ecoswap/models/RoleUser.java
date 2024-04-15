package com.app.ecoswap.models;

import jakarta.persistence.*;

@Entity
@Table(name = "role_user")
public class RoleUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User idUser;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role idRole;

}
