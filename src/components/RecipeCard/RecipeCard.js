import './RecipeCard.css'
import {useState} from "react";

export default RecipeCard;

// TODO: Create a separate view/page for viewing ingredients and description
function RecipeCard({image, name, cookTime, prepTime, recipeYield, desc, ingredients}) {
    const [isHidden, setHidden] = useState(true)

    return(
        <article className="recipe-card">
            <img className="recipe" src={image} alt={"Some Recipe."}/>
                <section>
                    <h3>{name}</h3>
                    <p><strong>Cook Time: </strong>{cookTime}</p>
                    <p><strong>Prep Time: </strong>{prepTime}</p>
                    <p><strong>Yield: </strong>{recipeYield}</p>
                    <button type="button" onClick={() => setHidden(!isHidden)}>View Recipe</button>
                    <section className={isHidden ? "hidden-desc" : "expanded-desc"}>
                        <p>{desc}</p>
                        <p>{ingredients}</p>
                        <ul>
                            {
                                ingredients.map(item =>
                                    <li>
                                        {item}
                                    </li>
                                )
                            }
                        </ul>
                    </section>
                </section>
        </article>
    );
}
