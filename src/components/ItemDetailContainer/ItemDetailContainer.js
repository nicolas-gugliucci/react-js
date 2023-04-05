import { useEffect, useState } from "react"
import { ItemDetail } from "../ItemDetail/ItemDetail"
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";


export function ItemDetailContainer() {
  const {id} = useParams()
  const [item, setItem] = useState(null)
  const [colorVariety, setColorVariety] = useState(null)
  const [loading, setLoading] = useState(true)
    useEffect(() => {
      setLoading(true)
      const docRef = doc(db, "products", id)
      getDoc(docRef)
        .then((doc) => {
            setItem({
              id: doc.id,
              ...doc.data()
            })
        })
        .catch((error) => {
          console.log(error)
          alert('Oops something went wrong :( \nPlease try again in a while')
        })
        .finally(()=>{
          setLoading(false)
        })
    },[id])
    useEffect(() => {
      if(item){
        setLoading(true)
        const productsRef = collection(db, "products")
        const qColorVariety = query(productsRef, where("name", "==", item.name))
        //const qColorVarietyOk = query(qColorVariety, where("color", "!=", item.color))

        getDocs(qColorVariety)
          .then((response) => {
            const docs = response.docs.map((doc) =>{
              return {...doc.data(), id: doc.id}
            })
            setColorVariety(docs)
          })
          .catch((error) => {
            console.log(error)
            alert('Oops something went wrong :( \nPlease try again in a while')
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