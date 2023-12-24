import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('useAutoContext must be used inside an AutoContextProvider')
    }

    return context
}