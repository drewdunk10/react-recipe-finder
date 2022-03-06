import { createContext } from "react";
const UserContext = createContext({
    name: '',
    groceryList: []
});
export default UserContext;