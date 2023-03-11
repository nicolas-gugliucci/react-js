import { Link } from 'react-router-dom'
import { capitalize } from '../../helpers/capitalize'
import './Item.scss'

export function Item ({item}) {
    return (
      <div className="cardContainer">
        <Link className="imgContainer" to={`/${item.category}/item/${item.id}`}><img src={"../images/"+item.images.main} alt={item.name}/></Link>
        <div className='cardInfo'>
          <h5>{capitalize(item.name)+" - "+capitalize(item.color)}</h5>
          <p>U$S {item.price}</p>
        </div>
      </div>
    )
}