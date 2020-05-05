package com.example.shoppingCart.controllers;

import com.example.shoppingCart.ViewModels.AddToCartViewModel;
import com.example.shoppingCart.models.Cart;
import com.example.shoppingCart.models.CartDetail;
import com.example.shoppingCart.services.CartDetailService;
import com.example.shoppingCart.services.ICartDetailService;
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

    @Autowired
    private ICartDetailService cartDetailService;

    @PostMapping()
    public Callable<ResponseEntity<Cart>> addToCart(@RequestBody AddToCartViewModel addToCartViewModel) {
        return () -> {
            int itemId = addToCartViewModel.itemId;
            int quantity = addToCartViewModel.quantity;
            int customerId = addToCartViewModel.customerId;
            Cart cart = cartService.addToCart(itemId, quantity, customerId);
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

    @PutMapping()
    public Callable<ResponseEntity> updateCartDetail(@RequestBody CartDetail cartDetail) {
        return () -> {
            cartDetailService.updateCartDetail(cartDetail);
            return ResponseEntity.noContent().build();
        };
    }

    @DeleteMapping("{cartDetailId}")
    public Callable<ResponseEntity> deleteCartDetail(@PathVariable int cartDetailId) {
        return () -> {
            cartDetailService.deleteCartDetail(cartDetailId);
            return ResponseEntity.ok().build();
        };
    }

}
