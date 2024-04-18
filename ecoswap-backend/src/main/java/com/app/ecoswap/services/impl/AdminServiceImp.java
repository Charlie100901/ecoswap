package com.app.ecoswap.services.impl;

import com.app.ecoswap.repositories.IProductRepository;
import com.app.ecoswap.repositories.IRequestExchangeRepository;
import com.app.ecoswap.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminServiceImp {

    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRequestExchangeRepository requestExchangeRepository;

    public Map<String, Long> getStaticAdmin(){
        Map<String, Long> data = new HashMap<>();
        Long productsCount = productRepository.count();
        Long usersCount = userRepository.count();
        Long countRequestExchangeCompleted = requestExchangeRepository.countByStatus("completada");
        data.put("productsCount", productsCount);
        data.put("usersCount", usersCount);
        data.put("countRequestExchangeCompleted", countRequestExchangeCompleted);
        return data;
    }
}
