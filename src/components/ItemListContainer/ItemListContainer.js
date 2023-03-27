import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { capitalize } from '../../helpers/capitalize';
import { dataRequest } from '../../helpers/dataRequest';
import { GoBack } from '../GoBack/GoBack';
import { ItemList } from './ItemList/ItemList';
import { Loading } from '../Loading/Loading';
import './ItemListContainer.scss'


export function ItemListContainer() {

  const {category} = useParams()
  const [productos, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  useEffect(() => {
    setLoading(true)
    dataRequest()
      .then((response) => {
        if(category){
          if(category === "sale"){
            setProducts(response.filter((item) => item.sale))
          }else if(category === "accesories"){
            setProducts(response.filter((item) => item.section === category))
          }else{
            setProducts(response.filter((item) => item.category === category))
            if(!(response.filter((item) => item.category === category).length)){
              navigate("/")
            }
          }
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
  },[category, navigate])

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
          <hr/>
          <ItemList items={productos}/>
        </div>
      </div>
  );
}
