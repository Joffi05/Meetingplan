import { json } from 'body-parser'
import React from 'react'
import { useCookies } from "react-cookie";
import styles from '.././styles/styles.module.css'

function Login() {

    const [data, setData] = React.useState(null)
    const [cookies, setCookie] = useCookies(false)

    const handleChange = (event) => {
        setData(event.target.value)
    }

    const handleLogin = () => {

        let bodyData = JSON.stringify({
            "password": data
        })


        fetch("/api/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: bodyData,
        }, [])
        .then((res) => res.text())
        .then((rightPsw) =>
        { 
            if(rightPsw === "Correct Password") {
                setCookie("loggedIn", true)
                window.location.reload()
            }
        })
    }

    const handleLogout = () => {
        setCookie("loggedIn", false)
    }

    if (cookies.loggedIn == true) {
        return (
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        )
    }
    else {
        return (
            <div className={styles.login}>
                <input type="password" placeholder="Passwort" name="passwort" onChange={handleChange}/>
                <button onClick={handleLogin}>Login</button>
            </div>
        )
    }
    
}

export default Login
