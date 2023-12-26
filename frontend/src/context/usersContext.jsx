import { createContext, useReducer } from "react";

export const UsersContext = createContext();

export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                users: action.payload
            }
        case 'DELETE_USER':
            return {
                users: state.users.filter((p) => p._id !== action.payload._id)
            }
        case 'UPDATE_USER':
            return {
                state //לא יודע עדיין 
            }
        default:
            return state
    }
}

export const UsersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(usersReducer, {
        users: null
    })
    return (
        <UsersContext.Provider value={{...state, dispatch }}>
            { children }
        </UsersContext.Provider>
    )
}