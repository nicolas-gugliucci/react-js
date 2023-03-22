import './Cart.scss'

export function Cart ({itemList}) {
    return (
        <div className='halfView'>
            {quantity?
                <div>
                    {itemList.map((product) => <Item key={product.id} item={product}/>)}
                </div>
            :
                <h2>There are no items in your cart</h2>}
        </div>
    )
}
