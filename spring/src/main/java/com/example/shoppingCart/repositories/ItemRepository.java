package com.example.shoppingCart.repositories;

import com.example.shoppingCart.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    List<Item> findAll();
    Optional<Item> findById(Integer integer);
}
