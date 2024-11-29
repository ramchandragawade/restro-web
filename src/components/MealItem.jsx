import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Button from "./Button";
import CartContext from "../store/CartContext";

const MealItem = ({item}) =>{
    const cartContext = useContext(CartContext);
    const { description, image, name, price} = item;
    const handleAddMealItem = () => {
        cartContext.addItem(item);
    }
    return <li className="meal-item">
        <article>
            <img src={`http://localhost:3000/${image}`} alt={name+' image'} />
            <div>
                <h3>{name}</h3>
                <p className="meal-item-price">{currencyFormatter.format(price)}</p>
                <p className="meal-item-description">{description}</p>
            </div>
            <p className="meal-item-actions">
                <Button onClick={handleAddMealItem}>Add To Cart</Button>
            </p>
        </article>
    </li>
}

export default MealItem;