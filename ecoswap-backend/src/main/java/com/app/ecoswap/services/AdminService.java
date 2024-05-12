package com.app.ecoswap.services;

import com.app.ecoswap.models.Product;
import com.app.ecoswap.repositories.IProductRepository;
import com.app.ecoswap.repositories.IRequestExchangeRepository;
import com.app.ecoswap.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRequestExchangeRepository requestExchangeRepository;

    public Map<String, Long> getStatisticAdmin(){
        Map<String, Long> data = new HashMap<>();
        Long productsCount = productRepository.count();
        Long usersCount = userRepository.count();
        Long countRequestExchangeCompleted = requestExchangeRepository.countByStatus("completada");
        data.put("productsCount", productsCount);
        data.put("usersCount", usersCount);
        data.put("countRequestExchangeCompleted", countRequestExchangeCompleted);
        return data;
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

}
