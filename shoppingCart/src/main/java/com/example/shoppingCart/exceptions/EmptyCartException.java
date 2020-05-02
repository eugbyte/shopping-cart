package com.example.shoppingCart.exceptions;

public class EmptyCartException extends RuntimeException {
    public EmptyCartException () {
        super("cart is empty");
    }

    public EmptyCartException (int customerId) {
        super("cart of customer with id: " + customerId + " is empty");
    }
}
