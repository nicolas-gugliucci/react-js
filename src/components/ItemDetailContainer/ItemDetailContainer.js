import { useEffect, useState } from "react"
import { ItemDetail } from "../ItemDetail/ItemDetail"
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export function ItemDetailContainer() {
  const {id} = useParams()
  const [item, setItem] = useState(null)
  const [colorVariety, setColorVariety] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const MySwal = withReactContent(Swal)
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
        console.log(error.message)
        MySwal.fire({
            icon: 'error',
            html: "Oops something went wrong :( <br/>Please try again later",
        })
      })
      .finally(()=>{
        setLoading(false)
      })
  },[id, navigate])

  useEffect(() => {
    const MySwal = withReactContent(Swal)
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
          console.log(error.message)
          MySwal.fire({
            icon: 'error',
            html: "Oops something went wrong :( <br/>Please try again later",
          })
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