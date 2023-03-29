import { createContext, useState } from "react";

export const CartContext = createContext()

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([])
  
    const addTocart = (item) => {
      setCart([...cart, item])
    }
  
    const removeFromCart = (id, size) =>{
      setCart(cart.filter((prod) => prod.id !== id && prod.size !== size))
    }
  
    const quantityInCart = (id, size) =>{
      const product = cart.find((prod) => prod.id === id && prod.size === size)
      return product? product.quantity : false
    }
  
    const totalQuantity = () => {
      return cart.reduce((acc, prod) => acc + prod.quantity, 0)
    }

    const total = () => {
      return cart.reduce((acc, prod) => acc + (prod.quantity*(prod.sale ? (prod.price - prod.discount*prod.price/100).toFixed(2) : prod.price.toFixed(2))), 0)
    }

    const editQuantity = (product, quantity) => {
      const itemToModify = cart.find((item)=> item===product)
      cart[cart.indexOf(itemToModify)].quantity = quantity
      setCart([...cart])
    }

    const clean = () => {
      setCart([])
    } 

    return(
        <CartContext.Provider value={{
            cart,
            addTocart,
            quantityInCart, 
            removeFromCart,
            totalQuantity,
            editQuantity,
            total,
            clean
          }}>
            {children}
        </CartContext.Provider>
    )
}