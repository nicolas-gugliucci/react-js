import { useContext, useState } from "react"
import { LoginContext } from "../context/LoginContext"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginScreen } from "../components/LoginScreen/LoginScreen";
import { Checkout } from "../components/Checkout/Checkout";
import { RegisterScreen } from "../components/RegisterScreen/RegisterScreen";
import { ItemListContainer } from "../components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "../components/ItemDetailContainer/ItemDetailContainer";
import { Cart } from "../components/Cart/Cart";
import { HistoricalOrders } from "../components/HistoricalOrders/HistoricalOrders";
import { Navbar } from "../components/Navbar/Navbar";


export const AppRouter = () => {

    const { user } = useContext(LoginContext)
    const [ userViewExpanded, setUserViewExpanded ] = useState(false)

    return (
        <BrowserRouter>
            <Navbar userViewExpanded={userViewExpanded} setUserViewExpanded={setUserViewExpanded}/>
            <div  onClick={()=>setUserViewExpanded(false)}> 
                <Routes>
                    {
                    user.logged 
                        &&   <Route path='/orders' element={<HistoricalOrders/>}/>
                    }
                    <Route path='/login' element={<LoginScreen/>}/>
                    <Route path='/checkout' element={<Checkout/>}/>
                    <Route path='/register' element={<RegisterScreen/>}/>
                    <Route path='/' element={<ItemListContainer/>}/>
                    <Route path='/:category' element={<ItemListContainer/>}/>
                    <Route path='/:category/item/:id' element={<ItemDetailContainer/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}