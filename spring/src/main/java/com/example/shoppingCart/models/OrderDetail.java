package com.example.shoppingCart.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int quantity;

    @ManyToOne
    private Item item;

    @ManyToOne
    private Orde_r order;

}
