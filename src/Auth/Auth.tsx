//Singleton pattern
class Auth{

    private static instance: Auth = null as unknown as Auth;

    public static getInstance(): Auth{
        if(this.instance === null){
            this.instance = new Auth();
        }
        return Auth.instance;
    }

    public logIn(username: string, password: string){
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:3000/profiles?username=${username}`)
            .then((response) => {
                response.json()
                    .then((data) => {
                        if(data.length === 0){
                           reject({info: 'user does not exists'});
                        }
                        else{
                            if(data[0].password === password){
                                localStorage.setItem('username', data[0].username);
                                localStorage.setItem('id', data[0].id);
                                resolve(null);
                            }
                            else{
                                reject(false);
                            }

                        }

                    })
                    .catch(() => {
                        reject(false);
                    })
            })

        })
    }

    public signIn(user: User){
        return new Promise((resolve, reject) => {
            this.logIn(user.username, user.password)
                .then(() => {
                resolve({info: 'user already exists'});

            }).catch((reason) => {
                if(reason.info === 'user does not exists'){
                    fetch('http://localhost:3000/profiles', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'Application/json'
                        },
                        body: JSON.stringify(user)
                    })
                        .then(() => {
                            this.logIn(user.username, user.password).then(() => {
                                resolve(null);
                            })

                        })
                        .catch(() => {
                            reject();
                        })
                }
            })
        })
    }

    public getTasks(id: number){
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:3000/tasks?user_id=${id}`)
                .then((response) => {
                    response.json()
                        .then((data) => {
                            resolve(data);
                        })
                        .catch((reason) => {
                            reject(reason);
                        })
                })
                .catch((reason) => {
                   reject(reason);
                })
        });
    }

    public getTodayTasks(tasks: Task[]){
        return new Promise((resolve, reject) => {
            const todayDate = new Date();
            let day: string = String(todayDate.getDate());
            let month: string = String(todayDate.getMonth() + 1);
            const year: number = todayDate.getFullYear();

            if(Number(day) < 10){
                day = "0" + day;
            }

            if(Number(month) < 10){
                month = "0" + month;
            }

            const date = day + "/" + month + "/" + year;



            if(tasks !== null){
                const todayTasks = tasks.filter((task) => task.expire === date && !task.done);
                resolve(todayTasks);
            }
            else{
                reject();
            }
        })

    }

    public addTask(task: Omit<Task, "id">){
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/tasks', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            })
                .then((response) => resolve(response))
                .catch((reason) => reject(reason));
        })
    }

    public removeTask(id: number){
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/tasks/' + id, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((response) => resolve(response))
                .catch((reason) => reject(reason));
        })
    }

}

export interface User{
    username: string,
    password: string
}

export interface Task{
    id: number,
    user_id: number,
    title: string,
    description: string,
    expire: string,
    done: boolean
}

export default Auth;