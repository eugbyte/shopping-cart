package com.example.shoppingCart.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @OneToMany(mappedBy = "customer")
    private List<Orde_r> orders;

    @OneToOne(mappedBy = "customer")
    private Cart cart;



}
