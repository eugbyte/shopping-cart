package com.example.shoppingCart.controllers;

import com.example.shoppingCart.ViewModels.ErrorResponse;
import com.example.shoppingCart.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {ItemNotFoundException.class, CustomerNotFoundException.class, CartDetailNotFoundException.class} )
    public ResponseEntity<ErrorResponse> handleNotFoundException(RuntimeException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.message = ex.getMessage();
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(QuantityLessThanOneException.class)
    public ResponseEntity<ErrorResponse> handleQuantityLessThanOneException(QuantityLessThanOneException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.message = ex.getMessage();
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmptyCartException.class)
    public ResponseEntity<ErrorResponse> handleEmptyCartException(EmptyCartException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.message = ex.getMessage();
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
    }

}
