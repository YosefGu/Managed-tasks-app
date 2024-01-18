import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const api = 'http://localhost:3000'


export const useGoogleLogin = () => {
    const [gError, setGError] = useState(null);
    const { dispatch } = useAuthContext();

    const googleLogin = async (jwtToken) => {
        setGError(null);
        
        const response = await fetch(`${api}/api/user/google/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({client_id: jwtToken.clientId, jwtToken: jwtToken.credential})
        })

        const json = await response.json();
         
        if (!response.ok) {
            setGError(json.error);
            console.log('Failed!')
        }
        if (response.ok) {
            // save the user (jwt) to local storage
            console.log('Succecc!')
            localStorage.setItem('user', JSON.stringify(json));

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})
        }
    }
    return { googleLogin, gError}
}