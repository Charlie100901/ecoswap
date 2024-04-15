package com.app.ecoswap.models;

import java.util.Date;

public class Error {

    private Date timestamp;
    private int status;
    private String message;

    public Error() {
    }

    public Error(Date timestamp, int status, String message) {
        this.timestamp = timestamp;
        this.status = status;
        this.message = message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "Error{" +
                "timestamp=" + timestamp +
                ", httpStatus=" + status +
                ", message='" + message + '\'' +
                '}';
    }
}

