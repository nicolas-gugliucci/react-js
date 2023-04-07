import Button from 'react-bootstrap/button';
import './ItemCount.scss'

export function ItemCount ({item, radioValue, quantity, setQuantity}) {

    const add = () => {
        if(radioValue === "-1"){
            (item.availability.stock[0] > quantity) && setQuantity(quantity +1)
        }else{
            (item.availability.stock[radioValue] > quantity) && setQuantity(quantity +1)
        }
    }
    const subtract = () => {
        (quantity > 1) && setQuantity(quantity -1)
    }

    return (
            <div className="detailQuantity">
                <Button variant="outline-danger" disabled={quantity<=1} onClick={subtract}>-</Button>
                <div className="quantity">{quantity}</div>
                {radioValue==="-1"
                ?<Button variant="outline-success" disabled={quantity>=item.availability.stock[0]} onClick={add}>+</Button>
                :<Button variant="outline-success" disabled={quantity>=item.availability.stock[radioValue]} onClick={add}>+</Button>
                }
            </div>
    )
}
