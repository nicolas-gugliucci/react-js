import { Item } from "../Item/Item";
import './ItemList.scss'


export function ItemList({items}) {
    return (
      <div className="itemListConatiner">
        {items.map((product) => <Item key={product.id} item={product}/>)}
      </div>
    );
}