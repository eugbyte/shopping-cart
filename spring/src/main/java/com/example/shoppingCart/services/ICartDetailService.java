package com.example.shoppingCart.services;

import com.example.shoppingCart.models.CartDetail;

public interface ICartDetailService {
    void updateCartDetail(CartDetail cartDetail);
    void deleteCartDetail(int cartDetailId);
}
