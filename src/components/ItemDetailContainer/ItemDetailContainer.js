import { useEffect, useState } from "react"
import { ItemDetail } from "../ItemDetail/ItemDetail"
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";


export function ItemDetailContainer() {
  const {id} = useParams()
  const [item, setItem] = useState(null)
  const [colorVariety, setColorVariety] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const docRef = doc(db, "products", id)
    
    getDoc(docRef)
      .then((doc) => {
        if(doc._document){
          setItem({
            id: doc.id,
            ...doc.data()
          })
        }else{
          navigate(-1)
        }
          
      })
      .catch((error) => {
        console.log(error)
        alert('Oops something went wrong :( \nPlease try again later')
      })
      .finally(()=>{
        setLoading(false)
      })
  },[id, navigate])

  useEffect(() => {
    if(item){
      setLoading(true)
      const productsRef = collection(db, "products")
      const qColorVariety = query(productsRef, where("name", "==", item.name))

      getDocs(qColorVariety)
        .then((response) => {
          const docs = response.docs.map((doc) =>{
            return {...doc.data(), id: doc.id}
          })
          const docsFiltered = docs.filter((doc) => doc.color !== item.color)
          setColorVariety(docsFiltered)
        })
        .catch((error) => {
          console.log(error)
          alert('Oops something went wrong :( \nPlease try again later')
        })
        .finally(()=>{
          setLoading(false)
        })
    }
  },[item])

  return (
      <div className='itemDetailContainer'>
          {loading?
            <Loading/>
          :
            <ItemDetail item={item} itemsColorVariety={colorVariety}/>
          }
      </div>
    );
  }