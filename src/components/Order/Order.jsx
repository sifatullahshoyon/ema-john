import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCardAlt } from '@fortawesome/free-solid-svg-icons';
import './Order.css';

const Order = () => {
    const savedCart = useLoaderData();
    const [cart , setCart] = useState(savedCart);
    const handleRemoveFromCart = (id) => {
        const remaining = cart?.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    };
    const handleClearToCart = () => {
        setCart([]);
        deleteShoppingCart();
    };
    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart?.map(product => <ReviewItem 
                    key={product.id}
                    product={product}
                    handleRemoveFromCart={handleRemoveFromCart}
                    />)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart} handleClearToCart={handleClearToCart}><Link className='common-link' to='/checkout'><button className='btn-common'><div>Proceed Checkout </div><FontAwesomeIcon icon={faCreditCardAlt} /></button></Link></Cart>
            </div>
        </div>
    );
};

export default Order;