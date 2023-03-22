import { Link } from "react-router-dom";
import './ItemColor.scss'

export function ItemColor ({item, itemsColorVariety}) {
    return (
        <div>
            <h4>Color</h4>
            <div className="detailColor">
                <img className="currentColor" src={`../../images/${item.images.main}`} alt={item.color}/>
                {itemsColorVariety.map((item) => {
                    return(
                        <Link to={`/${item.category}/item/${item.id}`} key={item.images.main} className="otherColor"><img src={`../../images/${item.images.main}`} alt={item.color}/></Link>
                    )
                })}
            </div>
        </div>
    )
}