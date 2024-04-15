package com.app.ecoswap.exceptions;

public class InvalidSessionTokenException extends RuntimeException{
    public InvalidSessionTokenException(String message) {
        super(message);
    }
}
