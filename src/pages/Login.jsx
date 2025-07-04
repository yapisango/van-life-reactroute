import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { loginUser } from "../api"

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const location = useLocation()
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)
    const navigate = useNavigate()
    const from = location.state?.from || "/host"

    async function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")
        const data = await loginUser(loginFormData)
            .then(data => {
                setError(null)
                localStorage.setItem("loggedIn", true)
                localStorage.setItem("user", JSON.stringify(data.user))
                localStorage.setItem("token", data.token)
                navigate(from, { replace: true })
            })
            .catch(err => {
                setError(err)
             })
             .finally(() => {
                setStatus("idle")
            })

    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

           
    return (
        <div className="login-container">
            {location.state?.message && 
                <h3 className="login-error">{location.state.message}</h3>
            }

            {error && <h3 className="login-error" style={{ color: "red" }}>{error.message}</h3>} 

            <h1>Sign in to your account</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button 
                    disabled={status === "submitting"}
                >
                    {status === "submitting" 
                        ? "Logging in..." 
                        : "Log in"
                    }
                </button>
            </form>
        </div>
    )

}
