import './CartWidget.scss'
import cart from './cart.png'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function CartWidget({itemList}) {
  const [amount, setAmount]= useState(0)
  let amountOfItems = 0

  itemList.forEach((item) => {
    amountOfItems += item.quantity
  })

  useEffect(()=>{
    setAmount(amountOfItems)
  },[amountOfItems])

    return (
      <div className='cartContainer'>
        <Link to="/cart"><img src={cart} alt="cart logo"/></Link>
        <div className='amountOfItems font3'>
          {amount}
        </div>
      </div>
    );
}