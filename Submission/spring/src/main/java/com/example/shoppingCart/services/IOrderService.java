package com.example.shoppingCart.services;

import com.example.shoppingCart.models.Orde_r;

import java.util.List;

public interface IOrderService {
    Orde_r createOrder(int customerId, String cardNumber) throws Exception;
    List<Orde_r> getAllOrders(int customerId);
    Orde_r getLatestOrder(int customerId);
}
