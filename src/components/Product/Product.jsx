import React from 'react';
import './Product.css';

const Product = (props) => {
    const {img , name , price , seller , ratings } = props.product ;
    return (
        <div className='product'>
            <div className='product-details'>
                <img src={img} alt="" />
                <div>
                    <h6>{name}</h6>
                    <p className='product-price'>Price: ${price}</p>
                    <p className='product-manufacturer'>Manufacturer: {seller}</p>
                    <p className='product-rating'>Rating: {ratings}</p>
                </div>
            </div>
            <button className='btn-cart'>Add to Cart</button>
        </div>
    );
};

export default Product;