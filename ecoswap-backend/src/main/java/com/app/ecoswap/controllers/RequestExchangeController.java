package com.app.ecoswap.controllers;

import com.app.ecoswap.models.RequestExchange;
import com.app.ecoswap.services.impl.RequestExchangeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class RequestExchangeController {
    @Autowired
    private RequestExchangeServiceImp requestExchangeServiceImp;

    @GetMapping("/request-exchange")
    public ResponseEntity<List<RequestExchange>> getAllRequestExchange(){
        return ResponseEntity.status(HttpStatus.OK).body(requestExchangeServiceImp.getAllRequestExchange());
    }

    @GetMapping("/request-exchange/{id}")
    public ResponseEntity<RequestExchange> getRequestExchangeById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(requestExchangeServiceImp.getRequestExchangeById(id));
    }

    @PostMapping("/request-exchange/create")
    public ResponseEntity<RequestExchange> createRequestExchange(@RequestBody RequestExchange requestExchange){
        return ResponseEntity.status(HttpStatus.CREATED).body(requestExchangeServiceImp.createRequestExchange(requestExchange));
    }

    @DeleteMapping("/request-exchange/{id}")
    public ResponseEntity<String> deleteRequestExchange(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(requestExchangeServiceImp.deleteRequestExchange(id));
    }

}
