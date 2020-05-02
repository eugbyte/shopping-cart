package com.example.shoppingCart.services;

import com.example.shoppingCart.exceptions.ItemNotFoundException;
import com.example.shoppingCart.models.Item;
import com.example.shoppingCart.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService implements IItemService {

    @Autowired
    protected ItemRepository itemRepository;

    public List<Item> findAll() {
        List<Item> items = itemRepository.findAll();
        return removeSelfReference(items);
    }

    public Item findById(int itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ItemNotFoundException(itemId));
        return removeSelfReference(item);
    }

    public Item createItem(Item item) {
        Item createdItem = itemRepository.save(item);
        return removeSelfReference(createdItem);
    }

    public Item updateItem(Item item) {
        int itemId = item.getId();
        String name = item.getName();
        double price = item.getPrice();

        Item itemToUpdate = itemRepository.findById(itemId).get();
        itemToUpdate.setName(name);
        itemToUpdate.setPrice(price);
        Item updatedItem = itemRepository.save(itemToUpdate);
        return removeSelfReference(updatedItem);
    }

    public void deleteItem(int itemId) {
        if (!itemRepository.existsById(itemId))
            throw new ItemNotFoundException(itemId);
        itemRepository.deleteById(itemId);
    }

    protected Item removeSelfReference (Item item) {
        item.setCartDetails(null);
        item.setOrderDetails(null);
        return item;
    }

    protected  List<Item> removeSelfReference(List<Item> items) {
        items.forEach(item -> removeSelfReference(item));
        return items;
    }


}
