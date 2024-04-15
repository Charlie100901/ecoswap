package com.app.ecoswap.exceptions;

public class EmailNotFoundException extends RuntimeException{
    public EmailNotFoundException(String message) {
        super(message);
    }
}
