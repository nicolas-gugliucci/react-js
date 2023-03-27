import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { CartContext } from '../../context/CartContext'
import './Cart.scss'

export function Cart () {
    const {cart, removeFromCart, totalQuantity} = useContext(CartContext)

    return (
        <div className='halfView'>
            {totalQuantity()?
                cart.map((product) => (
                    <div key={product.id}>
                        <img src={`./images/${product.images.main}`} alt={product.name}/>
                        <div>
                            <h3>{`${product.name} - ${product.color}`}</h3>
                            <h4>{`Size: ${product.size}`}</h4>
                            <p>{`Unit price: ${product.sale ? (product.price - product.discount*product.price/100).toFixed(2) : product.price.toFixed(2)}`}</p>
                            <p>{`x${product.quantity}`}</p>
                            <p>{`Total price: ${product.sale ? ((product.price - product.discount*product.price/100)*product.quantity).toFixed(2): (product.price*product.quantity).toFixed(2)}`}</p>
                        </div>
                        <div>

                            <Button onClick={() => removeFromCart(product.id, product.size)}>Remove item</Button>
                        </div>
                    </div>))
            :
                <h2>There are no items in your cart</h2>}
        </div>
    )
}
