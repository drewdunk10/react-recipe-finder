export default RecipeCard;

// TODO: Create a separate view/page for viewing ingredients and description
function RecipeCard({image, name, cookTime, prepTime, recipeYield, desc, ingredients}) {
    return(
        <article className="recipe-card">
            <img className="recipe" src={image} alt="Recipe for ${recipe.name}."/>
                <section className="event-card-body">
                    <h3>{name}</h3>
                    <p><strong>Cook Time: </strong>{cookTime}</p>
                    <p><strong>Prep Time: </strong>{prepTime}</p>
                    <p><strong>Yield: </strong>{recipeYield}</p>
                    <button type="button" onClick={onView}>View Recipe</button>
                    <section className="hidden-desc">
                        <p>{desc}</p>
                        <p>{ingredients}</p>
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
