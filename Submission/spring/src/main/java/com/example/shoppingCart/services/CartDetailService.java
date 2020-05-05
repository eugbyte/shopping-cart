package com.example.shoppingCart.services;

import com.example.shoppingCart.exceptions.CartDetailNotFoundException;
import com.example.shoppingCart.exceptions.QuantityLessThanOneException;
import com.example.shoppingCart.models.CartDetail;
import com.example.shoppingCart.repositories.CartDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CartDetailService implements ICartDetailService {
    @Autowired
    protected CartDetailRepository cartDetailRepository;

    public void updateCartDetail(CartDetail cartDetail) {
        //Update cartDetail if item exists in cart
        int cartDetailId = cartDetail.getId();
        int quantity = cartDetail.getQuantity();
        CartDetail cartDetailToUpdate = cartDetailRepository.findById(cartDetailId)
                .orElseThrow(() -> new CartDetailNotFoundException());
        if (quantity < 1)
            throw new QuantityLessThanOneException(quantity);

        cartDetailToUpdate.setQuantity(quantity);
        cartDetailToUpdate.setDateModified(LocalDateTime.now());
        cartDetailRepository.save(cartDetailToUpdate);
    }

    public void deleteCartDetail(int cartDetailId) {
        cartDetailRepository.deleteById(cartDetailId);
    }
}
