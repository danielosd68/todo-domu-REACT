import {JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState} from "react";
import auth from "../../Auth/Auth.tsx";
import {Link} from "react-router-dom";


const App = (props: any) => {
    document.title = "Wszystkie zadania | TODO App";
    const [tasks, setTasks] = useState<any>(null);
    const [todayTasks, setTodayTasks] = useState<any>(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('id') !== null){
            auth.getTasks(Number(localStorage.getItem('id')))
                // @ts-ignore
                .then(data => setTasks(data))
                .catch(reason => console.log(reason));
        }
        else{
            props.logout();
        }


    }, []);

    useEffect(() => {
        if(refresh){
            auth.getTasks(Number(localStorage.getItem('id')))
                // @ts-ignore
                .then(data => setTasks(data))
                .catch(reason => console.log(reason))
                .finally(() => {
                    setRefresh(false);
                });


            auth.getTodayTasks(tasks)
                // @ts-ignore
                .then(data => setTodayTasks(data))
                .catch(reason => console.log(reason))
                .finally(() => {
                    setRefresh(false);
                })
        }
    }, [refresh]);

    useEffect(() => {
        auth.getTodayTasks(tasks)
            // @ts-ignore
            .then(data => setTodayTasks(data))
            .catch(reason => console.log(reason));
    }, [tasks]);

    return (
        <>
            <div
                className="nav bg-amber-500 w-full h-14 text-white flex justify-between items-center text-xl pl-10 pr-10">
                <h1 className="">TODO - Domu 🏠</h1>
                <button className="text-lg" onClick={() => {
                    props.logout();
                }}>Wyloguj się {localStorage.getItem('username')}</button>
            </div>


            <div className="w-11/12 ml-auto mr-auto mt-20">
                <div className="text-end">
                    <Link to={'/add-task'}>
                        <button className="bg-amber-500 p-3 w-48 rounded-md text-white hover:bg-amber-600 transition-all ">Dodaj</button>
                    </Link>
                </div>
                <h1 className="mb-10 mt-10 text-center text-3xl">Zadania na dzisiaj!</h1>
                <table className={"table-fixed w-full rounded-md text-xs md:text-sm" + (todayTasks === null || todayTasks.length === 0 ? " hidden" : "")}>
                    <thead>
                    <tr className="h-14 bg-gray-200">
                        <th>ID</th>
                        <th>Tytuł</th>
                        <th>Opis</th>
                        <th>Termin</th>
                        <th>Akcje</th>
                    </tr>
                    </thead>
                    {todayTasks && todayTasks.length > 0 ? todayTasks.map((task: {
                        done: boolean;
                        id: number;
                        title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
                        description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
                        expire: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
                    }, id: number) => (
                        <tr key={id} className={"h-12 border-t-2 border-t-gray-200 hover:bg-gray-300"}>
                            <td className="pl-5 pr-5">{id + 1}</td>
                            <td className="pl-5 pr-5">{task.title}</td>
                            <td className="pl-5 pr-5">{task.description}</td>
                            <td className="pl-5 pr-5">{task.expire}</td>
                            <td className="pl-5 pr-5 text-center md:text-xl">
                                <p onClick={() => {auth.setTaskAsDone(task.id); setRefresh(true);}} className="text-black p-2 rounded-md my-2 text-[13px] cursor-pointer">Oznacz jako wykonane!</p>
                                <p onClick={() => {setRefresh(true)}} className="text-red-500 p-2 rounded-md my-2 text-[13px] cursor-pointer">Usuń</p>
                            </td>
                        </tr>
                    )) : ""
                    }
                </table>
                <p className={!(todayTasks === null || todayTasks.length === 0) ? "hidden" : "text-center text-gray-400"}>Brak zadań na dzisiaj!</p>

                <h1 className="mt-10 mb-10 text-center text-3xl">Wszystkie zadania</h1>
                <table className={"table-fixed w-full rounded-md text-xs md:text-sm" + (tasks === null ? " hidden" : "")}>
                <thead>
                    {tasks && tasks.length > 0 && (
                        <tr className="h-14 bg-gray-200">
                        <th>ID</th>
                        <th>Tytuł</th>
                        <th>Opis</th>
                        <th>Termin</th>
                        <th>Akcje</th>
                    </tr>
                    )}
                    </thead>
                    {tasks && tasks.length > 0 ? tasks.map((task: {
                        done: boolean;
                        id: number;
                        title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
                        description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
                        expire: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
                    }, id: number) => (
                        
                        <tr key={id} className={"h-12 border-t-2 border-t-gray-200 hover:bg-gray-300" + (task.done ? " opacity-25" : "")}>
                            <td className="pl-5 pr-5">{id + 1}</td>
                            <td className="pl-5 pr-5">{task.title}</td>
                            <td className="pl-5 pr-5">{task.description}</td>
                            <td className="pl-5 pr-5">{task.expire}</td>
                            <td className="pl-5 pr-5 text-center md:text-xl">
                                <p onClick={() => {auth.setTaskAsDone(task.id); setRefresh(true)}} className="text-green-800 p-2 rounded-md my-2 text-[13px] cursor-pointer">Oznacz jako wykonane!</p>
                                <p onClick={() => {setRefresh(true)}} className="text-red-500 p-2 rounded-md my-2 text-[13px] cursor-pointer">Usuń</p>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className={"h-12 text-center text-gray-400"}>Brak zadań!</td>
                        </tr>
                    )}
                </table>
            </div>
            <p className="text-center mt-16 text-gray-400">&copy; Chyliński Daniel {new Date().getFullYear()}</p>
        </>
    )

}

export default App;