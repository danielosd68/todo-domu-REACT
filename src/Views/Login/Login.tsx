import {useState} from "react";
import {Link} from "react-router-dom";

const LoginPage = (props: any) => {
    //@ts-ignore
    const [badLogin, setStateOfLogin] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    // const navigate = useNavigate();
    console.log(props.loginError);
    document.title = "Logowanie | TODO - Domu 🏠";
    return (
        <div className="login w-11/12 ml-auto mr-auto mt-20">
            <h1 className="text-center text-5xl mb-10">TODO - Domu 🏠</h1>
            <div className="sm:shadow-xl loginBox w-[20rem] sm:w-[30rem] ml-auto mr-auto p-7 sm:border-2 sm:border-t-4 sm:border-t-amber-500 mb-10">
                <h1 className="text-center text-[#8f8f8f] text-2xl mb-10">Zaloguj się</h1>
                <form>
                    <div className="username mb-5 w-full">
                        <label className="text-[#8f8f8f]">Nazwa użytkownika / Email</label><br/>
                        <input onChange={(e) => {
                            setUsername(e.target.value);
                        }} type="text" name="username" className="mt-3 border-2 w-full p-3" placeholder="Nazwa użytkownika lub email..."/>
                    </div>
                    <div className="password w-full">
                        <label className="text-[#8f8f8f]">Hasło</label><br/>
                        <input onChange={(e) => {
                            setPassword(e.target.value);
                        }} type="password" name="password" className="mt-3 border-2 w-full p-3" placeholder="Hasło..."/>
                    </div>
                    <p className={"text-center mt-5 text-red-500 " + (props.loginError === false && badLogin === false ? " invisible" : "")}>Nazwa użytkownika / Email i / lub hasło są niepoprawne...</p>
                    <div className="login-button mt-5 w-full">
                        <button onClick={(e) => {
                            e.preventDefault();
                            setStateOfLogin(false);

                            username !== null && password !== null ? props.login(username, password) : setStateOfLogin(true);

                        }} className="transition ease-in-out w-full p-3 bg-amber-500 hover:bg-amber-600 text-white">Zaloguj się</button>
                    </div>
                    <div className="login-button mt-3 w-full">
                        <Link to={'/signup'}><button className="transition ease-in-out hover:text-amber-600 w-full p-3 text-amber-500">Nie masz konta? Załóż je!</button></Link>
                    </div>
                </form>

            </div>
            <div className="socials w-full h-7 flex justify-center align-middle ml-auto mr-auto mb-5">
                <a href="https://github.com/danielosd68" target="_blank" className="block ml-3 mr-2 w-7"><img src="/github.svg" alt="Hello!" className=""/></a>
                <a href="https://facebook.com" className="block ml-3 mr-2 w-7"><img src="/facebook.svg" alt="Hello!" className=""/></a>
                <a href="https://tiktok.com" className="block ml-3 mr-2 w-7"><img src="/tiktok.svg" alt="Hello!" className=""/></a>

            </div>
            <p className="text-center text-[#8f8f8f] mb-10">&copy; {new Date().getFullYear()} Chyliński Daniel</p>
        </div>
    )
}

export default LoginPage;