package com.app.ecoswap.services;

import com.app.ecoswap.config.SessionTokenService;
import com.app.ecoswap.exceptions.*;
import com.app.ecoswap.models.RequestExchange;
import com.app.ecoswap.models.User;
import com.app.ecoswap.repositories.IRequestExchangeRepository;
import com.app.ecoswap.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RequestExchangeService {

    @Autowired
    private IRequestExchangeRepository iRequestExchangeRepository;
    @Autowired
    private SessionTokenService sessionTokenService;
    @Autowired
    private IUserRepository userRepository;

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

    public String deleteRequestExchange(Long id, String token){
        if (!sessionTokenService.isValidSessionToken(token)) {
            throw new InvalidSessionTokenException("El token es inválido");
        }
        if(!isAdmin(token)){
            throw new UnauthorizedAccessException("Solo los administradores pueden acceder a una solicitud de intercambio");
        }
        iRequestExchangeRepository.deleteById(id);
        return "Solicitud de intercambio eliminada exitosamente";

    }
    @Transactional
    public Map<String, String> selectExchangeRequest(Long id, String token){
        if(!sessionTokenService.isValidSessionToken(token)){
            throw new InvalidSessionTokenException("El token es invalido");
        }
        RequestExchange requestExchange1 = iRequestExchangeRepository.findById(id).orElseThrow(()->new RequestExchangeNotFoundException("Solicitud de intercambio no encontrada"));
        requestExchange1.setStatus("completada");
        List<RequestExchange> requestExchangeAsocidas = iRequestExchangeRepository.findByProductTo(requestExchange1.getProductTo());
        for (RequestExchange rExchange: requestExchangeAsocidas){
            if (rExchange.getStatus().equals("completada")){
                continue;
            }
            rExchange.setStatus("rechazada");
        }
        iRequestExchangeRepository.saveAll(requestExchangeAsocidas);
        Map<String,String> response = new HashMap<>();
        response.put("message", "Intercambio realizado con exito");
        return response;
    }

    public boolean isAdmin(String token){
        String emailUser = sessionTokenService.getUserEmailFromToken(token);
        User user = userRepository.findUserByEmail(emailUser).orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));
        return user.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"));
    }


//    public RequestExchange updateRequestExchange(RequestExchange requestExchange, Long id){
//        Optional<RequestExchange> requestExchangeOptional = iRequestExchangeRepository.findById(id);
//        if(requestExchangeOptional.isPresent()){
//            RequestExchange requestExchangeExisting = requestExchangeOptional.get();
//            requestExchangeExisting.set
//        }
//    }
}
