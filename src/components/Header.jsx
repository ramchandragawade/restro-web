import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgresContext";
export default function Header(){
    const cartContext = useContext(CartContext);
    const usrProgressContext = useContext(UserProgressContext);
    const handleShowCart =() => usrProgressContext.showCart();
    const totalItems = cartContext.items.reduce((sum, itm)=>{
        return sum + itm.quantity; 
    },0)
    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="Lava Cucina" />
            <h1>Lava Cucina</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart({totalItems})</Button>
        </nav>
    </header>
}