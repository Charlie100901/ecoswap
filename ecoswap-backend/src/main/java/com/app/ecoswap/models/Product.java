package com.app.ecoswap.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 20)
    private String title;
    @Column(nullable = false, length = 70)
    private String description;
    @Column(nullable = false, length = 20)
    private String category;
    @Column(nullable = true, length = 10)
    private String productStatus;
    @Column(nullable = true, length = 10)
    private String conditionProduct;
    @Column(nullable = true, length = 255)
    private String imageProduct;

    @Column(nullable = true)
    private LocalDate releaseDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private User user;





}
