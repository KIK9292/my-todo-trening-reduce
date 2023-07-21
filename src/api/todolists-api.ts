import axios from "axios";


export const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'fdf6f163-b057-4eee-9b85-ec1216c43810'
    }
}

const instance=axios.create({baseURL:'https://social-network.samuraijs.com/api/1.1/',...settings})
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: string
}


type TodolistsResponseType<D> = {
    resultCode: number
    messages: string[],
    data: D
}

type TasksResponseType={
    items: ItemsTaskType[]
    totalCount:number
    error: string|null
}
export type ItemsTaskType={
    description: string
    title: string
    completed: boolean
    status: number
    priority:number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export const todolistApi = {
    getData() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<TodolistsResponseType<{ item: TodolistType }>>('todo-lists', {title})

    },
    deleteTodolist(todolistID: string) {

        return instance.delete<TodolistsResponseType<{ }>>(`todo-lists/${todolistID}`)
    },
    updateTitleTodolist(todolistID: string, title: string) {

        return instance.put<TodolistsResponseType<{}>>(`todo-lists/${todolistID}`,{title})},

    getTasks(todolistID: string){
        return instance.get<TasksResponseType>(`todo-lists/${todolistID}/tasks`)
    },
    deleteTask(todolistID: string,taskID:string){
        return instance.delete<TasksResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    },
    createTask(todolistID: string,title:string){
        return instance.post<TasksResponseType>(`todo-lists/${todolistID}/tasks`,{title})
    },
    updateTitleTask(todolistID: string,taskID:string,title:string){
        return instance.put<TasksResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`,{title})
    }
}

