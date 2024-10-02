import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import auth from "../../Auth/Auth.tsx";

const AddNewTask = () => {
    const navigate = useNavigate();
    document.title = "Dodaj nowe zadanie! | TODO - Domu 🏠";
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [expire, setExpire] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if(localStorage.getItem('id') === null){
            navigate('/');
        }
    }, []);
    const addTask = (e: React.FormEvent) => {
        e.preventDefault();

        let expireDate = expire.replace(/-/g, '/');
        const date = new Date(expireDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        expireDate = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
        console.log(expireDate);

        const task = {
            user_id: localStorage.getItem('id'),
            title: title,
            description: content,
            expire: expireDate,
            done: false
        }

        auth.addTask(task)
            .then(() => {
                navigate('/');
            })
            .catch(() => {
                setError(true);
            })
    }
    return (
        <div className="mt-16 ml-5 mr-5 md:ml-40 md:mr-40">
            <div className="text-end">
                <Link to={'/'}><button className="border-2 border-amber-500 p-3 w-72 rounded-md hover:bg-amber-500 hover:text-white transition-all">Wróć do wszystkich zadań</button></Link>
            </div>

            <div className="text-center mt-16">
                <h1 className="text-4xl">Dodaj nowe zadanie!</h1>
            </div>

            <form>
                <div className="form flex flex-col md:flex-row pt-10 pb-10 pr-10 pl-10 border-b-2 border-b-gray-200">
                    <div className="w-full md:w-1/4 pl-10 pr-10 flex items-center justify-center md:justify-end">
                        <p className="font-bold">Tytuł</p>
                    </div>
                    <div className="w-full md:w-3/4 md:pl-10 md:pr-10 mt-3 md:mt-0">
                        <input onChange={(e) => setTitle(e.target.value)} className="border-2 border-gray-200 pl-3 pr-3 pt-2 pb-2 w-full" type="text" name="title" id="title" placeholder="Tytuł..."/>
                    </div>
                </div>

                <div className="form flex flex-col md:flex-row pt-10 pb-10 pr-10 pl-10 border-b-2 border-b-gray-200">
                    <div className="w-full md:w-1/4 pl-10 pr-10 flex items-center justify-center md:justify-end">
                        <p className="font-bold">Opis zadania</p>
                    </div>
                    <div className="w-full md:w-3/4 md:pl-10 md:pr-10 mt-3 md:mt-0">
                        <textarea onChange={(e) => setContent(e.target.value)} name="description" id="description" className="border-2 border-gray-200 pl-3 pr-3 pt-2 pb-2 w-full" placeholder="Opis..."></textarea>
                    </div>
                </div>

                <div className="form flex flex-col md:flex-row pt-10 pb-10 pr-10 pl-10 border-b-2 border-b-gray-200">
                    <div className="w-full md:w-1/4 md:pl-10 md:pr-10 flex items-center justify-center md:justify-end">
                        <p className="font-bold">Termin</p>
                    </div>
                    <div className="w-full md:w-3/4 pl-10 pr-10 mt-3 md:mt-0">
                        <input className="w-full" onChange={(e) => setExpire(e.target.value)} type="date" name="" id=""/>
                    </div>
                </div>

                <div className="form flex pt-10 pb-10 pr-10 pl-10 justify-center">
                    <button onClick={addTask} className="bg-amber-500 p-3 w-60 rounded-md text-white hover:bg-amber-700 transition-all ">Dodaj nowe zadanie</button>
                </div>

                <p className={"text-center text-red-500" + (!error ? " hidden" : "")}>Błąd dodawania na serwer...</p>
            </form>
        </div>
    )
}

export default AddNewTask;