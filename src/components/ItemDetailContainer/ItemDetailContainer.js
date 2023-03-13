import { useEffect, useState } from "react"
import { ItemDetail } from "../ItemDetail/ItemDetail"
import { detailRequest } from '../../helpers/detailRequest';
import { colorVarietyRequest } from '../../helpers/colorVarietyRequest';
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/Loading";


export function ItemDetailContainer() {
  const {id} = useParams()
  const [item, setItem] = useState(null)
  const [colorVariety, setColorVariety] = useState(null)
  const [loading, setLoading] = useState(true)
    useEffect(() => {
      setLoading(true)
      detailRequest(id)
        .then((response) => {
            setItem(response)
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
        colorVarietyRequest(item)
          .then((response) => {
            setColorVariety(response)
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