import React from 'react';
import './Cart.css'
import { deleteShoppingCart } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
const Cart = ({cart, handleClearCart, children}) => {
    // const cart = props.cart; //option1
    // const {cart} = props;   //option2

    let totalPrice=0;
    let totalShipping=0;
    let totalQuantity = 0;
    for(const product of cart)
    {
        // if(product.quantity === 0)
        // {
        //     product.quantity = 1;
        // }
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        totalQuantity = totalQuantity + product.quantity;
    }

    const tax = totalPrice*7/100;
    const grandTotal = totalPrice + totalShipping + tax;
    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {totalQuantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h6>Grand Total: ${grandTotal.toFixed(2)}</h6>
            
            <button className='btn-clear-cart' onClick={handleClearCart}><span>Clear Cart</span>  
            <FontAwesomeIcon icon={faTrashAlt} /></button>
            {children}
        </div>
    );
};

export default Cart;