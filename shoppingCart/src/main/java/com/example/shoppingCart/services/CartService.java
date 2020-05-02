package com.example.shoppingCart.services;

import com.example.shoppingCart.exceptions.CustomerNotFoundException;
import com.example.shoppingCart.models.Cart;
import com.example.shoppingCart.models.CartDetail;
import com.example.shoppingCart.models.Item;
import com.example.shoppingCart.repositories.CartDetailRepository;
import com.example.shoppingCart.repositories.CartRepository;
import com.example.shoppingCart.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Supplier;

@Service
public class CartService implements ICartService {
    @Autowired
    protected CartRepository cartRepository;
    @Autowired
    protected CartDetailRepository cartDetailRepository;
    @Autowired
    protected ItemRepository itemRepository;

    //This is at the list view
    public Cart modifyCart(int itemId, int quantity, int customerId) {
        Cart cart = cartRepository.findByCustomer_Id(customerId)
                .orElseThrow(() -> new CustomerNotFoundException());

        List<CartDetail> cartDetails = cart.getCartDetails();
        CartDetail cartDetailToUpdate = null;

        for (CartDetail cartDetail : cartDetails) {
            int itemIdInCart = cartDetail.getItem().getId();
            if (itemIdInCart == itemId) {
                cartDetailToUpdate = cartDetail;
                break;
            }
        }

        //Create cartDetail if item does not exists in cart, otherwise update quantity
        if (cartDetailToUpdate == null) {
            createCartDetail(itemId, quantity, cart.getId());
        } else {
            updateCartDetail(cartDetailToUpdate, quantity);
        }

        Cart updatedCart = cartRepository.findByCustomer_Id(customerId).get();
        return removeSelfReference(updatedCart);
    }

    public Cart getCart(int customerId) {
        Cart cart = cartRepository.findByCustomer_Id(customerId)
                .orElseThrow(() -> new CustomerNotFoundException());
        return removeSelfReference(cart);
    }

    protected void createCartDetail(int itemId, int quantity, int cartId) {
        Cart cart = new Cart();
        cart.setId(cartId);

        CartDetail cartDetail = new CartDetail();
        cartDetail.setCart(cart);

        Item item = new Item();
        item.setId(itemId);
        cartDetail.setItem(item);
        cartDetail.setQuantity(quantity);

        cartDetail.setDateModified(LocalDateTime.now());

        cartDetailRepository.save(cartDetail);
    }

    protected void updateCartDetail(CartDetail cartDetailToUpdate, int quantity) {
        //Update cartDetail if item exists in cart
        if (quantity > 0) {
            cartDetailToUpdate.setQuantity(quantity);
            cartDetailToUpdate.setDateModified(LocalDateTime.now());
            cartDetailRepository.save(cartDetailToUpdate);
        } else {
            cartDetailRepository.deleteById(cartDetailToUpdate.getId());
        }
    }

    protected Cart removeSelfReference(Cart cart) {
        cart.setCustomer(null);
        List<CartDetail> cartDetails = cart.getCartDetails();
        cartDetails.forEach(cartDetail -> {
            cartDetail.setCart(null);

            Item item = cartDetail.getItem();
            item.setCartDetails(null);
            item.setOrderDetails(null);
        });
        return cart;
    }
}
