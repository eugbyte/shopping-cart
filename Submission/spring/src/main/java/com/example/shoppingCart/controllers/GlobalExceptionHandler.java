package com.example.shoppingCart.controllers;

import com.example.shoppingCart.ViewModels.ErrorResponse;
import com.example.shoppingCart.exceptions.*;
import com.example.shoppingCart.repositories.ItemRepository;
import org.hibernate.service.spi.InjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.support.RequestContext;


@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private Logger logger = LoggerFactory.getLogger("ErrorLogger");

    @ExceptionHandler(value = {ItemNotFoundException.class, CustomerNotFoundException.class, CartDetailNotFoundException.class} )
    public ResponseEntity<ErrorResponse> handleNotFoundException(RuntimeException ex, WebRequest request) {
        logger.error(this.getClass() + " " + ex.toString());
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.message = ex.getMessage();
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = { QuantityLessThanOneException.class, EmptyCartException.class })
    public ResponseEntity<ErrorResponse> handleQuantityLessThanOneException(RuntimeException ex, WebRequest request) {
        logger.error(this.getClass() + " " + ex.toString());
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.message = ex.getMessage();
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PaymentFailureException.class)
    public ResponseEntity<ErrorResponse> handleEmptyCartException(EmptyCartException ex, WebRequest request) {
        logger.error(this.getClass() + " " + ex.toString());
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.message = ex.getMessage();
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ItemCascadeDeleteError.class)
    public ResponseEntity<ErrorResponse> handleItemCascadeDeleteException(ItemCascadeDeleteError ex, WebRequest request) {
        logger.error(this.getClass() + " " + ex.toString());
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.message = ex.getMessage();
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
