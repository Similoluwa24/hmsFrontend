import { useReducer, useEffect, createContext } from "react";

export const AuthContext = createContext();
const initialState =  {
    user: null
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children, defaultState = initialState }) => {
    const [state, dispatch] = useReducer(authReducer,defaultState);

    console.log("AuthContext State: ", state.user);

    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    );
};
