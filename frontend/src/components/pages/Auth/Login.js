import { useState, useContext } from "react";
import Input from "../../form/Input";

import styles from "../../form/Form.module.css";

/* context */
import { Context } from "../../../context/UserContext";
import { Link } from "react-router-dom";

function Login() {
    const [loginForm, setLoginForm] = useState({});
    const { login } = useContext(Context);

    function handleChange(e) {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        login(loginForm);
    }

    return (
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Type your email"
                    handleOnChange={handleChange}
                ></Input>
                <Input
                    text="Password"
                    type="password"
                    name="password"
                    placeholder="Type your password"
                    handleOnChange={handleChange}
                ></Input>
                <input type="submit" value="Login"></input>
            </form>
            <p>
                Not signed up? <Link to="/register">Click here</Link>
            </p>
        </section>
    );
}

export default Login;
