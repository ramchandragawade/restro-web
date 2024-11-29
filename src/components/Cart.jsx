import { useContext, useEffect } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "./Button";
import UserProgressContext from "../store/UserProgresContext";
import CartItem from "./CartItem";

const Cart = () => {
    const cartContext = useContext(CartContext);
    const usrProgressContext = useContext(UserProgressContext);
    const cartTotal = cartContext.items.reduce((total, { quantity, price }) => {
        return total + (quantity * price);
    }, 0)

    const handleCloseCart = () => { usrProgressContext.hideCart() }
    const handleGoToCheckout = () => { usrProgressContext.showCheckout() }
    const isCartOpen = usrProgressContext.progress === 'cart';

    return (
        <Modal className="cart"
            open={isCartOpen}
            onClose={isCartOpen ? handleCloseCart : null}
            >
            <h2>Your Cart</h2>
            <ul>
                {cartContext.items.map(itm => (
                    <CartItem
                        key={itm.id}
                        name={itm.name}
                        quantity={itm.quantity}
                        price={itm.price}
                        onIncrease={() => { cartContext.addItem(itm) }}
                        onDecrease={() => { cartContext.removeItem(itm.id) }}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartContext.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>)
}

export default Cart;