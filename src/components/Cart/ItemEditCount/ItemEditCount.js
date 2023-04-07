import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { CartContext } from '../../../context/CartContext';
import './ItemEditCount.scss'

export function ItemEditCount ({product, size, originalQuantity}) {
    const {editQuantity} = useContext(CartContext)
    const [quantity, setQuantity] = useState(originalQuantity)

    const sizes = [
        { name: 'XS', value: '0' },
        { name: 'S', value: '1' },
        { name: 'M', value: '2' },
        { name: 'L', value: '3' },
        { name: 'XL', value: '4' },
        { name: 'UNIQUE SIZE', value: '-1' },
    ];

    useEffect(()=>{
        editQuantity(product, quantity)
        // eslint-disable-next-line
    },[quantity, product])

    let sizeIndex
    if(sizes.indexOf(sizes.find((sizeInArray) => sizeInArray.name === size))===-1){
        sizeIndex = 0
    }else{
        sizeIndex = sizes.indexOf(sizes.find((sizeInArray) => sizeInArray.name === size))
    }

    const add = () => {
        (product.availability.stock[sizeIndex] > quantity) && setQuantity(quantity +1)
    }
    const subtract = () => {
        (quantity > 1) && setQuantity(quantity -1)
    }
   
    return (
            <div className="detailQuantity">
                <Button variant="outline-danger" disabled={quantity<=1} onClick={subtract}>-</Button>
                <div className="quantity">{quantity}</div>
                <Button variant="outline-success" disabled={quantity>=product.availability.stock[sizeIndex]} onClick={add}>+</Button>
            </div>
    )
}