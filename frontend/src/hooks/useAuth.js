import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";
import handleHttpErrors from '../utils/errors'

export default function useAuth() {
    const { setFlashMessage } = useFlashMessage();
    const [authenticated, setAuthenticated] = useState(false);
    // const [admin, setAdmin] = useState(false);
    // const [user, setUser] = useState({});
    const history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }
    }, []);

    async function signUp(user) {
        let msgText = "User successfully signed up!";
        let msgType = "success";
        try {
            const data = await api
                .post("/users/register", user)
                .then((response) => {
                    return response.data;
                });
            await authUser(data);
        } catch (error) {
            msgText = msgText = handleHttpErrors(error.response);
            msgType = "error";
        }
        setFlashMessage(msgText, msgType);
    }

    async function authUser(data) {
        setAuthenticated(true);
        localStorage.setItem("token", JSON.stringify(data.token));
        try {
            const res = await api
                .get("/users/check", {
                    headers:{
                        Authorization: `Bearer ${data.token}`
                    }
                })
                .then((response) => {
                    return response.data;
                });
            localStorage.setItem("user", JSON.stringify(res))
        } catch (error) {
            console.log(error);
        }
        history("/");
    }

    function logout() {
        const msgText = "Successfully logged out";
        const msgType = "success";
        setAuthenticated(false);
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = undefined;
        history("/");
        setFlashMessage(msgText, msgType);
    }

    async function login(loginForm) {
        let msgText = "Successfully logged in";
        let msgType = "success";

        try {
            const data = await api
                .post("/users/login", loginForm)
                .then((response) => {
                    return response.data;
                });
            await authUser(data);
        } catch (error) {
            console.log(error);
            msgText = handleHttpErrors(error.response);
            msgType = "error";
        }
        setFlashMessage(msgText, msgType);
    }

    return { signUp, authenticated, logout, login };
}
