import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Shop.css";

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  //  useState for load Data
  const [products, setProducts] = useState([]);
  // useState for adding new cart
  const [cart, setCart] = useState([]);
  const { totalProducts } = useLoaderData();
 

//   const itemsPerPage = 10; //TODO : make it Dynamic
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  console.log(totalPages)
  const pageNumbners = [...Array(totalPages).keys()];
  console.log(pageNumbners);

  const handleCurrentPage = (number) => {
    setCurrentPage(number);
  };

  const options = [5, 10, 20];
  const handleSelectChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };

  /**
   * Done 1. Determine the total number of items:
   * TODO 2. Decide on the number of items per page:
   * Done 3. Calculate the total number of pages:
   * Done 4. Determine the current page:
   * **/

//   useEffect(() => {
// 	async function fetchData(){
// 	const res = await fetch(`https://example.com/api/data?page=${currentPage}&limit=${itemsPerPage}`);
// 	const data = await res.json();
// 	setData(data);
// 	}
// 	fetchData();
// } , [currentPage , itemsPerPage]);

useEffect(() => {
    const fetchData = async () => {
        const res = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
        const data = await res.json();
        console.log(data)
        setProducts(data);
    };
    fetchData();
} , [currentPage , itemsPerPage]);

// useEffect(() => {
//     fetch(`http://localhost:5000/products?page=${currentPage}&size=${itemsPerPage}`)
//         .then(res => res.json())
//         .then(data => setProducts(data))
// }, [currentPage, itemsPerPage]);


  useEffect(() => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    fetch('http://localhost:5000/productsByIds' , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(ids)
    })
    .then((res) => res.json())
    .then(cartProducts => {
        const saveCart = [];
        // step 1:
        for (let id in storedCart) {
          // step 2 : get the product using id.
          const addedProduct = cartProducts.find((product) => product._id === id);
          if (addedProduct) {
            // Step : 3
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            // add the addedProduct to the save cart
            saveCart.push(addedProduct);
          }
        }
        // set the cart
        setCart(saveCart);
    })
  
  }, []);

  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product._id);
  };
  const handleClearToCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <>
      <div className="shop-container">
        <div className="products-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart} handleClearToCart={handleClearToCart}>
            <Link className="common-link" to="/order">
              <button className="btn-common">
                <div>Review Order</div> <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>
      {/* Pagination */}
      <div className="pagination">
        <p>Current Page : {currentPage}</p>
        {pageNumbners?.map((number) => (
          <button key={number} className={currentPage === number ? 'selected' : ''} onClick={() => handleCurrentPage(number)}>
            {number + 1}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
