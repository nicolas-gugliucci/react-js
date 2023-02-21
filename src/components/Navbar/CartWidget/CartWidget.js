import './CartWidget.scss'
import cart from './cart.png'

export function CartWidget() {
    return (
      <div className='cartContainer'>
        <button><img src={cart}/></button>
      </div>
    );
}