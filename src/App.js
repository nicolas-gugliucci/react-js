import './App.css';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer';
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <div>
      <Navbar/>
      {/* <ItemListContainer category='women'/>
      <ItemListContainer category='men'/>
      <ItemListContainer category='kids'/>
      <ItemListContainer category='accesories'/>
      <ItemListContainer category='sale'/> */}
      <ItemDetailContainer id='1'/>
    </div>
  );
}

export default App;
