package com.example.shoppingCart.services;

import com.example.shoppingCart.models.Cart;

public interface ICartService {
    Cart modifyCart(int itemId, int quantity, int customerId);
    Cart getCart(int customerId);
}
