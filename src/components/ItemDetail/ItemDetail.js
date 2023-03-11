import { useEffect, useState } from "react";
import { capitalize } from "../../helpers/capitalize";
import Button from 'react-bootstrap/button';
import './ItemDetail.scss'
import { Link } from "react-router-dom";

export function ItemDetail({item, itemsColorVariety}) {
  const [quantity, setQuantity]= useState(1)
  const [radioValue, setRadioValue] = useState('0')
  const [img, setImg] = useState('')
  const sizes = [
    { name: 'XS', value: '0' },
    { name: 'S', value: '1' },
    { name: 'M', value: '2' },
    { name: 'L', value: '3' },
    { name: 'XL', value: '4' },
  ];

  useEffect(()=>{
    item&&
      setImg(item.images.main)
  },[item])

  useEffect(()=>{
    item&&
      quantity>item.availability.stock[radioValue]&&setQuantity(item.availability.stock[radioValue])
  },[radioValue])
  
  const notSizeStyle = (i) => (!item.availability.size[i]?"notAvailable":{})
  const sizeStyle = (i) => {
    if (item.availability.size[i] && item.availability.stock[i]) {
      if (radioValue === i){
        return "available checked"
      }else{
        return "available"
      }
    }else{
      return "disabled"
    }
  }

  const add = () => {
    (item.availability.stock[radioValue] > quantity) && setQuantity(quantity +1)
  }
  const subtract = () => {
    (quantity > 1) && setQuantity(quantity -1)
  }

  return (
        item ?
          <div className="detailContainer">
            <div className="datailImages">
              <div className="detailImagesColumn">
                <img id={item.images.main}  onClick={(e) => setImg(e.currentTarget.id)} src={`../../images/${item.images.main}`} alt={item.name}/>
                {item.images.secondary.map((image) => <img key={image} id={image} onClick={(e) => setImg(e.currentTarget.id)} src={"../../images/"+image} alt={item.name}/>)}
              </div>
              <img src={`../../images/${img}`} alt={item.name}/>
            </div>
            <div className="detailInfo">
              <h3>{capitalize(item.name)+" - "+capitalize(item.color)}</h3>
              <div>
                <p>{item.description}</p>
              </div>
              {itemsColorVariety &&
                <div>
                  <h4>Color</h4>
                  <div className="detailColor">
                    <img className="currentColor" src={"../../images/"+item.images.main} alt={item.color}/>
                    {itemsColorVariety.map((item) => {
                      return(
                        <Link to={`/${item.category}/item/${item.id}`} key={item.images.main} className="otherColor"><img src={"../../images/"+item.images.main} alt={item.color}/></Link>
                      )
                    })}
                  </div>
                </div>
              }
              <div>
                <h4>Size</h4>
                <form className="detailSize">
                  {sizes.map((radio, idx) => (
                    <div key={idx} className={notSizeStyle(radio.value)}>
                      <input type="radio" id={radio.name} value={radio.value} name="size" onChange={(e) => setRadioValue(e.currentTarget.value)} disabled={item.availability.stock[radio.value]===0}/>
                      <label htmlFor={radio.name} className={sizeStyle(radio.value)}>{radio.name}</label>
                    </div>
                  ))}
                </form>
                <div className="detailStock">
                  {item.availability.stock[radioValue]!=null&&
                    <p>{`Stock: ${item.availability.stock[radioValue]}`}</p>
                  }
                </div>
              </div>
              <div>
                <h4>Price</h4>
                {item.sale ? 
                  <div className="detailPrice">
                    <div className="prices">
                      <p className="price">U$S {(item.price - item.discount*item.price/100).toFixed(2)}</p>
                      <p className="canceledPrice">U$S {item.price}</p>
                    </div>
                    <p className="discount">-{item.discount}%</p>
                  </div>
                  :
                  <p className="price">U$S {item.price}</p>
                  }
              </div>
              <div className="detailBuy">
                <Button variant="success">Buy U$S{item.sale ? (quantity*(item.price - item.discount*item.price/100)).toFixed(2) : (quantity*item.price).toFixed(2)}</Button>
                <div className="detailQuantity">
                  <Button variant="outline-danger"  onClick={subtract}>-</Button>
                  <div className="quantity">{quantity}</div>
                  <Button variant="outline-success" onClick={add}>+</Button>
                </div>
              </div>
            </div>
          </div>
        :
          <div></div>
  )
}