package com.app.ecoswap.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "request_exchange")
public class RequestExchange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_product_from", nullable = false)
    private Product productFrom;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_product_to", nullable = false)
    private Product productTo;

    @Column(nullable = true, length = 15)
    private String status;

    @Column
    private LocalDate date;



}
