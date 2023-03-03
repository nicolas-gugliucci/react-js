import './Item.scss'

export function Item ({item}) {
    return (
      <div className="cardContainer">
        {/* eslint-disable-next-line */}
        <a href="#"><img src={"../images/"+item.images.main} alt={item.name}/></a>
        <div className='cardInfo'>
          <h5>{item.name}</h5>
          <p>U$S {item.price}</p>
        </div>
      </div>
    )
}