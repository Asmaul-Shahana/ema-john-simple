import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight, faArrowRight, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {

    // product
    const [products, setProducts] = useState([]);
    // Cart
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
    // ====== Easy solution: If u use this then give the condition of if in cart.jsx
    //    const newCart = [...cart, product];
    //    setCart(newCart);
    //    addToDb(product.id);



    // ====== Harder approach: If u use this then comment the if condition in cart.jsx for checking product.quanntity === 0
        let newCart = [];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exists update quantity by 1
        const exists = cart.find(pd => pd.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id!== product.id);
            newCart = [...remaining, exists];
        }
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
            // console.log(addedProduct, id);
        }
        // step 5: set data
        setCart(savedCart);

    }, [products]);

    const handleClearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}
                handleClearCart={handleClearCart}
                >
                    <Link to="/orders" className='proceed-link'>
                    <button className='btn-proceed'>Review Order
                    <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;