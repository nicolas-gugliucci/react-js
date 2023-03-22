import Button from 'react-bootstrap/button';
import './ItemCount.scss'

export function ItemCount ({item, radioValue, quantity, setQuantity}) {

    const add = () => {
        (item.availability.stock[radioValue] > quantity) && setQuantity(quantity +1)
    }
    const subtract = () => {
        (quantity > 1) && setQuantity(quantity -1)
    }

    return (
            <div className="detailQuantity">
                <Button variant="outline-danger"  onClick={subtract}>-</Button>
                <div className="quantity">{quantity}</div>
                <Button variant="outline-success" onClick={add}>+</Button>
            </div>
    )
}
