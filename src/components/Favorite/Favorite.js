import { FaHeart } from "react-icons/fa";

export default Favorite

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
