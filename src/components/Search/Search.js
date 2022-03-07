import {parse} from 'iso8601-duration'

function Search({update, setView}) {
    return(
        <section>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <button type={"button"} onClick={async () => handleSearch(update, setView)}>Submit</button>
        </section>
    );
}

const handleSearch = async (update, setView) => {
    await update(await fetchRecipes(document.querySelector("input").value));
    setView({name: "main-app"});
}

const fetchRecipes = (searchStr) => {
    // Fetch data from XML file and store as JSON objects in events array.
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