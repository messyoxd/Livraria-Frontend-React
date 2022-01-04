import api from "../../../utils/api";
import formStyles from "../../form/Form.module.css";
import handleHttpErrors from "../../../utils/errors";
import useFlashMessage from "../../../hooks/useFlashMessage";

import Input from "../../form/Input";
import { useState, useEffect } from "react";

function Profile() {
    const { setFlashMessage } = useFlashMessage();
    const [editUser, setEditUser] = useState({});
    const [token] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        api.get("/users/check", {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            setEditUser(response.data);
        });
    }, [token]);

    function handleChange(e) {
        setEditUser({
            ...editUser,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let msgText = "";
        let msgType = "success";
        await api
            .patch("/users/edit", editUser, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                msgText = response.data.message;
                localStorage.setItem("user", JSON.stringify(editUser));
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
                    value={editUser.name || ""}
                    handleOnChange={handleChange}
                />
                <Input
                    text="Phone"
                    type="text"
                    name="phone"
                    placeholder="Type your Phone"
                    value={editUser.phone || ""}
                    handleOnChange={handleChange}
                />
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Type your email"
                    value={editUser.email || ""}
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
