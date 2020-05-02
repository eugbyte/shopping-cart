package com.example.shoppingCart.controllers;

import com.example.shoppingCart.ViewModels.AddToCartViewModel;
import com.example.shoppingCart.models.Cart;
import com.example.shoppingCart.services.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.Callable;

@RestController
@RequestMapping("api/carts")
public class CartController {

    @Autowired
    private ICartService cartService;

    @PostMapping()
    public Callable<ResponseEntity<Cart>> addItemToCart(@RequestBody AddToCartViewModel addToCartViewModel) {
        return () -> {
            int itemId = addToCartViewModel.itemId;
            int quantity = addToCartViewModel.quantity;
            int customerId = addToCartViewModel.customerId;
            Cart cart = cartService.modifyCart(itemId, quantity, customerId);
            return ResponseEntity.ok(cart);
        };
    }

    @GetMapping("{customerId}")
    public Callable<ResponseEntity<Cart>> getCart(@PathVariable int customerId) {
        return () -> {
            Cart cart = cartService.getCart(customerId);
            return ResponseEntity.ok(cart);
        };
    }
}
