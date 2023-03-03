import { useEffect } from 'react'
import { useState } from 'react'
import { capitalize } from '../../helpers/capitalize';
import { dataRequest } from '../../helpers/dataRequest';
import { ItemList } from '../ItemList/ItemList';
import './ItemListContainer.scss'

export function ItemListContainer({category}) {
  const [productos, setProducts] = useState([])
  
  useEffect(() => {
    dataRequest()
      .then((response) => {
        setProducts(response)
      })
      .catch((error) => {
        console.log(error)
        alert('Oops something went wrong :( \nPlease try again in a while')
      })
  },[])

  return (
      <div className='itemListContainer'>
        <h2 className='font4'>{capitalize(category)}</h2>
        <ItemList items={productos}/>
        <hr/>
      </div>
    );
}