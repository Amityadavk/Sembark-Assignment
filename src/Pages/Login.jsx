import { Link } from "react-router-dom";
import "./login.css"

function Login() {
    return (
        <div className="login-body">
            <div class="login-main">
                <div class="login">
                    <form className="login-form">
                       <h1 className="login-heading">Login</h1>
                        <input type="email" name="email" placeholder="Email" required="" />
                        <input
                            type="password"
                            name="pswd"
                            placeholder="Password"
                            required=""
                        />
                       <Link className="login-navlink" to="/home"> < button className="login-button" type="button">Login</button></Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;