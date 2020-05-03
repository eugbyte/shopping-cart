package com.example.shoppingCart;

import com.example.shoppingCart.models.Item;
import com.example.shoppingCart.repositories.ItemRepository;
import com.example.shoppingCart.services.ItemService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

public class ItemServiceTest {

    @InjectMocks
    private ItemService itemService;

    @Mock
    private ItemRepository itemRepository;

    private List<Item> items;

    @Before
    public void init() {
        initMocks(this);

        items = new ArrayList<>();
        Item item1 = new Item();
        item1.setId(1);
        item1.setName("First item");
        item1.setPrice(10);

        Item item2 = new Item();
        item2.setId(2);
        item2.setName("Second item");
        item2.setPrice(20);

        items.add(item1);
        items.add(item2);
    }

    @Test
    public void testGetItems() {
       when(itemService.findAll()).thenReturn(items);
        List<Item> resultItems = itemService.findAll();
        assertEquals(resultItems.size(), 2);
        verify(itemRepository, times(1)).findAll();
    }
}
