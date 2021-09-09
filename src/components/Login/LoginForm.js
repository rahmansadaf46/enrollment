import React from "react";
// import { useHistory } from "react-router-dom";

const LoginForm = (props) => {
    const { toggleUser, validation, submit, errors } = props;
    // const history = useHistory();
    document.title = "Login";
    // const handleLoginRoute = () => {

    //     history.push("/main");
    // };
    return (
        <div className="loginPage-form login">
            <h3 style={{ color: '#263238' }}>Sign In</h3>

            <form onSubmit={submit}>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" name="email" onChange={validation} />
                    {errors.email.length > 0 && <p className="error-msg">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={validation}
                    />
                    {errors.password.length > 0 && <p className="error-msg">{errors.password}</p>}
                </div>



                <button type="submit" className="btn loginPage-primary btn-primary btn-sm text-white btn-block">
                    Sign In
				</button>
            </form>

            <div className="register-login">
                Don’t have an account?{" "}
                <button className="btn btn-logintoggle" onClick={toggleUser}>
                    Create an account
				</button>
            </div>
        </div>
    );
};

export default LoginForm;