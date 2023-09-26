import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    //  useState for load Data
    const [products , setProducts] = useState([]);
    // useState for adding new cart
    const [cart , setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    } , []);

    useEffect( () => {
        const storedCart = getShoppingCart();
        const saveCart = [];
        // step 1:
        for(let id in storedCart){
            // step 2 : get the product using id.
            const addedProduct = products.find(product => product.id === id);
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
       addToDb(product.id);
    };
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                    key={product.id} product={product}
                    handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;