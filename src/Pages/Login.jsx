import { Link } from "react-router-dom";
import "./login.css"

function Login() {
    return (
        <div className="login-body">
            <div className="login-main">
                <div className="login">
                    <form className="login-form">
                        <h1 className="login-heading" style={{textAlign: "center"}}>SHOPPING SITE</h1>
                        {/* <input type="email" name="email" placeholder="Email" required="" />
                        <input
                            type="password"
                            name="pswd"
                            placeholder="Password"
                            required=""
                        /> */}
                        <Link className="login-navlink" to="/home"> < button className="login-button" type="button"> Click Here For Shopping</button></Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login; 