import './RecipeCard.css'
import {useContext} from "react";
import UserContext from "../User/User";

export default RecipeCard;

function RecipeCard({image, name, cookTime, prepTime, recipeYield, desc, ingredients, viewName, changeView}) {
    const user = useContext(UserContext);

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
                    viewName !== name ? <button type="button" onClick={viewRecipe}>View Recipe</button> :
                        <section>
                            <p>{desc}</p>
                            <h3 className={'ingredient-header'}>Ingredients</h3>
                            <ul className={"ingredient-list"}>
                                {
                                    ingredients.map(item =>
                                        <li>
                                            {item} <button type={"button"} onClick={() => addItem(user, item)}>+</button>
                                        </li>
                                    )
                                }
                            </ul>
                        </section>
                }
                <button type="button">Add to Favorites</button>
            </section>
        </article>
    );
}

const addItem = (user, item) => {
    user.groceryList.push(item)
}