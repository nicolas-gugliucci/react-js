import './ItemListContainer.scss'

export function ItemListContainer({category}) {
    return (
      <div className='itemListContainer'>
        <h2 className='font4'>{category}</h2>
        <hr/>
      </div>
    );
}