import { FaHeart } from "react-icons/fa";

// Component that provides a button to toggle whether a recipe is a favorite or not.
function Favorite({isFavorite, toggleFavorite}) {
    return(
        <button className={"recipe-button"} type="button" onClick={() => toggleFavorite()}>
            {
                isFavorite ? <div><FaHeart color={"red"}/> Remove Favorite</div>
                           : <div><FaHeart color={"grey"}/> Add to Favorites</div>
            }
        </button>
    );
}

export default Favorite
