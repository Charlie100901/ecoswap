package com.app.ecoswap.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


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
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String category;
    @Column(nullable = false)
    private String productStatus;
    @Column(nullable = false)
    private String conditionProduct;
    @Column(nullable = true)
    private String imageProduct;

    @ManyToOne(targetEntity = User.class, cascade = CascadeType.REMOVE, optional = false)
    private User user;

    @OneToMany(mappedBy = "productFrom")
    private List<RequestExchange> requestsFrom;

    @OneToMany(mappedBy = "productTo")
    private List<RequestExchange> requestsTo;







    
}
