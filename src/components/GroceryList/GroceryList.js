import './GroceryList.css';
import { useContext, useState } from "react";
import { FaLeaf } from "react-icons/fa"
import UserContext from "../User/User";

// Component that provides a dropdown of all ingredients in user's grocery list.
function GroceryList({setUser}) {
    const user = useContext(UserContext);
    const [isHidden, setHidden] = useState(true)

    // Remove an ingredient from user's grocery list.
    const removeItem = (item) => {
        // Make a copy of user's cart without selected item.
        let groceryList = user.groceryList.filter(ingredient => ingredient !== item);

        // Update groceryList state of App.
        setUser({name: user.name, favorites: user.favorites, groceryList: groceryList})
    }

    return(
        <div>
            <button className={"grocery-button"} type="button" onClick={() => setHidden(!isHidden)}>Grocery List ({user.groceryList.length})</button>
            <section className={isHidden ? "hidden" : "expanded"}>
                <ul className={"dropdown"}>
                    {
                        // Display each ingredient as a list item.
                        user.groceryList.map(ingredient =>
                            <li className={"ingredient"} key={ingredient}>
                                <FaLeaf color={"green"}/> {ingredient} <button className={"remove-button"} type={"button"} onClick={() => removeItem(ingredient)}>-</button>
                            </li>
                        )
                    }
                </ul>
            </section>
        </div>
    );
}

export default GroceryList
