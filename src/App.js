import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/CartContext';
import { LoginProvider } from './context/LoginContext';
import { AppRouter } from './routes/AppRouter';


function App() {

  return (
    <div>
      <LoginProvider>
        <CartProvider>
          <AppRouter/>
        </CartProvider>
      </LoginProvider>
    </div>
  );
}

export default App;
