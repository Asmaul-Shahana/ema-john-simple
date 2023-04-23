import React from 'react';

const Product = (props) => {
    console.log(props);

    const {id, category,name} = props.product;

    return (
        <div>
                <p>{name}</p>
                <p>{category}</p>
        </div>
    );
};

export default Product;