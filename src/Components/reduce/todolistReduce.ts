import {ButtonTitleType, TodolistsType} from "../../App";
import {v1} from "uuid";


export let todolistId1 = v1()
export let todolistId2 = v1()

const initialTodolist: TodolistsType[] = [
    {id: todolistId1, title: "What to learn", filter: "All"},
    {id: todolistId2, title: "What to buy", filter: "All"}
]


export const todolistReduce=(state:TodolistsType[]=initialTodolist,action:TsarType):TodolistsType[]=>{
    switch (action.type){
        case "REMOVE-TODOLIST":{

            return state.filter(el=>el.id!==action.payload.idTodolist)
        }
        case "CREATE-NEW-TODOLIST":{
           const newTudulist:TodolistsType = {id: action.payload.todolistId, title: action.payload.title, filter: "All"}
            return [...state,newTudulist]
        }
        case "FILTER-BUTTON":{
            return state.map(el=>el.id===action.payload.idTodolist?{...el,filter:action.payload.filter}:el)
        }
        case "DOUBLE-CLICK-RENAME-TODOLIST":{
            return state.map(el=>el.id===action.payload.idTodolist?{...el,title:action.payload.newTitle}:el)
        }
        default:return state
    }
}

export type TsarType = ReturnType<typeof removeTodolistAC>|
    ReturnType<typeof createTodolistAC>|
    ReturnType<typeof filterButtonAC>|
    ReturnType<typeof doubleClickRenameTodolistAC>
export const removeTodolistAC=(idTodolist: string)=>{
    return{
        type:"REMOVE-TODOLIST",
        payload:{idTodolist}
    }as const
}
export const createTodolistAC=(title: string,todolistId:string)=>{
    return{
        type:"CREATE-NEW-TODOLIST",
        payload:{title,todolistId}
    }as const
}
export const filterButtonAC=(idTodolist: string, filter: ButtonTitleType)=>{
    return{
        type:"FILTER-BUTTON",
        payload:{idTodolist,filter}
    }as const
}
export const doubleClickRenameTodolistAC=(idTodolist: string, newTitle: string)=>{
    return{
        type:"DOUBLE-CLICK-RENAME-TODOLIST",
        payload:{idTodolist,newTitle}
    }as const
}