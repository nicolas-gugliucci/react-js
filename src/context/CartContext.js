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

    return(
        <CartContext.Provider value={{
            cart,
            addTocart,
            quantityInCart, 
            removeFromCart,
            totalQuantity
          }}>
            {children}
        </CartContext.Provider>
    )
}