import {useEffect, useState} from "react";
import Login from "./Login/Login.tsx";
import App from "./App/App.tsx";
import Auth from "../Auth/Auth.tsx";

const Index = () => {
    const [type, setType] = useState("login");
    const [loginError, setLoginError] = useState(false);
    const auth = Auth.getInstance();
    const login = (username: string, password: string) => {
        auth.logIn(username, password)
            .then(() => {
                setType("app");
                setLoginError(false);
            })
            .catch(() => {
                setLoginError(true);
            })
    }

    const logout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        setType("login");
    }



    useEffect(() => {
        //Klasa autoryzująca
        if(localStorage.getItem('username') !== null){
            setType("app");
        }
    }, []);


    switch(type){
        case "login":
            return <Login login={(username: string, password: string) => {login(username, password)}} loginError={loginError}/>
        case "app":
            return <App logout={logout}/>
    }
}

export default Index;