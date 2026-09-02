import "./Login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useAuth } from "../../context/useAuth";

export default function Login() {
    useDocumentTitle("Login");

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault();

        //validation logic
        fetch(`${import.meta.env.VITE_url}/login`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => {
                if (response.status === 403)
                    throw new Error("Error in authentication");
                return response.json();
            })
            .then((response) => {
                login(response.token, response.user, rememberMe);

                navigate("/");
            })
            .catch((error) => alert(error));
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
                            autoComplete="username"
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
                            autoComplete="current-password"
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
