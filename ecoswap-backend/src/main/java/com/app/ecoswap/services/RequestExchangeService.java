package com.app.ecoswap.services;

import com.app.ecoswap.config.SessionTokenService;
import com.app.ecoswap.exceptions.*;
import com.app.ecoswap.models.Product;
import com.app.ecoswap.models.RequestExchange;
import com.app.ecoswap.models.User;
import com.app.ecoswap.repositories.IProductRepository;
import com.app.ecoswap.repositories.IRequestExchangeRepository;
import com.app.ecoswap.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class RequestExchangeService {

    @Autowired
    private IRequestExchangeRepository iRequestExchangeRepository;
    @Autowired
    private SessionTokenService sessionTokenService;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IProductRepository iProductRepository;

    public List<RequestExchange> getAllRequestExchange(String token) {
        if (!sessionTokenService.isValidSessionToken(token)) {
            throw new InvalidSessionTokenException("El token es inválido");
        }
        if (isAdmin(token)) {
            throw new UnauthorizedAccessException("Solo los administradores pueden acceder a la lista de solicitudes de intercambio");
        }
        return iRequestExchangeRepository.findAll();
    }


    public RequestExchange getRequestExchangeById(Long id, String token) {
        if (!sessionTokenService.isValidSessionToken(token)) {
            throw new InvalidSessionTokenException("El token es inválido");
        }
        if (isAdmin(token)) {
            return iRequestExchangeRepository.findById(id).orElseThrow(() -> new RequestExchangeNotFoundException("No se encontró una solicitud de intercambio con el id " + id));
        } else {
            throw new UnauthorizedAccessException("Solo los administradores pueden acceder a una solicitud de intercambio");
        }
    }

    public RequestExchange createRequestExchange(RequestExchange requestExchange, String token){
        if (!sessionTokenService.isValidSessionToken(token)) {
            throw new InvalidSessionTokenException("El token es inválido");
        }
        requestExchange.setStatus("pendiente");
        requestExchange.setDate(LocalDate.now());
        return iRequestExchangeRepository.save(requestExchange);


    }

    @Transactional
    public Map<String, String> selectExchangeRequest(RequestExchange requestExchange, String token){
        if(!sessionTokenService.isValidSessionToken(token)){
            throw new InvalidSessionTokenException("El token es invalido");
        }

        //Cambia el status y la fecha de la request Exchange escogida por el usuario
        requestExchange.setStatus("completada");
        requestExchange.setDate(LocalDate.now());
        iRequestExchangeRepository.save(requestExchange);

            
        //Buscar y cambiar el resto de las request exchange asociadas (se cambia el status a rechazada)
        List<RequestExchange> requestExchangeAsocidas = iRequestExchangeRepository.findByProductTo(requestExchange.getProductTo());
        for (RequestExchange rExchange: requestExchangeAsocidas){
            if (rExchange.getStatus().equals("pendiente")){
                rExchange.setStatus("rechazada");
            }
            
            
        }
        iRequestExchangeRepository.saveAll(requestExchangeAsocidas);

        updateProductStatusAfterExchange(requestExchange.getProductTo().getId());
        updateProductStatusAfterExchange(requestExchange.getProductFrom().getId());
        updateProductStatusInAssociatedRequests(requestExchangeAsocidas);

        Map<String,String> response = new HashMap<>();
        response.put("message", "Intercambio realizado con exito");

        return response;
    }

    public boolean isAdmin(String token){
        String emailUser = sessionTokenService.getUserEmailFromToken(token);
        User user = userRepository.findUserByEmail(emailUser).orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));
        return user.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"));
    }

    
    private void updateProductStatusAfterExchange(Long productId) {
        // Obtener el producto involucrado en el intercambio
        Optional<Product> productOptional = iProductRepository.findById(productId);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            // Actualizar el estado del producto a inactivo después del intercambio
            product.setProductStatus("inactivo");
            iProductRepository.save(product);
        }
    }

    private void updateProductStatusInAssociatedRequests(List<RequestExchange> requestExchangeAsocidas) {
        for (RequestExchange rExchange : requestExchangeAsocidas) {
            Long productId = rExchange.getProductFrom().getId();
            updateProductStatusAfterExchange(productId);
        }
    }



// public String deleteRequestExchange(Long id, String token){
    //     if (!sessionTokenService.isValidSessionToken(token)) {
    //         throw new InvalidSessionTokenException("El token es inválido");
    //     }
    //     if(!isAdmin(token)){
    //         throw new UnauthorizedAccessException("Solo los administradores pueden acceder a una solicitud de intercambio");
    //     }
    //     iRequestExchangeRepository.deleteById(id);
    //     return "Solicitud de intercambio eliminada exitosamente";

    // }


//    public RequestExchange updateRequestExchange(RequestExchange requestExchange, Long id){
//        Optional<RequestExchange> requestExchangeOptional = iRequestExchangeRepository.findById(id);
//        if(requestExchangeOptional.isPresent()){
//            RequestExchange requestExchangeExisting = requestExchangeOptional.get();
//            requestExchangeExisting.set
//        }
//    }
}
