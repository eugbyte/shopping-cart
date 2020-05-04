package com.example.shoppingCart;

import com.example.shoppingCart.models.Cart;
import com.example.shoppingCart.models.CartDetail;
import com.example.shoppingCart.models.Item;
import com.example.shoppingCart.models.OrderDetail;
import com.example.shoppingCart.repositories.CartRepository;
import com.example.shoppingCart.repositories.ItemRepository;
import com.example.shoppingCart.services.ICartService;
import com.example.shoppingCart.services.ItemService;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.initMocks;

@SpringBootTest
class ShoppingCartApplicationTests {

	@Test
	void contextLoads() {
 	}

}
