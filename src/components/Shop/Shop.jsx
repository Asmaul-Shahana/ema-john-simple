import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';


const Shop = () => {

    const [products, setProducts] = useState([]);

    useEffect( () => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, []);

    return (
        <div className='shop-container'>
            <div className='product-container'>
            <h2>Products are here</h2>
            {
                products.map(product => <Product key={product.id} product={product}></Product>)
            }
            </div>
            <div className="cart-container">
            <h2>Cart here</h2>
            </div>
        </div>
    );
};

export default Shop;