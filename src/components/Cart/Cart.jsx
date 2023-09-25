import React from 'react';
import './Cart.css';

const Cart = ({cart}) => {
    // const cart = props.cart; Option : 1
    // Option : 2
    // const {cart} = props; 
    let total = 0;
    for(const product of cart){
        total = total + product.price;
    }
    return (
        <div className='cart'>
            <h5>Order summary</h5>
            <p>Selected Items: {cart.length}</p>
            <p>Total Price: ${total}</p>
            <p>Total Shipping Charge: $5</p>
            <p>Tax: $114</p>
            <h6>Grand Total: $1559</h6>
        </div>
    );
};

export default Cart;