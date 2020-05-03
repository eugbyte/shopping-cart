package com.example.shoppingCart.repositories;

import com.example.shoppingCart.models.Orde_r;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orde_r, Integer> {
    List<Orde_r> findByCustomer_Id (int customerId);
    Orde_r findTopByCustomer_IdOrderByIdDesc (int customerId);
    List<Orde_r> findByCustomer_IdOrderByIdDesc(int customerId);
}
