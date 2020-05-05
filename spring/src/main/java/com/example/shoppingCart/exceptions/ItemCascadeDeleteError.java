package com.example.shoppingCart.exceptions;

import javax.management.RuntimeErrorException;

public class ItemCascadeDeleteError extends RuntimeException {
    public ItemCascadeDeleteError() {
        super("item has been ordered or is in cart, cannot cascade delete");
    }

    public ItemCascadeDeleteError(int itemId) {
        super("item with id: " + itemId + " has been ordered or is in cart, cannot cascade delete");
    }
}
