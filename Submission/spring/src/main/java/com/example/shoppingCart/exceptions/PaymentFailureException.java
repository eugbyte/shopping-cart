package com.example.shoppingCart.exceptions;

public class PaymentFailureException extends RuntimeException {
    public PaymentFailureException() {
        super("Payment failed");
    }
    public PaymentFailureException(String cardNumber) {
        super("Payment for " + cardNumber + " failed");
    }
}
