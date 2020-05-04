package com.example.shoppingCart.services;

import com.example.shoppingCart.exceptions.CustomerNotFoundException;
import com.example.shoppingCart.exceptions.EmptyCartException;
import com.example.shoppingCart.exceptions.PaymentFailureException;
import com.example.shoppingCart.models.*;
import com.example.shoppingCart.repositories.CartRepository;
import com.example.shoppingCart.repositories.OrderDetailRepository;
import com.example.shoppingCart.repositories.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService implements IOrderService {

    @Autowired
    protected OrderDetailRepository orderDetailRepository;
    @Autowired
    protected OrderRepository orderRepository;
    @Autowired
    protected CartRepository cartRepository;

    private Logger logger = LoggerFactory.getLogger("DebugLogger");

    public Orde_r createOrder(int customerId, String cardNumber) throws CustomerNotFoundException, EmptyCartException {
        Orde_r order = new Orde_r();
        Cart cart = cartRepository.findByCustomer_Id(customerId).orElseThrow(() -> new CustomerNotFoundException(customerId));
        List<CartDetail> cartDetails = cart.getCartDetails();

        if (cartDetails.size() <= 0)
            throw new EmptyCartException(customerId);

        List<OrderDetail> orderDetails = cartDetails.stream().map(cartDetail -> {
            OrderDetail orderDetail = new OrderDetail();
            Item item = cartDetail.getItem();
            int quantity = cartDetail.getQuantity();
            orderDetail.setItem(item);
            orderDetail.setQuantity(quantity);
            orderDetail.setOrder(order);
            return orderDetail;
        }).collect(Collectors.toList());

        order.setOrderDate(LocalDateTime.now());
        Customer customer = new Customer();
        customer.setId(customerId);

        order.setCustomer(customer);
        order.setOrderDetails(orderDetails);
        order.setTxnId(UUID.randomUUID());

        if (accessPaymentGateway(cardNumber) == false)
            throw new PaymentFailureException(cardNumber);

        Orde_r createdOrder = orderRepository.save(order);
        emptyCart(cart);
        return removeSelfReference(createdOrder);
    }

    protected boolean accessPaymentGateway(String cardNumber) {
        final String uri = "http://www.paymentGateWay.json";
        RestTemplate restTemplate = new RestTemplate();

        boolean isPaymentSuccessful = false;
        try {
            String result = restTemplate.getForObject(uri, String.class);
            isPaymentSuccessful = true;
        } catch (Exception exception) {
            logger.debug(exception.getMessage());
            isPaymentSuccessful = false;
        } finally {
            //Assume that payment is always successful in this mock example
            isPaymentSuccessful = true;
        }
        return isPaymentSuccessful;
    }

    protected void emptyCart(Cart cart) {
        cart.getCartDetails().clear();
        //why does cart.setCartDetails(null) result in an error
        //see https://codippa.com/how-to-resolve-a-collection-with-cascadeall-delete-orphan-was-no-longer-referenced-by-the-owning-entity-instance/
        cartRepository.save(cart);
    }

    public List<Orde_r> getAllOrders(int customerId) {
        List<Orde_r> orders = orderRepository.findByCustomer_IdOrderByIdDesc(customerId);
        return removeSelfReference(orders);
    }

    public Orde_r getLatestOrder(int customerId) {
        //Assume that there is validation here with json web token
        Orde_r order = orderRepository.findTopByCustomer_IdOrderByIdDesc(customerId);
        return removeSelfReference(order);
    }

    protected Orde_r removeSelfReference(Orde_r order) {
        order.setCustomer(null);
        order.getOrderDetails().forEach(orderDetail -> {
            orderDetail.setOrder(null);
            Item item = orderDetail.getItem();
            item.setOrderDetails(null);
            item.setCartDetails(null);
        });
        return order;
    }

    protected List<Orde_r> removeSelfReference(List<Orde_r> orders) {
        orders.forEach(order -> removeSelfReference(order));
        return orders;
    }

}
