import './CartWidget.scss'
import cartLogo from './cart.png'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';


export function CartWidget() {
  const {totalQuantity} = useContext(CartContext)
    return (
        <Link className={'linkButton'} to="/cart">
          <img src={cartLogo} alt="cart logo"/>
          <div className='amountOfItems font3'>
            {totalQuantity()}
          </div>
        </Link>
    );
}