import './RecipeCard.css'
import {useContext, useState} from "react";
import { FaEye } from "react-icons/fa"
import UserContext from "../User/User";
import Favorite from "../Favorite/Favorite";

export default RecipeCard;

function RecipeCard({recipe, viewName, changeView, setUser}) {
    const user = useContext(UserContext);

    const recipeIsFavorite = (recipeName) => {
        let flag = false;
        user.favorites.forEach(fav => {
            if (fav.name === recipeName) {
                flag = true;
            }
        });
        return flag;
    }
    const [isFavorite, setFavorite] = useState(recipeIsFavorite(recipe.name))

    const addItem = (item) => {
        // Make a copy of state groceryList with selected item.
        let groceryList = Array.from(user.groceryList);
        if (!groceryList.includes(item)) {
            groceryList.push(item);
        }

        // Update groceryList state of App.
        setUser({name: user.name, favorites: user.favorites, groceryList: groceryList})
    }

    const toggleFavorite = () => {
        let favorites = Array.from(user.favorites);
        if (isFavorite) {
            favorites = user.favorites.filter(item => item.name !== recipe.name);
            setFavorite(false);
        } else {
            favorites.push(recipe);
            setFavorite(true);
        }

        setUser({name: user.name, favorites: favorites, groceryList: user.groceryList});
    }

    const viewRecipe = (event) => {
        event.preventDefault()
        changeView(recipe.name, recipe);
    }

    return(
        <article className={viewName !== recipe.name ? "recipe-card": "detail-recipe-card"}>
            <img className="recipe" src={recipe.image} alt={"Some Recipe."}/>
            <section className={"recipe-body"}>
                <h3>{recipe.name} Recipe</h3>
                <p><strong>Cook Time: </strong>{recipe.cookTime}</p>
                <p><strong>Prep Time: </strong>{recipe.prepTime}</p>
                <p><strong>Yield: </strong>{recipe.recipeYield}</p>
                {
                    viewName !== recipe.name ? <button className={"recipe-button"} type="button" onClick={viewRecipe}>
                                        <FaEye/>  View Recipe</button> :
                        <section>
                            <p>{recipe.desc}</p>
                            <h3 className={'ingredient-header'}>Ingredients</h3>
                            <ul className={"ingredient-list"}>
                                {
                                    recipe.ingredients.map(item =>
                                        <li key={item}>
                                            {item} <button type={"button"} onClick={() => addItem(item)}>+</button>
                                        </li>
                                    )
                                }
                            </ul>
                        </section>
                }
                <Favorite isFavorite={isFavorite} toggleFavorite={toggleFavorite}/>
            </section>
        </article>
    );
}
