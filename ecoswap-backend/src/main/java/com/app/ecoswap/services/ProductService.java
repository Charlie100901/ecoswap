package com.app.ecoswap.services;

import com.app.ecoswap.config.SessionTokenService;
import com.app.ecoswap.exceptions.*;
import com.app.ecoswap.models.Product;
import com.app.ecoswap.models.User;
import com.app.ecoswap.repositories.IProductRepository;
import com.app.ecoswap.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@Service
public class ProductService {

    @Autowired
    private IProductRepository iProductRepository;

    @Autowired
    private SessionTokenService sessionTokenService;

    @Autowired
    private IUserRepository userRepository;
    @Value("${image.storage.path}")
    private String storageFolderPath;


    public List<Product> getAllProducts(){
          return iProductRepository.findAll();
    }


    public Product getProductById(Long id){
        return iProductRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("No existe el producto con id "+ id));
    }


    @Transactional
    public Product createProduct(Product productRequest, MultipartFile image, String token) {
        try {
            if (!sessionTokenService.isValidSessionToken(token)) {
                throw new InvalidSessionTokenException("El token es inválido");
            }

            String emailUser = sessionTokenService.getUserEmailFromToken(token);
            User user = userRepository.findUserByEmail(emailUser).orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

            if (image == null || image.isEmpty()) {
                throw new IllegalArgumentException("Debe proporcionar una imagen para crear el producto");
            }

            // Obtener el nombre de la imagen
            String imageName = image.getOriginalFilename();
            // Obtener la extensión del archivo
            String fileExtension = imageName.substring(imageName.lastIndexOf(".") + 1).toLowerCase();

            // Verificar si la extensión es válida
            if (!Arrays.asList("jpg", "jpeg", "png").contains(fileExtension)) {
                throw new FileFormatException("Extension de imagen no permitida. Por favor suba una imagen con extension jpg, png o jpeg");
            }

            // Crear un nombre único para cada imagen
            String uniqueFileName = UUID.randomUUID().toString() + "_" + imageName;
            // Ruta donde se guardarán las imágenes en el servidor
            String serverImagePath = "http://localhost:8080/images/" + uniqueFileName;

            // Guardar la imagen en el servidor
            Files.write(Paths.get(storageFolderPath, uniqueFileName), image.getBytes());

            // Guardar la URL del servidor en el objeto Product
            productRequest.setImageProduct(serverImagePath);
            productRequest.setUser(user);
            productRequest.setProductStatus("activo");

            return iProductRepository.save(productRequest);

        } catch (IOException e) {
            throw new ProductCreationException("Error al crear el producto: " + e.getMessage());
        }
    }



    @Transactional
    public Product updateProductById(Long id, Product productRequest, MultipartFile image, String token) throws IOException {
        if (!sessionTokenService.isValidSessionToken(token)) {
            throw new InvalidSessionTokenException("El token es inválido");
        }

        String emailUser = sessionTokenService.getUserEmailFromToken(token);
        User user = userRepository.findUserByEmail(emailUser).orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

        boolean isAdmin = user.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"));

        Optional<Product> optionalProduct = iProductRepository.findById(id);

        if (optionalProduct.isEmpty()) {
            throw new ProductNotFoundException("No se encontró un producto con el ID: " + id);
        }

        Product productExisting = optionalProduct.get();

        // Verificar si el usuario es el propietario del producto o si es un administrador
        if (!productExisting.getUser().getId().equals(user.getId()) && !isAdmin) {
            throw new UnauthorizedAccessException("No tienes permiso para actualizar este producto");
        }

        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException("Debe proporcionar una imagen para actualizar el producto");
        }

        // Obtener el nombre de la imagen
        String imageName = image.getOriginalFilename();
        // Obtener la extensión del archivo
        String fileExtension = imageName.substring(imageName.lastIndexOf(".") + 1).toLowerCase();

        // Verificar si la extensión es válida
        if (!Arrays.asList("jpg", "jpeg", "png").contains(fileExtension)) {
            throw new FileFormatException("Extension de imagen no permitida. Por favor suba una imagen con extensión jpg, png o jpeg");
        }

        // Crear un nombre único para cada imagen
        String uniqueFileName = UUID.randomUUID().toString() + "_" + imageName;
        // Ruta donde se guardarán las imágenes en el servidor
        String serverImagePath = "http://localhost:8080/images/" + uniqueFileName;

        // Guardar la imagen en el servidor
        Files.write(Paths.get(storageFolderPath, uniqueFileName), image.getBytes());

        productExisting.setTitle(productRequest.getTitle());
        productExisting.setUser(user);
        productExisting.setCategory(productRequest.getCategory());
        productExisting.setDescription(productRequest.getDescription());
        productExisting.setProductStatus("activo");
        productExisting.setConditionProduct(productRequest.getConditionProduct());
        productExisting.setImageProduct(serverImagePath);

        return iProductRepository.save(productExisting);
    }


    public Map<String, String> deleteProduct(Long id, String token) {
        if (sessionTokenService.isValidSessionToken(token)) {
                String emailUser = sessionTokenService.getUserEmailFromToken(token);
                User user = userRepository.findUserByEmail(emailUser).orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));
                boolean isAdmin = user.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"));
                Product product = iProductRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("No se encontró un producto con el ID: " + id));

                // Verificar si el usuario es el propietario del producto o es un administrador
                if (!product.getUser().getEmail().equals(emailUser) && !isAdmin) {
                    throw new UnauthorizedAccessException("No tienes permiso para eliminar este producto");
                }

                iProductRepository.deleteById(id);
                Map<String, String> response = new HashMap<>();
                response.put("message", "Producto eliminado exitosamente");
                return response;
        } else {
            throw new InvalidSessionTokenException("El token es inválido");
        }
    }



}
