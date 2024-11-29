import { useContext } from "react"
import Modal from "./Modal"
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./Input";
import Button from "./Button";
import UserProgressContext from "../store/UserProgresContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
const reqConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

const Checkout = () => {
    const cartContext = useContext(CartContext);
    const usrProgressContext = useContext(UserProgressContext);
    const { error, data, isLoading:isSending, sendRequest, clearData } = useHttp('http://localhost:3000/orders',reqConfig);
    const cartTotal = cartContext.items.reduce((total, { quantity, price }) => {
        return total + (quantity * price);
    }, 0)
    const handleClose = () => { usrProgressContext.hideCheckout(); }
    const handleFinish = () =>{
        usrProgressContext.hideCheckout();
        cartContext.clearCart();
        clearData();
    }
    const checkoutInProgress = usrProgressContext.progress === 'checkout';

    const handleSubmit = (event) =>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        sendRequest(JSON.stringify({
            order: {
                items: cartContext.items,
                customer: data
            }
        }));
    }

    const actions = isSending ? ( <span>Placing the order...</span> ):
        (<><Button type='button' textOnly onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button></>)

    if (data && !error) {
        return <Modal open={usrProgressContext.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>Tracking details will be sent on email.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }
    return (
        <Modal open={checkoutInProgress}
            onClose={checkoutInProgress ? handleClose : null}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label='Full Name' type='text' id='name' />
                <Input label='Email' type='email' id='email' />
                <Input label='Street' type='text' id='street' />
                <div className="control-row">
                    <Input label='Postal Code' type='text' id='postal-code' />
                    <Input label='City' type='text' id='city' />
                </div>
                {error && <Error title='Failed to submit order' msg={error} />}
                <p className="modal-actions">{actions}</p>                
            </form>
        </Modal>
    )
}

export default Checkout;