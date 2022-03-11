import { createContext } from "react";
const UserContext = createContext({
    name: '',
    groceryList: [],
    favorites: []
});
export default UserContext;