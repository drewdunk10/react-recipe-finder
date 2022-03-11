import {useContext, useState} from "react";
import UserContext from "../User/User";
import { FaLeaf } from "react-icons/fa"
import './GroceryList.css';

function GroceryList({setUser}) {
    const user = useContext(UserContext);
    const [isHidden, setHidden] = useState(true)

    const removeItem = (item) => {
        // Make a copy of user's cart without selected item.
        let groceryList = user.groceryList.filter(ingredient => ingredient !== item);

        // Update groceryList state of App.
        setUser({name: user.name, groceryList: groceryList})
    }

    return(
        <div>
            <button className={"grocery-button"} type="button" onClick={() => setHidden(!isHidden)}>Grocery List ({user.groceryList.length})</button>
            <section className={isHidden ? "hidden-desc" : "expanded-desc"}>
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
