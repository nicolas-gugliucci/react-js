import { CartWidget } from './CartWidget/CartWidget';
import logo from './logo.png'
import './Navbar.scss'

export function Navbar() {
    return (
      <header>
        <h1>Klash & Mor</h1>
        <img src={logo} className='logo'/>
        <nav>
            <ul>
                <li><a href="#">Women</a></li>
                <li><a href="#">Men</a></li>
                <li><a href="#">Kids</a></li>
                <li><a href="#">Accesories</a></li>
                <li><a href="#">Sale</a></li>
            </ul>
        </nav>
        <CartWidget/>
      </header>
    );
}