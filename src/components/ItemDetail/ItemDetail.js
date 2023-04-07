import { useContext, useEffect, useState } from "react";
import { capitalize } from "../../helpers/capitalize";
import { GoBack } from '../GoBack/GoBack';
import { CiEdit } from 'react-icons/ci';
import './ItemDetail.scss'
import { ItemCount } from "./ItemCount/ItemCount";
import { ItemPrice } from "./ItemPrice/ItemPrice";
import { ItemSize } from "./ItemSize/ItemSize";
import { ItemColor } from "./ItemColor/ItemColor";
import { ItemImages } from "./ItemImages/ItemImages";
import { CartContext } from "../../context/CartContext";
import { Button } from 'react-bootstrap';

export function ItemDetail({item, itemsColorVariety}) {
  const {addTocart, quantityInCart, removeFromCart} = useContext(CartContext)
  const [quantity, setQuantity]= useState(1)

  const initialValue = item.availability.stock.indexOf(item.availability.stock.find((size) => size))
  
  const [radioValue, setRadioValue] = useState(String(initialValue))
  const [img, setImg] = useState('')
  const [size, setSize] = useState(true)

  const sizes = [
    { name: 'XS', value: '0' },
    { name: 'S', value: '1' },
    { name: 'M', value: '2' },
    { name: 'L', value: '3' },
    { name: 'XL', value: '4' },
    { name: 'Unique size', value: '-1' }
  ];
  
  useEffect(()=>{
    item&&
      setImg(item.images.main)
      setSize(item.availability.size.filter((size) => size === true).length !== 0)
      !size&&setRadioValue("-1")
  },[item, size])

  useEffect(()=>{
    item &&
    radioValue !== "-1" &&
    item.availability.stock[radioValue] &&
    quantity>item.availability.stock[radioValue] && 
    setQuantity(item.availability.stock[radioValue])
  },[radioValue, item, quantity])

  const obtainSize = () => {
    return sizes[sizes.indexOf(sizes.find((size) => size.value === radioValue))].name
  }

  const includeItem = () => {
    const newItem ={
      ...item,
      quantity,
      size: obtainSize()
    }
    addTocart(newItem)
  }

  const editItem = () => {
    setQuantity(quantityInCart(item.id, obtainSize()))
    removeFromCart(item.id, obtainSize())
  }
  
  return (
        item ?
          <div>
            <GoBack/>
            <div className="detailContainer">
              <ItemImages item={item} img={img} setImg={setImg}/>
              <div className="detailInfo">
                <h3>{capitalize(item.name)+" - "+capitalize(item.color)}</h3>
                <div>
                  {item.description &&
                    <p>{capitalize(item.description)}</p>
                  }
                </div>
                {itemsColorVariety &&
                    <ItemColor item={item} itemsColorVariety={itemsColorVariety}/>
                }
                <ItemSize item={item} radioValue={radioValue} setRadioValue={setRadioValue} size={size}/>
                <ItemPrice item={item}/>
                {initialValue === -1 
                  ? <strong>Sold out</strong>
                  : <div>
                      {quantityInCart(item.id, obtainSize())?
                        <div className="detailEdit">
                          <p>{quantityInCart(item.id, obtainSize())} on cart</p>
                          <Button variant="outline-primary" className="detailEditbutton" onClick={editItem}><CiEdit className="editIcon"/></Button>
                        </div>
                        :
                        <div className="detailBuy">
                          <Button variant="success" onClick={includeItem}>Buy US${item.sale ? (quantity*(item.price - item.discount*item.price/100)).toFixed(2) : (quantity*item.price).toFixed(2)}</Button>
                          <ItemCount item={item} radioValue={radioValue} quantity={quantity} setQuantity={setQuantity}/>
                        </div>
                      }
                    </div>
                }
              </div>
            </div>
          </div>
        :
          <div></div>
  )
}