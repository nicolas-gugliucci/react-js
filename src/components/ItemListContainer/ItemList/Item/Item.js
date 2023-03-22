import { Link } from 'react-router-dom'
import { capitalize } from '../../../../helpers/capitalize'
import './Item.scss'

export function Item ({item}) {
    return (
      <div className="cardContainer">
        <Link className="imgContainer" to={`/${item.category}/item/${item.id}`}><img src={`../images/${item.images.main}`} alt={item.name}/></Link>
        <div className='cardInfo'>
          <h5>{capitalize(item.name)+" - "+capitalize(item.color)}</h5>
          {item.sale ? 
            <div className="detailPrice">
              <div className="prices">
                <p className="price">US${(item.price - item.discount*item.price/100).toFixed(2)}</p>
                <p className="canceledPrice">US${item.price}</p>
              </div>
              <p className="discount">-{item.discount}%</p>
            </div>
          :
            <p className="price">US${item.price}</p>
          }
        </div>
      </div>
    )
}