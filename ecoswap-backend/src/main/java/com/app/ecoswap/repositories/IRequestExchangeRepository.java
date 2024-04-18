package com.app.ecoswap.repositories;

import com.app.ecoswap.models.Product;
import com.app.ecoswap.models.RequestExchange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRequestExchangeRepository extends JpaRepository<RequestExchange, Long> {

    List<RequestExchange> findByProductTo(Product product);
    Long countByStatus(String status);
}
