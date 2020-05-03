package com.example.shoppingCart;

import com.example.shoppingCart.models.Cart;
import com.example.shoppingCart.repositories.CartRepository;
import com.example.shoppingCart.services.ICartService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class ShoppingCartApplicationTests {

	@Test
	void contextLoads() {
 	}

	@Autowired
	private ICartService cartService;

	@Test
	public void testGetCart() {
		int customerId = 1;
		Cart cart = cartService.getCart(customerId);
		assertEquals(cart.getCustomer().getId(), 1);
	}

}
