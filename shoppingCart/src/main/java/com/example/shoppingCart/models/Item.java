package com.example.shoppingCart.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private double price;

    @OneToMany(mappedBy = "item")
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "item")
    private List<CartDetail> cartDetails;
}
