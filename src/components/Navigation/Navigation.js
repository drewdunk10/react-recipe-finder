import {useContext} from "react";
import UserContext from "../User/User";
import './Navigation.css';
import GroceryList from "../GroceryList/GroceryList";

function Navigation({setRecipes, changeView, setUser}) {
    const user = useContext(UserContext);

    const displayFavorites = () => {
        setRecipes(user.favorites)
        changeView("main-app")
    }

    return(
        <nav className={"flex: 1 1 auto;"}>
            <ul className={"user-bar"}>
                {<button className={"grocery-button"} type={"button"} onClick={displayFavorites}>Favorites</button>}
                <li>
                    <GroceryList setUser={setUser}/>
                </li>
                <li>Welcome, {user.name}</li>
            </ul>
        </nav>
    );
}

export default Navigation
