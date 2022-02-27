import UserContext from "../User/User";
import Search from "../Search/Search";
import RecipeCard from "../RecipeCard/RecipeCard"
import './App.css';
import {useState} from "react";

const user = {
  name: 'Drew'
}

function App() {
    const [recipes, setRecipes] = useState([])

    return (
      // Give all child components access to user context.
      <UserContext.Provider value={user}>
        <div className="App">
          <header className="App-header">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
          </header>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <button type={"button"} onClick={async () => setRecipes(await Search.fetchRecipes(document.querySelector("input").value))}>Submit</button>
                {
                    recipes.map(recipe =>
                        <RecipeCard
                            key={recipe.name}
                            image={recipe.image}
                            name={recipe.name}
                            cookTime={recipe.cookTime}
                            prepTime={recipe.prepTime}
                            recipeYield={recipe.recipeYield}
                            desc={recipe.description}
                            ingredients={recipe.ingredients}
                        />
                    )
                }
            </form>
        </div>
      </UserContext.Provider>
  );
}

export default App;
