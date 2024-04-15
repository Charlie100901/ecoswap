package com.app.ecoswap.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

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
    @JoinColumn(name = "id_user_from")
    private User userFrom;

    @ManyToOne
    @JoinColumn(name = "id_user_to")
    private User userTo;

    @ManyToOne
    @JoinColumn(name = "id_product_from")
    private Product productFrom;

    @ManyToOne
    @JoinColumn(name = "id_product_to")
    private Product productTo;

    @Column
    private String status;

    @Column
    private LocalDate date;



}
