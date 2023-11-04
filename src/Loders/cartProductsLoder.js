import { getShoppingCart } from "../utilities/fakedb";

const cartProductLoder = async () => {
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();
    
    // if cart data is in database you have use to async await
    const storedCart = getShoppingCart();
    const savedCart = [];
    // console.log(storedCart)
    for(let id in storedCart){
        const addedProduct = products?.find(pd => pd.id === id);
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