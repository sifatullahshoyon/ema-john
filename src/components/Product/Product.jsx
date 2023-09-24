import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    const {img, name, price, seller, ratings} = props.product;
    const handleAddToCart = props.handleAddToCart;
    return (
        <div className='product'>
            <div className='product-details'>
                <img src={img} alt="product-img" />
                <div>
                    <h6>{name}</h6>
                    <p className='product-price'>Price: ${price}</p>
                    <p className='product-manufacturer'>Manufacturer: {seller}</p>
                    <p className='product-rating'>Rating: {ratings}</p>
                </div>
            </div>
            <button onClick={() => handleAddToCart(props.product)} className='btn-cart'>Add to Cart <FontAwesomeIcon icon={faShoppingCart} /></button>
        </div>
    );
};

export default Product;