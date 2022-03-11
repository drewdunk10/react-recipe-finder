import UserContext from "../User/User";
import Search from "../Search/Search";
import RecipeCard from "../RecipeCard/RecipeCard"
import './App.css';
import {useState} from "react";
import Navigation from "../Navigation/Navigation";

const initUser = {
    name: 'Drew',
    groceryList: [],
    favorites: []
}

function App() {
    const [recipes, setRecipes] = useState([])
    const [view, setView] = useState({name: "main-app", content: {}});
    const [appUser, setUser] = useState(initUser)   // Use a state to control changes to groceryList across components.

    const changeView = (viewName, content={}) => {
        setView({name: viewName, content: content});
    }

    return (
      // Give all child components access to user context.
      <UserContext.Provider value={appUser}>
        <div id="app">
            <header id="app-header">
                <Navigation setRecipes={setRecipes} changeView={changeView} setUser={setUser}/>
                <h1>
                    Recipe Finder
                </h1>
                <h2>
                    By Drew Dunkelberger
                </h2>
            </header>
            {/* Prevent form from refreshing page upon enter key */}
            <form onSubmit={(event) => event.preventDefault()}>
                <Search setRecipes={setRecipes} setView={setView}/>
            </form>
                {view.name === 'main-app' ?
                    <main id={'recipe-container'}>
                        {
                            recipes.map(recipe =>
                                <RecipeCard
                                    key={recipe.name}
                                    recipe={recipe}
                                    viewName={view.name}
                                    changeView={changeView}
                                    setUser={setUser}
                                />
                            )
                        }
                    </main> :
                    <main>
                        <RecipeCard
                            key={view.content.name}
                            recipe={view.content}
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
