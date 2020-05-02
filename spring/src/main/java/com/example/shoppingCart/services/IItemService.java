package com.example.shoppingCart.services;

import com.example.shoppingCart.models.Item;

import java.util.List;

public interface IItemService {
    List<Item> findAll();
    Item findById(int itemId);
    Item createItem(Item item);
    Item updateItem(Item item);
    void deleteItem(int itemId);

}
