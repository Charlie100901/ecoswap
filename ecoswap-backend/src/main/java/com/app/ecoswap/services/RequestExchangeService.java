package com.app.ecoswap.services;

import com.app.ecoswap.models.RequestExchange;

import java.util.List;

public interface RequestExchangeService {

    List<RequestExchange> getAllRequestExchange();

    RequestExchange getRequestExchangeById(Long id);

    RequestExchange createRequestExchange(RequestExchange requestExchange);

    String deleteRequestExchange(Long id);


}
