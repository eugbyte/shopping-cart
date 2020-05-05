package com.example.shoppingCart.exceptions;

public class CartDetailNotFoundException extends RuntimeException {
    public CartDetailNotFoundException() {
        super("cart not found");
    }

    public CartDetailNotFoundException(int cartDetailId) {
        super("cartDetail with id: " + cartDetailId + " not found");
    }
}
