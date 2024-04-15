package com.app.ecoswap.services;

import com.app.ecoswap.models.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();

    Product getProductById(Long id);

    Product createProduct(Product productRequest, MultipartFile image);

    Product updateProductById(Long id, Product productRequest);

    String deleteProduct(Long id);
}
