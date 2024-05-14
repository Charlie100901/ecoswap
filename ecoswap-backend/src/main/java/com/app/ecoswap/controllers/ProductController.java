package com.app.ecoswap.controllers;

import com.app.ecoswap.models.Product;
import com.app.ecoswap.models.User;
import com.app.ecoswap.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/product/{id}")
    public Product getProductById(@PathVariable Long id){
        return productService.getProductById(id);
    }

    @GetMapping("/products/{category}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable String category){
        return ResponseEntity.ok(productService.getProductsByCategory(category));
    }

    @PostMapping("/products/find/user")
    public ResponseEntity<?> getProductsByUser(@RequestBody User user){
        return ResponseEntity.ok(productService.getProductsByUser(user));
    }

    @PostMapping("/product")
    public ResponseEntity<Product> createProduct(@Valid Product product, @RequestParam("file")MultipartFile image, @RequestHeader("Authorization")String token){
        Product productCreated = productService.createProduct(product, image, token);
        return ResponseEntity.status(HttpStatus.CREATED).body(productCreated);
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<Product> updateProductById(@PathVariable Long id,@Valid Product productRequest, @RequestParam("file")MultipartFile image, @RequestHeader("Authorization")String token) throws IOException {
        Product productUpdated = productService.updateProductById(id, productRequest, image, token);
        return ResponseEntity.status(HttpStatus.OK).body(productUpdated);
    }

    
    @DeleteMapping("/product/{id}")
    public ResponseEntity<Map<String,String>> deleteProduct(@PathVariable Long id, @RequestHeader("Authorization")String token){
        return ResponseEntity.status(HttpStatus.OK).body(productService.deleteProduct(id, token));

    }



}
