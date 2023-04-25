import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';


const Shop = () => {

    // product
    const [products, setProducts] = useState([]);
    // Cart
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
       const newCart = [...cart, product];
       setCart(newCart);
       addToDb(product.id);
    }

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect( () =>{
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id
        for(const id in storedCart)
        {
            // step 2: get the product using id
            const addedProduct = products.find(product => product.id === id);
            //step 3: get quantity of the product
            if(addedProduct)
            {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the addedProduct to saved cart
                savedCart.push(addedProduct);
            }
            console.log(addedProduct, id);
        }
        // step 5: set data
        setCart(savedCart);

    }, [products]);

    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;