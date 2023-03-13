import { CartWidget } from './CartWidget/CartWidget';
import logo from './logo.png'
import searchLogo from './searchLogo.png'
import './Navbar.scss'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';


export function Navbar() {
    return (
      <header>
        <Link to="/"><h1 className='font3'>Klash & Mor</h1></Link>
        <Link to="/"><img src={logo} alt="Klash & Mor logo" className='logo'/></Link>
        <nav>
            <ul>
                <li><Link to="/women" className='font4'>Women</Link></li>
                <li><Link to="/men" className='font4'>Men</Link></li>
                <li><Link to="/kids" className='font4'>Kids</Link></li>
                <li><Link to="/accesories" className='font4'>Accesories</Link></li>
                <li><Link to="/sale" className='font4'>Sale</Link></li>
            </ul>
            <Form className='search'>
              <Button className='searchIcon' type="submit">
                <img src={searchLogo} alt="Search logo"/>
              </Button>
              <Form.Control className='searchTextbox font4' type="search" placeholder="Type to Search..." />
            </Form>
        </nav>
        <CartWidget/>
      </header>
    );
}