package com.app.ecoswap.services.impl;

import com.app.ecoswap.exceptions.GlobalException;
import com.app.ecoswap.exceptions.RequestExchangeNotFoundException;
import com.app.ecoswap.models.RequestExchange;
import com.app.ecoswap.repositories.IRequestExchangeRepository;
import com.app.ecoswap.services.RequestExchangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestExchangeServiceImp implements RequestExchangeService {

    @Autowired
    private IRequestExchangeRepository iRequestExchangeRepository;

    public List<RequestExchange> getAllRequestExchange() {
        try {
            return iRequestExchangeRepository.findAll();
        }catch (Exception e){
            throw new GlobalException("Ha ocurrido un error: "+ e.getMessage());
        }
    }

    public RequestExchange getRequestExchangeById(Long id){
        try {
            return iRequestExchangeRepository.findById(id).orElseThrow(() -> new RequestExchangeNotFoundException("No se encontró una solicitud de intercambio con el id "+id));
        }catch (Exception e){
            throw new GlobalException("Ha ocurrido un error: "+ e.getMessage());
        }
    }

    public RequestExchange createRequestExchange(RequestExchange requestExchange){
        try{
            return iRequestExchangeRepository.save(requestExchange);
        }catch (Exception e){
            throw new GlobalException("Error al crear la solicitud de intercambio "+e.getMessage() );
        }

    }

    public String deleteRequestExchange(Long id){
        try {
            iRequestExchangeRepository.deleteById(id);
            return "Solicitud de intercambio eliminada exitosamente";
        }catch (Exception e){
            throw new GlobalException("Error al eliminar la solicitud de intercambio "+ e.getMessage());
        }
    }

//    public RequestExchange updateRequestExchange(RequestExchange requestExchange, Long id){
//        Optional<RequestExchange> requestExchangeOptional = iRequestExchangeRepository.findById(id);
//        if(requestExchangeOptional.isPresent()){
//            RequestExchange requestExchangeExisting = requestExchangeOptional.get();
//            requestExchangeExisting.set
//        }
//    }
}
