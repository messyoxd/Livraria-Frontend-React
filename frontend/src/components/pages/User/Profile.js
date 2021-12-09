import api from "../../../utils/api";
import formStyles from "../../form/Form.module.css";
import handleHttpErrors from "../../../utils/errors";
import useFlashMessage from "../../../hooks/useFlashMessage";

import Input from "../../form/Input";
import { useState, useEffect } from "react";

function Profile() {
    const { setFlashMessage } = useFlashMessage();
    const [user, setUser] = useState({});
    const [token] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        api.get("/users/check", {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            setUser(response.data);
        });
    }, [token]);

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let msgText = "";
        let msgType = "success";
        await api
            .patch("/users/edit", user, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                msgText = response.data.message;
            })
            .catch((err) => {
                msgType = "error";
                msgText = handleHttpErrors(err.response);
            });
        setFlashMessage(msgText, msgType);
    }

    return (
        <section>
            <h1>Profile</h1>
            <form className={formStyles.form_container} onSubmit={handleSubmit}>
                <Input
                    text="Name"
                    type="text"
                    name="name"
                    placeholder="Type your name"
                    value={user.name || ""}
                    handleOnChange={handleChange}
                />
                <Input
                    text="Phone"
                    type="text"
                    name="phone"
                    placeholder="Type your Phone"
                    value={user.phone || ""}
                    handleOnChange={handleChange}
                />
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Type your email"
                    value={user.email || ""}
                    handleOnChange={handleChange}
                />
                <Input
                    text="Password"
                    type="password"
                    name="password"
                    placeholder="Type your password"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Confirm password"
                    type="password"
                    name="confirmpassword"
                    placeholder="Retype your password"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Edit"></input>
            </form>
        </section>
    );
}

export default Profile;
