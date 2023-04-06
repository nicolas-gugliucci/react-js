import './App.css';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer';
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import { Navbar } from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Cart } from './components/Cart/Cart';
import { LoginProvider } from './context/LoginContext';
import { LoginScreen } from './components/LoginScreen/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen/RegisterScreen';
import { Checkout } from './components/Checkout/Checkout';
import { useState } from 'react';


function App() {
  const [ userViewExpanded, setUserViewExpanded ] = useState(false)

  return (

    <div>
      <LoginProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar userViewExpanded={userViewExpanded} setUserViewExpanded={setUserViewExpanded}/>
            <div  onClick={()=>setUserViewExpanded(false)}> 
              <Routes>
                <Route path='/login' element={<LoginScreen/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/register' element={<RegisterScreen/>}/>
                <Route path='/' element={<ItemListContainer/>}/>
                <Route path='/:category' element={<ItemListContainer/>}/>
                <Route path='/:category/item/:id' element={<ItemDetailContainer/>}/>
                <Route path='/cart' element={<Cart/>}/>
              </Routes>
            </div>
          </BrowserRouter>
        </CartProvider>
      </LoginProvider>
    
    </div>
  );
}

export default App;
