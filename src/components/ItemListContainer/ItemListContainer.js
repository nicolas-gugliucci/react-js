import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { capitalize } from '../../helpers/capitalize';
import { GoBack } from '../GoBack/GoBack';
import { ItemList } from './ItemList/ItemList';
import { Loading } from '../Loading/Loading';
import './ItemListContainer.scss'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../../firebase/config"


export function ItemListContainer() {

  const {category} = useParams()
  const [productos, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  useEffect(() => {
    setLoading(true)
    const productsRef = collection(db, "products")
    let q
    if(category){
      if(category === "sale"){
        q = query(productsRef, where("sale", "==", true))
      }else if(category === "accesories"){
        q = query(productsRef, where("section", "==", category))
      }else{
        q = query(productsRef, where("category", "==", category))
      }
    }else{
      q = productsRef
    }
    getDocs(q)
      .then((response) => {
        if(response.docs.length){
          const docs = response.docs.map((doc) =>{
            return {...doc.data(), id: doc.id}
          })
          setProducts(docs)
        }else{
          navigate("/")
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
