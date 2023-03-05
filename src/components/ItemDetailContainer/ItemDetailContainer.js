import { useEffect, useState } from "react"
import { ItemDetail } from "../ItemDetail/ItemDetail"
import { detailRequest } from '../../helpers/detailRequest';


export function ItemDetailContainer({id}) {
    const [item, setItem] = useState(null)
    useEffect(() => {
      detailRequest(id)
        .then((response) => {
            setItem(response)
        })
        .catch((error) => {
          console.log(error)
          alert('Oops something went wrong :( \nPlease try again in a while')
        })
    },[])
  
    return (
        <div className='itemDetailContainer'>
            <ItemDetail item={item}/>
        </div>
      );
  }