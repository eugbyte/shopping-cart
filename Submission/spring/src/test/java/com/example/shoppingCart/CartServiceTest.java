package com.example.shoppingCart;

import com.example.shoppingCart.models.Cart;
import com.example.shoppingCart.models.Customer;
import com.example.shoppingCart.repositories.CartRepository;
import com.example.shoppingCart.services.CartService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(MockitoJUnitRunner.class)
public class CartServiceTest {

    private Logger logger = LoggerFactory.getLogger("DebugLogger");
    private List<Cart> carts;

    public CartServiceTest() {
        carts = new ArrayList<>();
        Cart cart1 = new Cart();
        cart1.setId(1);
        Customer customer1 = new Customer();
        customer1.setId(1);
        customer1.setCart(cart1);
        cart1.setCustomer(customer1);

        carts.add(cart1);

        Cart cart2 = new Cart();
        cart2.setId(2);
        Customer customer2 = new Customer();
        customer2.setId(2);
        customer2.setCart(cart2);
        cart2.setCustomer(customer2);

        carts.add(cart2);
    }

    @InjectMocks
    CartService cartService;

    @Mock
    CartRepository cartRepository;

    @Before
    public void init() {
        initMocks(this);
    }

    @Test
    public void testGetCart() {
        int customerId = 1;

        logger.debug(
                carts.stream()
                        .map(cart -> cart.getCustomer().getId())
                        .collect(Collectors.toList())
                        .toString() );

        when(cartService.getCart(customerId)).thenReturn(carts.get(0));

        Cart cart = cartService.getCart(customerId);
        int expectedCustomerId = cart.getCustomer().getId();
        assertEquals(1, expectedCustomerId);
    }

}
