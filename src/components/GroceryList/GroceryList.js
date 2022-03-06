import {useContext, useState} from "react";
import UserContext from "../User/User";
import './GroceryList.css';

function GroceryList() {
    const user = useContext(UserContext);
    const [isHidden, setHidden] = useState(true)

    return(
        <div>
            <button type="button" onClick={() => setHidden(!isHidden)}>Grocery List</button>
            <section className={isHidden ? "hidden-desc" : "expanded-desc"}>
                <ul className={"dropdown"}>
                    {
                        // Display each ingredient as a list item.
                        user.groceryList.map(ingredient =>
                            <li>
                                {ingredient}
                            </li>
                        )
                    }
                </ul>
            </section>
        </div>
    );
}

export default GroceryList
