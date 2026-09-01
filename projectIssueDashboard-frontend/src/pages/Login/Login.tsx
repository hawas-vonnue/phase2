import "./Login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function Login() {
    useDocumentTitle("Login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault();

        console.log({ email, password, rememberMe });
        //validation logic
        navigate("/");
    }

    return (
        <>
            <div className="loginFormContainer">
                <form className="loginForm" onSubmit={handleSubmit}>
                    <h2>Welcome back</h2>
                    <div className="field">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="test@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="formActions">
                        <div className="rememberMe">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }
                            />
                            <span>Remember me</span>
                        </div>
                        <Link to={"/forgotPassword"}>Forgot password?</Link>
                    </div>
                    <button type="submit">Sign In</button>
                    <div className="footer">
                        Don't have an account?
                        <Link to={"/Register"}>Sign up</Link>
                    </div>
                </form>
            </div>
        </>
    );
}
