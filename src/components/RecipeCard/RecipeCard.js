import './RecipeCard.css'
import {useContext} from "react";
import { FaHeart, FaEye } from "react-icons/fa"
import UserContext from "../User/User";

export default RecipeCard;

function RecipeCard({image, name, cookTime, prepTime, recipeYield, desc, ingredients, viewName, changeView, setUser}) {
    const user = useContext(UserContext);

    const addItem = (item) => {
        // Make a copy of state groceryList with selected item.
        let groceryList = Array.from(user.groceryList);
        if (!groceryList.includes(item)) {
            groceryList.push(item);
        }

        // Update groceryList state of App.
        setUser({name: user.name, groceryList: groceryList})
    }

    const viewRecipe = (event) => {
        event.preventDefault()

        let newView = {
            name: name,
            content: {
                image: image,
                name: name,
                cookTime: cookTime,
                prepTime: prepTime,
                recipeYield: recipeYield,
                desc: desc,
                ingredients: ingredients,
            }
        }
        console.log("Changing view to " + newView.name);
        changeView(newView);
    }

    return(
        <article className={viewName !== name ? "recipe-card": "detail-recipe-card"}>
            <img className="recipe" src={image} alt={"Some Recipe."}/>
            <section className={"recipe-body"}>
                <h3>{name} Recipe</h3>
                <p><strong>Cook Time: </strong>{cookTime}</p>
                <p><strong>Prep Time: </strong>{prepTime}</p>
                <p><strong>Yield: </strong>{recipeYield}</p>
                {
                    viewName !== name ? <button className={"recipe-button"} type="button" onClick={viewRecipe}>
                                        <FaEye/>  View Recipe</button> :
                        <section>
                            <p>{desc}</p>
                            <h3 className={'ingredient-header'}>Ingredients</h3>
                            <ul className={"ingredient-list"}>
                                {
                                    ingredients.map(item =>
                                        <li key={item}>
                                            {item} <button type={"button"} onClick={() => addItem(item)}>+</button>
                                        </li>
                                    )
                                }
                            </ul>
                        </section>
                }
                <button className={"recipe-button"} type="button"><FaHeart/> Add to Favorites</button>
            </section>
        </article>
    );
}
