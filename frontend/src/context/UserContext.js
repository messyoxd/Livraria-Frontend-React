import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
    const { signUp, authenticated, logout, login } = useAuth();
    return (
        <Context.Provider value={{ signUp, authenticated, logout, login }}>
            {children}
        </Context.Provider>
    );
}

export { Context, UserProvider };
