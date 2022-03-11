import UserContext from "../User/User";
import Search from "../Search/Search";
import RecipeCard from "../RecipeCard/RecipeCard"
import './App.css';
import {useState} from "react";
import Navigation from "../Navigation/Navigation";

const initUser = {
    name: 'Drew',
    groceryList: []
}

function App() {
    const [recipes, setRecipes] = useState([])
    const [view, setView] = useState({name: "main-app", content: {}});
    const [appUser, setUser] = useState(initUser)   // Use a state to control changes to groceryList across components.

    const changeView = (view) => {
        setView(view);
    }

    return (
      // Give all child components access to user context.
      <UserContext.Provider value={appUser}>
        <div id="app">
            <header id="app-header">
                <Navigation setUser={setUser}/>
                <h1>
                    Recipe Finder
                </h1>
                <h2>
                    By Drew Dunkelberger
                </h2>
            </header>
            {/* Prevent form from refreshing page upon enter key */}
            <form onSubmit={(event) => event.preventDefault()}>
                <Search update={setRecipes} setView={setView}/>
            </form>
                {view.name === 'main-app' ?
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
                                    viewName={view.name}
                                    changeView={changeView}
                                />
                            )
                        }
                    </main> :
                    <main>
                        <RecipeCard
                            key={view.content.name}
                            image={view.content.image}
                            name={view.content.name}
                            cookTime={view.content.cookTime}
                            prepTime={view.content.prepTime}
                            recipeYield={view.content.recipeYield}
                            desc={view.content.description}
                            ingredients={view.content.ingredients}
                            viewName={view.content.name}
                            changeView={changeView}
                            setUser={setUser}
                        />
                    </main>
                }
        </div>
      </UserContext.Provider>
  );
}

export default App;
