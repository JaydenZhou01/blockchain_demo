// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract DeliverySystem {
    struct Order {
        address customer;
        address restaurant;
        address deliveryPerson;
        uint256 restaurantAmount;
        uint256 deliveryAmount;
        bool foodPickedUp;
        bool foodDelivered;
    }

    mapping(uint256 => Order) public orders;
    uint256 public orderCount=0;

    event OrderCreated(uint256 orderId, address customer, address restaurant, address deliveryPerson, uint256 restaurantAmount, uint256 deliveryAmount);
    event FoodPickedUp(uint256 orderId);
    event FoodDelivered(uint256 orderId);

    function createOrder(address _restaurant, address _deliveryPerson, uint256 _restaurantAmount, uint256 _deliveryAmount) public payable returns (uint256) {
        require(msg.value == _restaurantAmount + _deliveryAmount, "Incorrect payment amount");

        orderCount++;
        orders[orderCount] = Order({
            customer: msg.sender,
            restaurant: _restaurant,
            deliveryPerson: _deliveryPerson,
            restaurantAmount: _restaurantAmount,
            deliveryAmount: _deliveryAmount,
            foodPickedUp: false,
            foodDelivered: false
        });

        emit OrderCreated(orderCount, msg.sender, _restaurant, _deliveryPerson, _restaurantAmount, _deliveryAmount);
        return orderCount;
    }

    function confirmFoodPickup(uint256 _orderId) public {
        Order storage order = orders[_orderId];
        require(msg.sender == order.deliveryPerson, "Only delivery person can confirm pickup");
        require(!order.foodPickedUp, "Food already picked up");

        order.foodPickedUp = true;
        address(uint160(order.restaurant)).transfer(order.restaurantAmount);

        emit FoodPickedUp(_orderId);
    }

    function confirmFoodDelivery(uint256 _orderId) public {
        Order storage order = orders[_orderId];
        require(msg.sender == order.customer, "Only customer can confirm delivery");
        require(order.foodPickedUp, "Food not picked up yet");
        require(!order.foodDelivered, "Food already delivered");

        order.foodDelivered = true;
        address(uint160(order.deliveryPerson)).transfer(order.deliveryAmount);

        emit FoodDelivered(_orderId);
    }

    function getOrder(uint256 _orderId) public view returns (
        address customer,
        address restaurant,
        address deliveryPerson,
        uint256 restaurantAmount,
        uint256 deliveryAmount,
        bool foodPickedUp,
        bool foodDelivered
    ) {
        Order storage order = orders[_orderId];
        return (
            order.customer,
            order.restaurant,
            order.deliveryPerson,
            order.restaurantAmount,
            order.deliveryAmount,
            order.foodPickedUp,
            order.foodDelivered
        );
    }
}

