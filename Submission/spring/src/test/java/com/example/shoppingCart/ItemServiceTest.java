package com.example.shoppingCart;

import com.example.shoppingCart.models.CartDetail;
import com.example.shoppingCart.models.Item;
import com.example.shoppingCart.models.OrderDetail;
import com.example.shoppingCart.repositories.ItemRepository;
import com.example.shoppingCart.services.ItemService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.MockBeans;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(MockitoJUnitRunner.class)
public class ItemServiceTest {
    private Logger logger = LoggerFactory.getLogger("DebugLogger");

    private List<Item> items;
    private Item submittedItem;

    public ItemServiceTest() {
        items = new ArrayList<>();
        Item item1 = new Item();
        item1.setId(1);
        item1.setName("First item");
        item1.setPrice(10);
        item1.setCartDetails(new ArrayList<CartDetail>());
        item1.setOrderDetails(new ArrayList<OrderDetail>());

        Item item2 = new Item();
        item2.setId(2);
        item2.setName("Second item");
        item2.setPrice(20);

        items.add(item1);
        items.add(item2);

        submittedItem = new Item();
        submittedItem.setId(0);
        submittedItem.setPrice(100);
        submittedItem.setName("Created item");
    }

    @InjectMocks
    private ItemService itemService;

    @Mock
    private ItemRepository itemRepository;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getItemsTest() {
       when(itemService.findAll()).thenReturn(items);
        List<Item> resultItems = itemService.findAll();
        assertEquals(2, resultItems.size());
        verify(itemRepository, times(1)).findAll();
    }

    @Test
    public void createItemsTest() {

        logger.debug(submittedItem.getName() + " " + submittedItem.getPrice() + submittedItem.getOrderDetails());
        when(itemService.createItem(submittedItem)).thenReturn(submittedItem);
        Item item = itemService.createItem(submittedItem);
        assertEquals("First item", item.getName());
        verify(itemRepository, times(1)).save(submittedItem);

        //removeSelfReference() is causing the error. if you remove it from the service class then the test passes
    }

    @Test
    public void deleteItemTest() {
        int itemId = items.get(0).getId();
        itemService.deleteItem(itemId);
        verify(itemRepository, times(1)).deleteById(itemId);
    }
}
