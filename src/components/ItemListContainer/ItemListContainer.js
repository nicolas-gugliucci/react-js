import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { capitalize } from '../../helpers/capitalize';
import { dataRequest } from '../../helpers/dataRequest';
import { ItemList } from '../ItemList/ItemList';
import './ItemListContainer.scss'

export function ItemListContainer() {
  const {category} = useParams()
  const [productos, setProducts] = useState([])
  
  useEffect(() => {
    dataRequest()
      .then((response) => {
        if(category){
          setProducts(response.filter((item) => item.category === category))
          console.log(category)
        }else{
          setProducts(response)
        }
      })
      .catch((error) => {
        console.log(error)
        alert('Oops something went wrong :( \nPlease try again in a while')
      })
  },[category])

  return (
      <div className='itemListContainer'>
        <h2 className='font4'>{category?capitalize(category):"Home"}</h2>
        <ItemList items={productos}/>
        <hr/>
      </div>
    );
}