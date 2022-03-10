import {useContext, useState} from "react";
import UserContext from "../User/User";
import { FaLeaf } from "react-icons/fa"
import './GroceryList.css';

function GroceryList() {
    const user = useContext(UserContext);
    const [isHidden, setHidden] = useState(true)
    const [myGroceryList, setMyGroceryList] = useState(user.groceryList)

    const removeItem = (item) => {
        // Make a copy of user's cart without selected item.
        let groceryList = Array.from(myGroceryList).filter(ingredient => ingredient !== item);

        // Update state of groceryList for this component and the user context for other components.
        setMyGroceryList(groceryList);
        user.groceryList = groceryList;
    }

    return(
        <div>
            <button className={"grocery-button"} type="button" onClick={() => setHidden(!isHidden)}>Grocery List</button>
            <section className={isHidden ? "hidden-desc" : "expanded-desc"}>
                <ul className={"dropdown"}>
                    {
                        // Display each ingredient as a list item.
                        myGroceryList.map(ingredient =>
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
