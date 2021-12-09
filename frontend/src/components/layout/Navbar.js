import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../../assets/img/logo.png";

/* contexts */
import { Context } from "../../context/UserContext";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";

function Navbar() {
    const { authenticated, logout } = useContext(Context);
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Livrary" />
                <h2>Library</h2>
            </div>

            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {authenticated ? (
                    <>
                        <li>
                            <Link to="/user/profile">Profile</Link>
                        </li>
                        <li onClick={logout}>Logout</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Sign up</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
