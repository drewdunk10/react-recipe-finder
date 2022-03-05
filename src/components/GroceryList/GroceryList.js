import {useContext} from "react";
import UserContext from "../User/User";

function GroceryList() {
    const user = useContext(UserContext);

    return(
        <ul>
            <li>
                <button>Grocery List</button>
                <section>
                    <ul>
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
            </li>
            <li>Hello, {user.name}</li>
        </ul>
    );
}

export default GroceryList
