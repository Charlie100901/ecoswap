package com.app.ecoswap.repositories;

import com.app.ecoswap.models.Product;
import com.app.ecoswap.models.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(String category);
    List<Product> findByUser(User user);
}
