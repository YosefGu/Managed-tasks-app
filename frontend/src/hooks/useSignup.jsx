import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const api = 'http://localhost:3000'

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (name, lName, title, email, password, manager) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${api}/api/user/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, lName, title, email, password, manager})
        })

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // save the user (jwt) to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //update the auth context
            dispatch({type: 'SIGNUP', payload: json})

            setIsLoading(false);
        }
    }
    return { signup, isLoading, error}
}