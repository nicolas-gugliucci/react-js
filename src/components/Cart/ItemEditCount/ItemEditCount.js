import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/button';
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
    ];

    useEffect(()=>{
        editQuantity(product, quantity)
    },[quantity, editQuantity, product])

    const add = () => {
        (product.availability.stock[sizes.indexOf(sizes.find((sizeInArray) => sizeInArray.name === size))] > quantity) && setQuantity(quantity +1)
    }
    const subtract = () => {
        (quantity > 1) && setQuantity(quantity -1)
    }

    return (
            <div className="detailQuantity">
                <Button variant="outline-danger" disabled={quantity<=1} onClick={subtract}>-</Button>
                <div className="quantity">{quantity}</div>
                <Button variant="outline-success" disabled={quantity>=product.availability.stock[sizes.indexOf(sizes.find((sizeInArray) => sizeInArray.name === size))]} onClick={add}>+</Button>
            </div>
    )
}