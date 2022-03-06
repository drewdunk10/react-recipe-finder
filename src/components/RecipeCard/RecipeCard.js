import './RecipeCard.css'
import {useContext, useState} from "react";
import UserContext from "../User/User";

export default RecipeCard;

// TODO: Create a separate view/page for viewing ingredients and description
function RecipeCard({image, name, cookTime, prepTime, recipeYield, desc, ingredients}) {
    const [isHidden, setHidden] = useState(true)
    const user = useContext(UserContext);

    return(
        <article className="recipe-card">
            <img className="recipe" src={image} alt={"Some Recipe."}/>
            <section className={"recipe-body"}>
                <h3>{name} Recipe</h3>
                <p><strong>Cook Time: </strong>{cookTime}</p>
                <p><strong>Prep Time: </strong>{prepTime}</p>
                <p><strong>Yield: </strong>{recipeYield}</p>
                <button type="button" onClick={() => setHidden(!isHidden)}>View Recipe</button>
                <button type="button">Add to Favorites</button>
                <section className={isHidden ? "hidden-desc" : "expanded-desc"}>
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
            </section>
        </article>
    );
}

const addItem = (user, item) => {
    user.groceryList.push(item)
}