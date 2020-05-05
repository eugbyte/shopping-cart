package com.example.shoppingCart.exceptions;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException() {
        super("item not found");
    }
    public ItemNotFoundException(int itemId) {
        super("item with id: " + itemId + " not found");
    }
}
