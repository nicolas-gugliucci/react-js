import { useEffect, useState } from "react"
import { ItemDetail } from "../ItemDetail/ItemDetail"
import { detailRequest } from '../../helpers/detailRequest';
import { colorVarietyRequest } from '../../helpers/colorVarietyRequest';
import { useParams } from "react-router-dom";


export function ItemDetailContainer() {
  const {id} = useParams()
  const [item, setItem] = useState(null)
  const [colorVariety, setColorVariety] = useState(null)
    useEffect(() => {
      detailRequest(id)
        .then((response) => {
            setItem(response)
        })
        .catch((error) => {
          console.log(error)
          alert('Oops something went wrong :( \nPlease try again in a while')
        })
    },[id])
    useEffect(() => {
      item&&
        colorVarietyRequest(item)
          .then((response) => {
            setColorVariety(response)
          })
          .catch((error) => {
            console.log(error)
            alert('Oops something went wrong :( \nPlease try again in a while')
          })
    },[item,id])
    return (
        <div className='itemDetailContainer'>
            <ItemDetail item={item} itemsColorVariety={colorVariety}/>
        </div>
      );
  }