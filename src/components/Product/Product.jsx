import React from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    // console.log(props);

    const { img, name, price, seller, rating } = props.product;
    const handleAddToCart = props.handleAddToCart;
    return (
        <div className='product'>
            <img src={img} alt="product-image" />
            <div className="product-info">
                <h6 className='product-name'>{name}</h6>
                <p>Price: ${price}</p>
                <p>Manufacturer: {seller}</p>
                <p>Rating: {rating} stars</p>
            </div>
            <button onClick={() => handleAddToCart(props.product)} className="btn-cart">Add to Cart
                <FontAwesomeIcon icon={faCartPlus} />
            </button>
        </div>
    );
};

export default Product;