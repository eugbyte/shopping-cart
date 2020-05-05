package com.example.shoppingCart.exceptions;

public class CustomerNotFoundException extends RuntimeException {
    public CustomerNotFoundException() {
        super("customer not found");
    }

    public CustomerNotFoundException(int customerId) {
        super("customer with id: " + customerId + " not found");
    }
}
