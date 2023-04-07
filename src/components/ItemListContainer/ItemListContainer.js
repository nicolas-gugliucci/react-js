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
import { Form } from 'react-bootstrap';


export function ItemListContainer() {

  const {category} = useParams()
  const [productos, setProducts] = useState([])
  const [subProducts, setSubProducts] = useState([])
  const [displayProducts, setDisplayProducts] = useState(true)
  const [value, setValue] = useState('all')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  useEffect(() => {
    setLoading(true)
    setSubProducts([])
    
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
        setValue('all')
        setDisplayProducts(true)
      })
      .catch((error) => {
        console.log(error)
        alert('Oops something went wrong :( \nPlease try again in a while')
      })
      .finally(() => {
        setLoading(false)
      })
  },[category, navigate])

  const subCategory = (e) => {
    e.preventDefault()
    const actualValue = e.target.value
    setValue(actualValue)
  }

  useEffect(() => {
    setDisplayProducts(true)
    const filtered = productos.filter((item)=> item.section.toUpperCase() === value.toUpperCase())
    if(value === 'all'){
      setSubProducts(productos)
    }else{
      if (filtered.length === 0){
        setDisplayProducts(false)
      }else{
        setSubProducts(filtered)
      }
    }
  },[value, productos])

  return (
    loading?
      <Loading/>
    :
      <div>
        {category&&
          <GoBack to="/"/>  
        }
        <div className='itemListContainer'>
        <div className='categoryHeader'>
          <h2 className='font4'>{category?capitalize(category):"Home"}</h2>
          {category !== 'accesories' && category !== 'sale' &&
            <Form.Select value={value} onChange={subCategory} className='subCategory'>
              <option value='all'> All</option>
              <option value="accesories">Accesories</option>
              <option value="hoodie">Hoodie</option>
              <option value="jacket">Jacket</option>
              <option value="jean">Jean</option>
              <option value="pants">Pants</option>
              <option value="shirt">Shirt</option>
              <option value="sweater">Sweater</option>
              <option value="top">Top</option>
              <option value="tshirt">T-shirt</option>
            </Form.Select>
          }
        </div>
          <hr/>
          {displayProducts
            ? <ItemList items={subProducts.length?subProducts:productos}/>
            : <h4>Oops there are no itmes in this category</h4>
          }
          
        </div>
      </div>
  );
}
