package com.example.shoppingCart.ViewModels;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class ErrorResponse {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime timeStamp;

    public String message;

    public ErrorResponse () {
        timeStamp = LocalDateTime.now();
    }
}
