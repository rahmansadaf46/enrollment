import React from "react";

const SignUpForm = (props) => {
    const { toggleUser, validation, submit, errors } = props;
    console.log(errors);
    document.title = "Create an account";

    return (
        <div className="loginPage-form login signup">
            <h3 style={{ color: '#263238' }}>Create an account</h3>

            <form onSubmit={submit}>


                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" name="email" onBlur={validation} />
                    {errors.email.length > 0 && <p className="error-msg">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onBlur={validation}
                    />
                    {errors.password.length > 0 && <p className="error-msg">{errors.password}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onBlur={validation}
                    />
                    {errors.confirmPassword.length > 0 && <p className="error-msg">{errors.confirmPassword}</p>}
                </div>

                <button type="submit" className="btn text-white btn-sm btn-success loginPage-primary btn-block">
                    Create an account
				</button>
            </form>

            <div className="register-login">
                Already have an account?{" "}
                <button className="btn btn-logintoggle" onClick={toggleUser}>
                    Sign In
				</button>
            </div>
        </div>
    );
};

export default SignUpForm;