import './ItemPrice.scss'

export function ItemPrice ({item}) {
    return (
        <div>
            <h4>Price</h4>
            {item.sale ? 
                <div className="detailPrice">
                    <div className="prices">
                        <p className="price">US${(item.price - item.discount*item.price/100).toFixed(2)}</p>
                        <p className="canceledPrice">US${item.price}</p>
                    </div>
                    <p className="discount">-{item.discount}%</p>
                </div>
                :
                <div className="detailPrice">
                    <div className="prices">
                        <p className="price">US${item.price}</p>
                    </div>
                </div>
            }
        </div>
    )
}