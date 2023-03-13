import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { capitalize } from '../../helpers/capitalize';
import { dataRequest } from '../../helpers/dataRequest';
import { GoBack } from '../GoBack/GoBack';
import { ItemList } from '../ItemList/ItemList';
import { Loading } from '../Loading/Loading';
import './ItemListContainer.scss'

export function ItemListContainer() {
  const {category} = useParams()
  const [productos, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setLoading(true)
    dataRequest()
      .then((response) => {
        if(category){
          setProducts(response.filter((item) => item.category === category))
        }else{
          setProducts(response)
        }
      })
      .catch((error) => {
        console.log(error)
        alert('Oops something went wrong :( \nPlease try again in a while')
      })
      .finally(() => {
        setLoading(false)
      })
  },[category])

  return (
    loading?
      <Loading/>
    :
      <div>
        {category&&
          <GoBack to="/"/>  
        }
        <div className='itemListContainer'>
          <h2 className='font4'>{category?capitalize(category):"Home"}</h2>
          <ItemList items={productos}/>
          <hr/>
        </div>
      </div>
  );
}
