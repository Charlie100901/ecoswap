package com.app.ecoswap.controllers;

import com.app.ecoswap.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/statistic")
    public ResponseEntity<?> getStatistic(){
        return ResponseEntity.status(HttpStatus.OK).body(adminService.getStatisticAdmin());
    }

}
