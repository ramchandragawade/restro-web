import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const reqConfig = {};

const Meals = () => {
    const {data:meals, isLoading, error} = useHttp('http://localhost:3000/meals',reqConfig,[]);
    
    if(isLoading) {
        return <p className="center">Fetching items...</p>
    }
    if(error) {
        return <Error msg={error} title='Failed to fetch meals'/>
    }

    return <ul id="meals">
        {meals.map(m=>{
            return <MealItem key={m.id} item={m}/>
        })}
    </ul>
}
export default Meals;