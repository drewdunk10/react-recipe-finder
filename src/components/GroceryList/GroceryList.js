import {useContext, useState} from "react";
import UserContext from "../User/User";
import { FaLeaf } from "react-icons/fa"
import './GroceryList.css';

function GroceryList() {
    const user = useContext(UserContext);
    const [isHidden, setHidden] = useState(true)

    const removeItem = (item) => {
        let index = user.groceryList.indexOf(item);
        if (index !== -1) {
            // Remove item from user's grocery list.
            user.groceryList.splice(index, 1);
        }
    }

    return(
        <div>
            <button type="button" onClick={() => setHidden(!isHidden)}>Grocery List</button>
            <section className={isHidden ? "hidden-desc" : "expanded-desc"}>
                <ul className={"dropdown"}>
                    {
                        // Display each ingredient as a list item.
                        user.groceryList.map(ingredient =>
                            <li>
                                <FaLeaf/> {ingredient} <button type={"button"} onClick={() => removeItem(ingredient)}>-</button>
                            </li>
                        )
                    }
                </ul>
            </section>
        </div>
    );
}

export default GroceryList
