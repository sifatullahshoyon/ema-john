import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './ReviewItem.css';

const ReviewItem = ({product , handleRemoveFromCart}) => {
    const {id , img , name , price , quantity} = product;
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className='review-details'>
                <h6 className='product-title'>{name}</h6>
                <p className='product-price'>Price: <span className='orange-text'>${price}</span></p>
                <p className='product-quantity'>Order Quantity:<span className='orange-text'>{quantity}</span></p>
            </div>
            <button onClick={() => handleRemoveFromCart(id)} className='btn-delete'><FontAwesomeIcon icon={faTrashAlt} className='delete-icon' /></button>
        </div>
    );
};

export default ReviewItem;