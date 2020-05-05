package com.example.shoppingCart.controllers;

import com.example.shoppingCart.models.Item;
import com.example.shoppingCart.services.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.concurrent.Callable;

@RestController
@RequestMapping("api/items")
public class ItemController {

    @Autowired
    private IItemService itemService;

    @GetMapping()
    public Callable<ResponseEntity<List<Item>>>  getAllItems() {
        return () -> {
            List<Item> items = itemService.findAll();
            return ResponseEntity.ok(items);
        };
    }

    @GetMapping("{itemId}")
    public Callable<ResponseEntity<Item>> getItem(@PathVariable int itemId) {
        return () -> {
            Item item = itemService.findById(itemId);
            return ResponseEntity.ok(item);
        };
    }

    @PostMapping()
    public Callable<ResponseEntity<Item>> createItem(@RequestBody Item _item) {
        return () -> {
            Item item = itemService.createItem(_item);
            URI location = new URI("api/items");
            return ResponseEntity.created(location).body(item);
        };
    }

    @PutMapping()
    public Callable<ResponseEntity<Item>> updateItem(@RequestBody Item _item) {
        return () -> {
            Item item = itemService.updateItem(_item);
            return ResponseEntity.ok(item);
        };
    }

    @DeleteMapping("{itemId}")
    public Callable<ResponseEntity> deleteItem(@PathVariable int itemId) {
        return () -> {
            itemService.deleteItem(itemId);
            return ResponseEntity.ok().build();
        };
    }
}
