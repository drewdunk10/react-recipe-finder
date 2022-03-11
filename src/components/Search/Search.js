import {parse} from 'iso8601-duration'
import { FaSearch } from "react-icons/fa"
import './Search.css';

function Search({setRecipes, setView}) {
    return(
        <div id={"search-bar"}>
            <FaSearch/>
            <input type="text" name="name" placeholder={"Find Recipe"} id={"search-input"}
                   onKeyPress={async (event) => await handleKeyPress(event, setRecipes, setView)}
            />
        </div>
    );
}

const handleKeyPress = async (event, setRecipes, setView) => {
    console.log("Detected keypress")
    if (event.key === "Enter") {
        console.log("Detected enter")
        await handleSearch(setRecipes, setView);
    }
}

const handleSearch = async (setRecipes, setView) => {
    await setRecipes(await fetchRecipes(document.querySelector("#search-input").value));
    setView({name: "main-app"});
}

const fetchRecipes = (searchStr) => {
    // Fetch data from JSON in public folder
    return fetch('./recipes.json')
        .then(response => {
            // Validate response.
            if (!response.ok) {
                console.log("ERROR " + response.status)
                throw new Error("ERROR " + response.status)
            }
            return response.json();
        }).then(data => {
            // Use stringified object to easily search all strings.
            let filteredRecipes = data.filter(recipe => JSON.stringify(recipe).toLowerCase().includes(searchStr.toLowerCase()))
            console.log(filteredRecipes)
            console.log(`Found recipes ${filteredRecipes.length} containing ${searchStr}`);

            // Format prep and cook times to show only minutes and seconds.
            filteredRecipes.forEach(item => {
                item.prepTime = formatDuration(item.prepTime);
                item.cookTime = formatDuration(item.cookTime);
                item.recipeYield = (item.recipeYield === "") ? "N/A" : item.recipeYield;
            })
            return filteredRecipes;
        });
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

export default Search