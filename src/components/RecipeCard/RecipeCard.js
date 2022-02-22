export default RecipeCard;

function RecipeCard({recipe}) {
    console.log(recipe)
    return(
        <article className="recipe-card">;
            <img className="recipe" src={recipe[0].image} alt="Recipe for ${recipe.name}."/>;
                <section className="event-card-body">
                    <h3>{recipe.name}</h3>
                    <p>{recipe.cookTime}</p>
                    <p>{recipe.prepTime}</p>
                    <p>{recipe.recipeYield}</p>
                    <button type="button" onClick={onView}>View Recipe</button>
                    <section className="hidden-desc">
                        <p>{recipe.description}</p>
                        <p>{recipe.ingredients}</p>
                    </section>
                </section>
        </article>
    );
}

// Listener to expand or collapse event description.
function onView(event) {
    // If description is hidden, then show it (and vice versa).
    event.target.className = (event.target.className === "hidden-desc") ? "expanded-desc" : "hidden-desc";
}
