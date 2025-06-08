import React from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"

export default function AuthRequired () {
    const isLoggedIn = localStorage.getItem("loggedIn")
    const auth = isLoggedIn === "true" ? true : false
    const location = useLocation()

    if(!auth) {
            return (
            <Navigate to="/Login" 
                state={{message: "You must log in first"}} 
                replace
            />
        )
    }
    return (
        <Outlet />
    )
}