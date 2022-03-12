import './Search.css';
import { parse } from 'iso8601-duration'
import { FaSearch } from "react-icons/fa"

// Component that provides a search bar to find recipes and submits upon enter key.
function Search({setRecipes, changeView}) {

    // Checks keypress for enter, and handles search if so.
    const handleKeyPress = async (event) => {
        if (event.key === "Enter") {
            await handleSearch();
        }
    }

    // Pass search results to fetch and switch to main view.
    const handleSearch = async () => {
        await setRecipes(await fetchRecipes(document.querySelector("#search-input").value));
        changeView("main-app");
    }

    // Fetch and filter recipes by given search string.
    const fetchRecipes = (searchStr) => {
        // Fetch data from JSON in public folder
        return fetch('./recipes.json')
            .then(response => {
                // Validate response.
                if (!response.ok) {
                    throw new Error("ERROR " + response.status)
                }
                return response.json();
            }).then(data => {
                let filteredRecipes = [];
                data.forEach(recipe => {
                    // Only return results that contain string in name, description, or ingredients.
                    if (recipe.name.toLowerCase().includes(searchStr) ||
                        recipe.description.toLowerCase().includes(searchStr) ||
                        ingredientsContainsString(recipe.ingredients, searchStr))
                    {
                        recipe.prepTime = formatDuration(recipe.prepTime);
                        recipe.cookTime = formatDuration(recipe.cookTime);
                        recipe.recipeYield = (recipe.recipeYield === "") ? "N/A" : recipe.recipeYield;
                        filteredRecipes.push(recipe);
                    }
                })
                return filteredRecipes;
            });
    }

    // Returns whether given search string is contained in list of ingredients.
    const ingredientsContainsString = (ingredients, searchStr) => {
        let flag = false;
        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i].toLowerCase().includes(searchStr.toLowerCase())) {
                flag = true;
                break;
            }
        }
        return flag;
    }

    // Convert iso8601 formatted duration to a more readable HH:MM format.
    const formatDuration = (durationISO) => {
        let formattedDuration = "N/A"
        if (durationISO !== "") {
            // Parse and format the minutes and seconds of the duration.
            let durationComponents = parse(durationISO)
            formattedDuration = `${(durationComponents.hours * 60) + durationComponents.minutes}`.padStart(2, "0")
                + ":" + `${durationComponents.seconds}`.padStart(2, "0");
        }
        return formattedDuration
    }

    return(
        <div id={"search-bar"}>
            <FaSearch/>
            <input type="text" name="name" placeholder={"Find Recipe"} id={"search-input"}
                   onKeyPress={async (event) => await handleKeyPress(event)}
            />
        </div>
    );
}

export default Search