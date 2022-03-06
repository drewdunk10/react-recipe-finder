import UserContext from "../User/User";
import Search from "../Search/Search";
import RecipeCard from "../RecipeCard/RecipeCard"
import './App.css';
import {useState} from "react";
import Navigation from "../Navigation/Navigation";

const user = {
    name: 'Drew',
    groceryList: []
}

function App() {
    const [recipes, setRecipes] = useState([])

    return (
      // Give all child components access to user context.
      <UserContext.Provider value={user}>
        <div className="App">
          <header className="App-header">
              <Navigation/>
              <h1>
                  Recipe Finder
              </h1>
              <h2>
                  By Drew Dunkelberger
              </h2>
          </header>
            <form>
                <Search update={setRecipes}/>
                <main id={'recipe-container'}>
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
                </main>
            </form>
        </div>
      </UserContext.Provider>
  );
}

export default App;
