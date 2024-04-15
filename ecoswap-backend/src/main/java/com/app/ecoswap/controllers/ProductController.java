package com.app.ecoswap.controllers;

import com.app.ecoswap.models.Product;
import com.app.ecoswap.services.impl.ProductServiceImp;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("api/v1")
public class ProductController {

    @Autowired
    private ProductServiceImp productServiceImp;

    @GetMapping("/products")
    public List<Product> getAllProducts(){
        return productServiceImp.getAllProducts();
    }

    @GetMapping("/product/{id}")
    public Product getProductById(@PathVariable Long id){
        return productServiceImp.getProductById(id);
    }

    @PostMapping("/product")
    public ResponseEntity<Product> createProduct(@Valid @ModelAttribute Product product, @RequestParam("file")MultipartFile image){
        Product productCreated = productServiceImp.createProduct(product, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(productCreated);
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<Product> updateProductById(@PathVariable Long id, @RequestBody Product productRequest){
        Product productUpdated = productServiceImp.updateProductById(id, productRequest);
        return ResponseEntity.status(HttpStatus.OK).body(productUpdated);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id){
        productServiceImp.deleteProduct(id);
        return ResponseEntity.status(HttpStatus.OK).body("Producto eliminado con exito");

    }

}
