import { useState, useContext } from "react";

import Input from "../../form/Input";
import styles from "../../form/Form.module.css";

/* contexts */
import { Context } from "../../../context/UserContext";

function Register() {
    const [ user, setUser ] = useState({});
    const { signUp } = useContext(Context);

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault(); // parar reload da pagina
        //enviar usuario p/ banco
        signUp(user);
    }

    return (
        <section className={styles.form_container}>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Name"
                    type="text"
                    name="name"
                    placeholder="Type your name"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Phone"
                    type="text"
                    name="phone"
                    placeholder="Type your phone"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Type your e-mail address"
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
                    text="Confirm Password"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm your password"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Sign up"></input>
            </form>
        </section>
    );
}

export default Register;
