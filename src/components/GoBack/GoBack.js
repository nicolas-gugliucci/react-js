import back from './back.png'
import { useNavigate } from "react-router-dom";
import './GoBack.scss'

export function GoBack ({to}) {
    const navigate = useNavigate()

    const goBack = () => {
        to? navigate(to) : navigate(-1)
    } 

    return (
        <button className="backButton font2" onClick={goBack}>
            <img src={back} alt="Go Back"/>
            Back
        </button>
    )
}