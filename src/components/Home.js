import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }

    return (
        <section  className="link-page">
            
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            {/* //this section will lead u to the page link of it  */}
            <Link to="/DragAndDropUser" className="link">Go to the Editor page</Link>
            <br />
            <Link to="/Draganddrop" className="link">Go to the Admin page</Link>
            <br />
            <Link to="/lounge" className="link">Go to the Lounge</Link>
            <br />
            {/* <Link to="/linkpage">Go to the link page</Link> */}
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home
