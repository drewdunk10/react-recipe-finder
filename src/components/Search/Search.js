import {parse} from 'iso8601-duration'
import { FaSearch } from "react-icons/fa"
import './Search.css';

function Search({setRecipes, changeView}) {

    const handleKeyPress = async (event) => {
        if (event.key === "Enter") {
            await handleSearch();
        }
    }

    const handleSearch = async () => {
        await setRecipes(await fetchRecipes(document.querySelector("#search-input").value));
        changeView("main-app");
    }

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