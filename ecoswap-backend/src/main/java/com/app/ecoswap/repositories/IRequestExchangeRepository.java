package com.app.ecoswap.repositories;

import com.app.ecoswap.models.RequestExchange;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRequestExchangeRepository extends JpaRepository<RequestExchange, Long> {
}
