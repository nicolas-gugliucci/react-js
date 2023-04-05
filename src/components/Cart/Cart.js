import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { CartContext } from '../../context/CartContext'
import { capitalize } from '../../helpers/capitalize'
import './Cart.scss'
import { ItemEditCount } from './ItemEditCount/ItemEditCount'
import { BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import { GoBack } from '../GoBack/GoBack'

export function Cart () {
    const {cart, removeFromCart, totalQuantity, total, clean} = useContext(CartContext)

    return (
        <div>
            <GoBack/>
            {totalQuantity()?
                <div className='totalView'>
                    <div className='halfView'>
                        {cart.map((product) => (
                            <div className='itemContainer' key={`${product.id}_${product.size}`}>
                                <div className="item">
                                    <div className='itemSum'>
                                        <Link to={`/${product.category}/item/${product.id}`}>
                                            <img src={`${product.images.main}`} alt={product.name}/>
                                        </Link>
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
                                        <Button variant="outline-danger" className='delateButton' onClick={() => removeFromCart(product.id, product.size)}><BsFillTrashFill/></Button>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        ))}
                        <Button variant='danger' onClick={clean}>Clean cart</Button>
                    </div>
                    <div className='halfView totalSum'>
                        <h2>{`Total: US$${total().toFixed(2)}`}</h2>
                        <Link to={"/checkout"} variant='success'>Buy</Link>
                    </div>
                </div>
            :
                <h2>There are no items in your cart</h2>}
        </div>
    )
}
