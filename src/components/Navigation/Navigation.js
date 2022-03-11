import {useContext} from "react";
import UserContext from "../User/User";
import './Navigation.css';
import GroceryList from "../GroceryList/GroceryList";

function Navigation({setUser}) {
    const user = useContext(UserContext);

    return(
        <nav className={"flex: 1 1 auto;"}>
            <ul className={"user-bar"}>
                {<button className={"grocery-button"} type={"button"}>Favorites</button>  /* TODO: Replace with link to favorites page*/}
                <li>
                    <GroceryList setUser={setUser}/>
                </li>
                <li>Welcome, {user.name}</li>
            </ul>
        </nav>
    );
}

export default Navigation
