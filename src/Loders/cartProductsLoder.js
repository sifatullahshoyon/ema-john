import { getShoppingCart } from "../utilities/fakedb";

const cartProductLoder = async () => {
    // if cart data is in database you have use to async await
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    const loadedProducts = await fetch(`http://localhost:5000/products?page=0&limit=1000` , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(ids)
    });
    const products = await loadedProducts.json();
    
    
    const savedCart = [];
    // console.log(storedCart)
    for(let id in storedCart){
        const addedProduct = products?.find(pd => pd._id === id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        };
    };

    // if you need to send two things
    // return [products , savedCart];
    // return {product , savedCart};

    return savedCart;
};

export default cartProductLoder;