package com.example.shoppingCart.exceptions;

public class QuantityLessThanOneException extends RuntimeException {
    public QuantityLessThanOneException() {
        super("quantity less than one");
    }
    public QuantityLessThanOneException(int quantity) {
        super(quantity + " is less than one");
    }
}
