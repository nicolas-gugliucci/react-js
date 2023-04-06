import { CartWidget } from './CartWidget/CartWidget';
import logo from './logo.png'
import { BsPersonCircle } from 'react-icons/bs'
import './Navbar.scss'
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { LoginContext } from '../../context/LoginContext';
import { Button } from 'react-bootstrap';


export function Navbar({userViewExpanded, setUserViewExpanded}) {
  const { user, logout } = useContext(LoginContext)
  

  const userExpand = () => {
    const prevState = !userViewExpanded
    setUserViewExpanded(prevState)
    console.log(userViewExpanded)
  }

  const display = () => userViewExpanded? "": "ocult"

    return (
      <header>
        <Link className='name' to="/"><h1 className='font3'>Klash & Mor</h1></Link>
        <Link to="/"><img src={logo} alt="Klash & Mor logo" className='logo'/></Link>
        <div className='navAndUser'>
          <div className='navContainer'>
            <div className='cart'>
              <CartWidget/>
            </div>
            <nav>
                <ul>
                    <li><Link to="/women" className='font4'>Women</Link></li>
                    <li><Link to="/men" className='font4'>Men</Link></li>
                    <li><Link to="/kids" className='font4'>Kids</Link></li>
                    <li><Link to="/accesories" className='font4'>Accesories</Link></li>
                    <li><Link to="/sale" className='font4'>Sale</Link></li>
                </ul>
            </nav>
          </div>
          
          <div className='userInfo'>
            <Button onClick={userExpand} variant='outline-dark' className='userIcon'><BsPersonCircle/></Button>
            {user.name
              ? <p className='userWelcome font4'>{`Welcome ${user.name}`}</p>
              : user.email 
                ? <p className='userWelcome font4'>{`Welcome ${user.email}`}</p>
                : <p></p>
            }
          </div>
          
          {userViewExpanded
            && user.email
              ? <div className={`userOptions ${display()}`}>
                  <Button onClick={logout}>Logout</Button>
                </div>
              : <div className={`userOptions ${display()}`}>
                  <Link className='userIcon' to="/login">Login</Link>
                  <Link className='userIcon' to="/register">Sing up</Link>
                </div>
          }
        </div>
        
      </header>
    );
}