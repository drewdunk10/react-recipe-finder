import logo from '../../logo.svg';
import UserContext from "../User/User";
import Search from "../Search/Search";
import RecipeCard from "../RecipeCard/RecipeCard"
import './App.css';

const user = {
  name: 'Drew'
}

function App() {
  return (
      // Give all child components access to user context.
      <UserContext.Provider value={user}>
        <div className="App">
          <header className="App-header">
            {/* TODO: Update recipe cards when search button is clicked */}
            <RecipeCard recipe={Search.fetchRecipes("steak")}/>
            <button type={"button"}>Submit</button>
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
          </header>
        </div>
      </UserContext.Provider>
  );
}

export default App;
