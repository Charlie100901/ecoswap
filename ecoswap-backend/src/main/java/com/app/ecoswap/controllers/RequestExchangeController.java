package com.app.ecoswap.controllers;

import com.app.ecoswap.models.RequestExchange;
import com.app.ecoswap.services.RequestExchangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class RequestExchangeController {
    @Autowired
    private RequestExchangeService requestExchangeService;

    @GetMapping("/request-exchange")
    public ResponseEntity<List<RequestExchange>> getAllRequestExchange(){
        return ResponseEntity.status(HttpStatus.OK).body(requestExchangeService.getAllRequestExchange());
    }

    @GetMapping("/request-exchange/{id}")
    public ResponseEntity<RequestExchange> getRequestExchangeById(@PathVariable Long id, @RequestHeader("Authorization")String token){
        return ResponseEntity.status(HttpStatus.OK).body(requestExchangeService.getRequestExchangeById(id, token));
    }

    @PostMapping("/request-exchange/create")
    public ResponseEntity<RequestExchange> createRequestExchange(@RequestBody RequestExchange requestExchange, @RequestHeader("Authorization")String token){
        return ResponseEntity.status(HttpStatus.CREATED).body(requestExchangeService.createRequestExchange(requestExchange, token));
    }

    
    @PostMapping("/select-request-exchange")
    public ResponseEntity<RequestExchange> selectExchangeRequest(@RequestBody RequestExchange requestExchange, @RequestHeader("Authorization")String token){
        return ResponseEntity.status(HttpStatus.OK).body(requestExchangeService.selectExchangeRequest(requestExchange, token));
    }
    
    // @DeleteMapping("/request-exchange/{id}")
    // public ResponseEntity<String> deleteRequestExchange(@PathVariable Long id, @RequestHeader("Authorization")String token){
    //     return ResponseEntity.status(HttpStatus.OK).body(requestExchangeService.deleteRequestExchange(id, token));
    // }

}
