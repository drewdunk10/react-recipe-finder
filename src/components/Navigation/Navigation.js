import './Navigation.css';
import { useContext } from "react";
import GroceryList from "../GroceryList/GroceryList";
import UserContext from "../User/User";

// Component that provides a navigation bar with all available user actions and greeting.
function Navigation({setRecipes, changeView, setUser}) {
    const user = useContext(UserContext);

    // Change to main view and display only favorite recipes.
    const displayFavorites = () => {
        setRecipes(user.favorites)
        changeView("main-app")
    }

    return(
        <nav className={"nav-bar"}>
            <ul className={"user-bar"}>
                <li>
                    <button className={"grocery-button"} type={"button"} onClick={displayFavorites}>
                        Favorites ({user.favorites.length})
                    </button>
                </li>
                <li>
                    <GroceryList setUser={setUser}/>
                </li>
                <li>Welcome, {user.name}</li>
            </ul>
        </nav>
    );
}

export default Navigation
