import { CartWidget } from './CartWidget/CartWidget';
import logo from './logo.png'
import { BsPersonCircle } from 'react-icons/bs'
import './Navbar.scss'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';
import { Button } from 'react-bootstrap';


export function Navbar() {
  const { user, logout } = useContext(LoginContext)
    return (
      <header>
        <Link to="/"><h1 className='font3'>Klash & Mor</h1></Link>
        <Link to="/"><img src={logo} alt="Klash & Mor logo" className='logo'/></Link>
        {user.name
          ? <p className='userWelcome'>{`Welcome ${user.name}`}</p>
          : user.email
            ? <p className='userWelcome'>{`Welcome ${user.email}`}</p>
            : <p></p>
        }
        <nav>
            <ul>
                <li><Link to="/women" className='font4'>Women</Link></li>
                <li><Link to="/men" className='font4'>Men</Link></li>
                <li><Link to="/kids" className='font4'>Kids</Link></li>
                <li><Link to="/accesories" className='font4'>Accesories</Link></li>
                <li><Link to="/sale" className='font4'>Sale</Link></li>
            </ul>
        </nav>
        <CartWidget/>
        {user.email
          ? <Button onClick={logout}>Logout</Button>
          : <Link className='userIcon' to="/login"><BsPersonCircle/></Link>
        }
      </header>
    );
}