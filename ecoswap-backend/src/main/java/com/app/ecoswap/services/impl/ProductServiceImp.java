package com.app.ecoswap.services.impl;

import com.app.ecoswap.exceptions.FileFormatException;
import com.app.ecoswap.exceptions.GlobalException;
import com.app.ecoswap.exceptions.ProductNotFoundException;
import com.app.ecoswap.models.Product;
import com.app.ecoswap.repositories.IProductRepository;
import com.app.ecoswap.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductServiceImp implements ProductService {

    @Autowired
    private IProductRepository iProductRepository;

    @Override
    public List<Product> getAllProducts(){
        return iProductRepository.findAll();
    }

    @Override
    public Product getProductById(Long id){
        return iProductRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("No existe el producto con id "+ id));
    }

    @Override
    @Transactional
    public Product createProduct(Product productRequest, MultipartFile image){
        try {
            if(image != null && !image.isEmpty()){
                //Obtener el nombre de la imagen
                String imageName = image.getOriginalFilename();
                //Obtener la extension del archivo
                String fileExtension = imageName.substring(imageName.lastIndexOf(".") + 1).toLowerCase();

                // Verificar si la extensión es válida
                if (!Arrays.asList("jpg", "jpeg", "png").contains(fileExtension)) {
                    throw new FileFormatException("Extension de imagen no permitida. Por favor suba una imagen con extension jpg, png o jpeg");
                }

                //Crear un nombre unico para cada imagen
                String uniqueFileName = UUID.randomUUID().toString() + "_" + imageName;

                // Obtener la ruta de almacenamiento desde las propiedades de la aplicación
                String storageFolderPath = ResourceUtils.getFile("src//main//resources//static//images").getAbsolutePath();
                Path filePath = Paths.get(storageFolderPath, uniqueFileName);
                // Guardar la imagen en el sistema de archivos del servidor
                Files.write(filePath, image.getBytes());

                productRequest.setImageProduct(storageFolderPath + File.separator + uniqueFileName);
            }
            return iProductRepository.save(productRequest);
        }catch (IOException e) {
            throw new ProductNotFoundException("Error al crear el producto: " + e.getMessage());
        } catch (Exception e){
            throw new GlobalException("Error al crear el producto: "+ e.getMessage());
        }
    }

    @Override
    @Transactional
    public Product updateProductById(Long id, Product productRequest){
        Optional<Product> product = iProductRepository.findById(id);
        if(product.isPresent()){
            Product productExisting = product.get();
            productExisting.setTitle(productRequest.getTitle());
            productExisting.setUser(productExisting.getUser());
            productExisting.setCategory(productRequest.getCategory());
            productExisting.setDescription(productRequest.getDescription());
            productExisting.setProductStatus(productRequest.getProductStatus());
            productExisting.setConditionProduct(productRequest.getConditionProduct());
            productExisting.setUser(productExisting.getUser());
            return iProductRepository.save(productExisting);
        }else {
            throw new ProductNotFoundException("No se encontró un producto con el ID: "+ id);
        }

    }

    @Override
    public String deleteProduct(Long id){
        try {
            iProductRepository.deleteById(id);
            return "Producto eliminado exitosamente";
        }catch (Exception e){
            throw new ProductNotFoundException("No se encontró un producto con el ID: "+ id);
        }
    }


}
