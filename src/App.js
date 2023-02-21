import './App.css';
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <div>
     <Navbar/>
     <ItemListContainer category='Women'/>
     <ItemListContainer category='Men'/>
     <ItemListContainer category='Kids'/>
     <ItemListContainer category='Accesories'/>
     <ItemListContainer category='Sale'/>
    </div>
  );
}

export default App;
