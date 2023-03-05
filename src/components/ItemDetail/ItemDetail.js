import { useState } from "react";
import { capitalize } from "../../helpers/capitalize";
import './ItemDetail.scss'

export function ItemDetail({item}) {
  let [quantity, setQuantity]= useState(1)
  const add = () => {
    (item.availability.stock[0] > quantity) && setQuantity(quantity +1)//conectar tope con stock!
  }
  const subtract = () => {
    (quantity > 1) && setQuantity(quantity -1)
  }
  

    return (
          item ?
            <div className="detailContainer">
              <div className="datailImages">
                <div className="detailImagesColumn">
                  <img src={"../images/"+item.images.main} alt={item.name}/>
                  {item.images.secondary.map((image) => <img key={image} src={"../images/"+image} alt={item.name}/>)}
                </div>
                <img src={"../images/"+item.images.main} alt={item.name}/>
              </div>
              <div className="detailInfo">
                <h3>{capitalize(item.name)+" - "+capitalize(item.color)}</h3>
                <div>
                  <h4>Description</h4>
                  <p>{item.description}</p>
                </div>
                <div>
                  {/*Agregar variedad de color */}
                </div>
                <div>
                  <h4>Size</h4>
                  <form className="detailSize">
                    <div>
                      <input type="radio" id="xs" name="size" disabled={!item.availability.size[0]}/>
                      <label htmlFor="xs">XS</label>
                    </div>
                    <div>
                      <input type="radio" id="s" name="size" disabled={!item.availability.size[1]}/>
                      <label htmlFor="s">S</label>
                    </div>
                    <div>
                      <input type="radio" id="m" name="size" disabled={!item.availability.size[2]}/>
                      <label htmlFor="m">M</label>
                    </div>
                    <div>
                      <input type="radio" id="l" name="size" disabled={!item.availability.size[3]}/>
                      <label htmlFor="l">L</label>
                    </div>
                    <div>
                      <input type="radio" id="xl" name="size" disabled={!item.availability.size[4]}/>
                      <label htmlFor="xl">XL</label>
                    </div>
                  </form>
                </div>
                <div>
                  {/*Agregar stock segun seleccion */}
                </div>
                <div>
                  <h5>Price</h5>
                  {item.sale ? 
                    <div className="detailPrice">
                      <p>U$S {(item.price - item.discount*item.price/100).toFixed(2)}</p>
                      <p className="canceledPrice">U$S {item.price}</p>
                      <p className="discount">-{item.discount}%</p>
                    </div>
                    :
                    <p>U$S {item.price}</p>
                    }
                </div>
                <div className="detailQuantity">
                  <button onClick={subtract}>-</button>
                  <div>{quantity}</div>
                  <button onClick={add}>+</button>
                </div>
                <button>Buy</button>{/*Agregar precio segun quantity! */}
              </div>
            </div>
            :
            <div></div>
    )
}