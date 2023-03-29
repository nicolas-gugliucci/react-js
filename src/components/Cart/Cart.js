import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { CartContext } from '../../context/CartContext'
import { capitalize } from '../../helpers/capitalize'
import './Cart.scss'
import { ItemEditCount } from './ItemEditCount/ItemEditCount'

export function Cart () {
    const {cart, removeFromCart, totalQuantity} = useContext(CartContext)

    return (
        <div className='totalView'>
            {totalQuantity()?
                cart.map((product) => (
                    <div className='itemContainer' key={`${product.id}_${product.size}`}>
                        <div className="item">
                            <div className='itemSum'>
                                <img src={`./images/${product.images.main}`} alt={product.name}/>
                                <div className='itemSumInfo'>
                                    <h3>{capitalize(product.name)}</h3>
                                    <h4>{`Color: ${capitalize(product.color)}`}</h4>
                                    <h4>{`Size: ${product.size.toUpperCase()}`}</h4>
                                    
                                </div>
                            </div>
                            <div className='priceDiv'>
                                        <div>
                                            <p>Unit price</p>
                                            <p>{`US$${product.sale ? (product.price - product.discount*product.price/100).toFixed(2) : product.price.toFixed(2)}`}</p>
                                        </div>
                                        <div>
                                            <p>Quantity</p>
                                            <p>{`x${product.quantity}`}</p>
                                        </div>
                                        <div>
                                            <strong>Total price</strong>
                                            <strong>{`US$${product.sale ? ((product.price - product.discount*product.price/100)*product.quantity).toFixed(2): (product.price*product.quantity).toFixed(2)}`}</strong>
                                        </div>
                                    </div>
                            <div className='editContent'>
                                <ItemEditCount product={product} size={product.size} originalQuantity={product.quantity}/>
                                <Button onClick={() => removeFromCart(product.id, product.size)}>Remove item</Button>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    ))
            :
                <h2>There are no items in your cart</h2>}
        </div>
    )
}
