package com.example.shoppingCart.controllers;

import com.example.shoppingCart.ViewModels.CustomerInfoViewModel;
import com.example.shoppingCart.models.Orde_r;
import com.example.shoppingCart.services.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.Callable;

@RestController
@RequestMapping("api/orders")
public class OrderController {

    @Autowired
    private IOrderService orderService;

    @PostMapping()
    public Callable<ResponseEntity<Orde_r>> createOrder(@RequestBody CustomerInfoViewModel vm) {
        return () -> {
            Orde_r order = orderService.createOrder(vm.customerId, vm.cardNumber);
            return ResponseEntity.ok(order);
        };
    }

    @GetMapping("{customerId}")
    public Callable<ResponseEntity<List<Orde_r>>> ordersHistory(@PathVariable int customerId) {
        return () -> {
            List<Orde_r> orders = orderService.getAllOrders(customerId);
            return ResponseEntity.ok(orders);
        };
    }

    @GetMapping("latestOrder/{customerId}")
    public Callable<ResponseEntity<Orde_r>> getLatestOrder(@PathVariable int customerId) {
        return () -> {
            Orde_r order = orderService.getLatestOrder(customerId);
            return ResponseEntity.ok(order);
        };
    }
}
