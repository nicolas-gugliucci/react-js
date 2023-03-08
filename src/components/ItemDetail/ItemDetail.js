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
  const hovered = (i) => (item.availability.stock[i]?"hovered":"")

  const notSizeStile = (i) => (!item.availability.size[i]?{display: "none"}:{})

  const notAvailabilityStyle = (i) => (!item.availability.stock[i]?{color: "gray", backgroundColor: "rgb(216, 136, 136)"}:{backgroundColor: "rgb(133, 212, 133)"})

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
                  <p>{item.description}</p>
                </div>
                <div>
                  {/*Agregar variedad de color */}
                </div>
                <div>
                  <h4>Size</h4>
                  <form className="detailSize">
                    <div style={notSizeStile(0)}>
                      <input type="radio" id="xs" name="size" disabled={!item.availability.size[0]}/>
                      <label htmlFor="xs" className={hovered(0)} style={notAvailabilityStyle(0)} >XS</label>
                    </div>
                    <div style={notSizeStile(1)}>
                      <input type="radio" id="s" name="size" disabled={!item.availability.size[1]}/>
                      <label htmlFor="s" className={hovered(1)} style={notAvailabilityStyle(1)}>S</label>
                    </div>
                    <div style={notSizeStile(2)}>
                      <input type="radio" id="m" name="size" disabled={!item.availability.size[2]}/>
                      <label htmlFor="m" className={hovered(2)} style={notAvailabilityStyle(2)}>M</label>
                    </div>
                    <div style={notSizeStile(3)}>
                      <input type="radio" id="l" name="size" disabled={!item.availability.size[3]}/>
                      <label htmlFor="l" className={hovered(3)} style={notAvailabilityStyle(3)}>L</label>
                    </div>
                    <div style={notSizeStile(4)}>
                      <input type="radio" id="xl" name="size" disabled={!item.availability.size[4]}/>
                      <label htmlFor="xl" className={hovered(4)} style={notAvailabilityStyle(4)}>XL</label>
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