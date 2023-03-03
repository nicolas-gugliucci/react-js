import './App.css';
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <div>
     <Navbar/>
     <ItemListContainer category='women'/>
     <ItemListContainer category='men'/>
     <ItemListContainer category='kids'/>
     <ItemListContainer category='accesories'/>
     <ItemListContainer category='sale'/>
    </div>
  );
}

export default App;
