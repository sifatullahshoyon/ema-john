import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Shop.css'

const Shop = () => {
    //  useState for load Data
    const [products , setProducts] = useState([]);
    // useState for adding new cart
    const [cart , setCart] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    } , []);

    useEffect( () => {
        const storedCart = getShoppingCart();
        const saveCart = [];
        // step 1:
        for(let id in storedCart){
            // step 2 : get the product using id.
            const addedProduct = products.find(product => product._id === id);
           if(addedProduct){
            // Step : 3
            const quantity = storedCart[id];
            addedProduct.quantity =  quantity;
            // add the addedProduct to the save cart
            saveCart.push(addedProduct);
           }
        }
        // set the cart
        setCart(saveCart);
    } , [products]);

    const handleAddToCart = (product) => {
       const newCart = [...cart , product];
       setCart(newCart);
       addToDb(product._id);
    };
    const handleClearToCart = () => {
        setCart([]);
        deleteShoppingCart();
    };
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                    key={product._id} product={product}
                    handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart} handleClearToCart={handleClearToCart} ><Link className='common-link' to='/order'><button className='btn-common'><div>Review Order</div> <FontAwesomeIcon icon={faArrowRight} /></button></Link></Cart>
            </div>
        </div>
    );
};

export default Shop;