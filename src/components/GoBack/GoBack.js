import back from './back.png'
import { useNavigate } from "react-router-dom";
import './GoBack.scss'

export function GoBack ({to}) {
    const navegate = useNavigate()

    const goBack = () => {
        to? navegate(to) : navegate(-1)
    } 

    return (
        <button className="backButton font2" onClick={goBack}>
            <img src={back} alt="Go Back"/>
            Back
        </button>
    )
}