import { CartWidget } from './CartWidget/CartWidget';
import logo from './logo.png'
import searchLogo from './searchLogo.png'
import './Navbar.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export function Navbar() {
    return (
      <header>
        <h1 className='font3'>Klash & Mor</h1>
        <img src={logo} className='logo'/>
        <nav>
            <ul>
                <li><a href="#" className='font4'>Women</a></li>
                <li><a href="#" className='font4'>Men</a></li>
                <li><a href="#" className='font4'>Kids</a></li>
                <li><a href="#" className='font4'>Accesories</a></li>
                <li><a href="#" className='font4'>Sale</a></li>
            </ul>
            <Form className='search'>
              <Button className='searchIcon' type="submit">
                <img src={searchLogo}/>
              </Button>
              <Form.Control className='searchTextbox font4' type="search" placeholder="Type to Search..." />
            </Form>
        </nav>
        <CartWidget/>
      </header>
    );
}