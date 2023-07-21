import {useEffect, useState} from "react";
import {todolistApi} from "../api/todolists-api";



export default {
    title:"TODOLIST-SPA/API/TODOLISTS"
}




export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getData()
            .then((res)=>{setState(res.data)})


    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodolist("NEW TODOLIST")
            .then((res)=>{setState(res.data)})
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.deleteTodolist("todoID")
            .then((res)=>{setState(res.data)})
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.updateTitleTodolist("todoId","createTodo")
            .then((res)=>{
                    setState(res.data)
                }
            )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks=()=>{
    const [state, setState] = useState<any>(null)
    let todolistID="88809762-08a4-42ee-8f93-9fd481754d69"
    useEffect(()=>{
        todolistApi.getTasks(todolistID)
            .then((res)=>{setState(res.data.items)})
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask=()=>{
    const [state, setState] = useState<any>(null)
    let todolistID="88809762-08a4-42ee-8f93-9fd481754d69"
    let taskID="f32b7fb7-f365-4ce2-a112-c4fa6ddb356d"
    useEffect(()=>{
        todolistApi.deleteTask(todolistID,taskID)
            .then((res)=>{setState(res.data.items)})
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateNewTask=()=>{
    const [state, setState] = useState<any>(null)
    let todolistID="88809762-08a4-42ee-8f93-9fd481754d69"
    let newTitle="NEW TASK STORYBOOK"
    useEffect(()=>{
        todolistApi.createTask(todolistID,newTitle)
            .then((res)=>{setState(res.data)})
    },[])
    return <div>{JSON.stringify(state)}</div>
}


export const UpdateTitleTask=()=>{
    const [state, setState] = useState<any>(null)
    let todolistID="88809762-08a4-42ee-8f93-9fd481754d69"
    let taskID="01bb091c-5093-4af7-9172-00bd22a5044d"
    let newTitle="UPDATE TASK STORYBOOK"
    useEffect(()=>{
        todolistApi.updateTitleTask(todolistID,taskID,newTitle)
            .then((res)=>{setState(res.data)})
    },[])
    return <div>{JSON.stringify(state)}</div>
}