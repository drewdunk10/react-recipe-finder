import { parse } from 'iso8601-duration'

const fetchRecipes = (searchStr) => {
    // Fetch data from XML file and store as JSON objects in events array.
    fetch('./recipes.json')
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
            })
            return filteredRecipes;
    })
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

const Search = {
    fetchRecipes
}

export default Search