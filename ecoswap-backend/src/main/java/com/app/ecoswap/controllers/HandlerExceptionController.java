package com.app.ecoswap.controllers;

import com.app.ecoswap.exceptions.*;
import com.app.ecoswap.models.Error;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.io.IOException;
import java.util.Date;
import java.util.Objects;

@RestControllerAdvice
public class HandlerExceptionController {

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<Error> handleProductNotFound(Exception ex){
        Error error = new Error(new Date(), HttpStatus.NOT_FOUND.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Error> handleUserNotFound(Exception ex){
        Error error = new Error(new Date(),HttpStatus.NOT_FOUND.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Error> handleException(Exception ex){
        Error error = new Error(new Date(), HttpStatus.NOT_FOUND.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<Error> mediaTypeNotSupported(Exception ex){
        Error error = new Error(new Date(), HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(error);
    }

    @ExceptionHandler(HttpClientErrorException.MethodNotAllowed.class)
    public ResponseEntity<Error> methodNotAllowed(Exception ex){
        Error error = new Error(new Date(), HttpStatus.METHOD_NOT_ALLOWED.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Error> handleValidationException(MethodArgumentNotValidException ex){
        Error error = new Error(new Date(), HttpStatus.BAD_REQUEST.value(), Objects.requireNonNull(ex.getBindingResult().getFieldError()).getField() + " "+ ex.getBindingResult().getFieldError().getDefaultMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<Error> iOException(Exception ex){
        Error error = new Error(new Date(), HttpStatus.BAD_REQUEST.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(FileFormatException.class)
    public ResponseEntity<Error> fileFormatException(Exception ex){
        Error error = new Error(new Date(), HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<Error> emailAlreadyExistsException(Exception ex){
        Error error = new Error(new Date(), HttpStatus.BAD_REQUEST.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(RequestExchangeNotFoundException.class)
    public ResponseEntity<Error> requestExchangeNotFoundException(Exception ex){
        Error error = new Error(new Date(), HttpStatus.NOT_FOUND.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(InvalidSessionTokenException.class)
    public ResponseEntity<Error> invalidSessionTokenException(Exception ex){
        Error error = new Error(new Date(), HttpStatus.BAD_REQUEST.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Error> defaultEx(Exception ex){
        Error error = new Error(new Date(), HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }


}
