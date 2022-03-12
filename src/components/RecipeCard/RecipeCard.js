import './RecipeCard.css'
import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa"
import Favorite from "../Favorite/Favorite";
import UserContext from "../User/User";

// Component that provides a card containing a brief overview of a recipe.
function RecipeCard({recipe, viewName, changeView, setUser}) {
    const user = useContext(UserContext);

    // Return whether recipe is a favorite or not.
    const recipeIsFavorite = (recipeName) => {
        let flag = false;
        for (let i = 0; i < user.favorites.length; i++) {
            if (user.favorites[i].name === recipeName) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    const [isFavorite, setFavorite] = useState(recipeIsFavorite(recipe.name))

    // Add an ingredient to the user's cart if it's not already there.
    const addItem = (item) => {
        // Make a copy of state groceryList with selected item.
        let groceryList = Array.from(user.groceryList);
        if (!groceryList.includes(item)) {
            groceryList.push(item);
        }

        // Update user's groceryList.
        setUser({name: user.name, favorites: user.favorites, groceryList: groceryList})
    }

    // Favorite/unfavorite and add/remove recipe from favorites.
    const toggleFavorite = () => {
        let favorites = Array.from(user.favorites);
        if (isFavorite) {
            favorites = user.favorites.filter(item => item.name !== recipe.name);
            setFavorite(false);
        } else {
            favorites.push(recipe);
            setFavorite(true);
        }

        // Update user's favorite list.
        setUser({name: user.name, favorites: favorites, groceryList: user.groceryList});
    }

    // Change to a new, detailed view for the recipe.
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
                            <p>{recipe.description}</p>
                            <h3 className={'ingredient-header'}>Ingredients</h3>
                            <ul className={"ingredient-list"}>
                                {
                                    recipe.ingredients.map(item =>
                                        <li key={item} className={"ingredient"}>
                                            {item}
                                            <button type={"button"} className={"add-button"} onClick={() => addItem(item)}>
                                                +
                                            </button>
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

export default RecipeCard;
