import {TasksStateType} from "../../App";
import {v1} from "uuid";

export const taskReduce=(state:TasksStateType,action:TsarType):TasksStateType=>{
    switch (action.type){
        case "CHANGE-STATUS_CHECKBOX":{
            return {...state,[action.payload.idTodolist]:
                    state[action.payload.idTodolist].map(el=>el.id===action.payload.idTask?{...el,isDone:action.payload.isDone}:el)}
        }
        case "REMOVE-TASK":{
            return {...state,[action.payload.idTodolist]:state[action.payload.idTodolist].filter(el=>el.id!==action.payload.idTask)}
        }
        case "REMOVE-TODOLIST-TASK":{
            delete state[action.payload.idTodolist]
            return {...state}
        }
        case "CREATE-TASK":{
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state,[action.payload.idTodolist]:[newTask,...state[action.payload.idTodolist]]}
        }
        case "CREATE-NEW-TODOLIST-AND-TAS":{
            return {...state,[action.payload.todolistId]:[]}
        }
        case "DOUBLE-CLICK-RENAME-TASK":{
            return {...state,[action.payload.idTodolist]:state[action.payload.idTodolist].map(el=>el.id===action.payload.idTask?{...el,title:action.payload.newTitle}:el)}
        }
        default:return state
    }
}


export type TsarType=
    ReturnType<typeof changeStatusCheckboxAC>|
    ReturnType<typeof removeTaskAC>|
    ReturnType<typeof removeTodolistTaskAC>|
    ReturnType<typeof createTaskAC>|
    ReturnType<typeof createTodolistAndTaskAC>|
    ReturnType<typeof doubleClickRenameTaskAC>
export const changeStatusCheckboxAC=(idTodolist: string, idTask: string, isDone: boolean)=>{
    return{
        type:"CHANGE-STATUS_CHECKBOX",
        payload:{idTodolist,idTask,isDone}
    }as const
}
export const removeTaskAC=(idTodolist: string, idTask: string)=>{
    return{
        type:"REMOVE-TASK",
        payload:{idTodolist,idTask}
    }as const
}
export const removeTodolistTaskAC=(idTodolist: string)=>{
    return{
        type:"REMOVE-TODOLIST-TASK",
        payload:{idTodolist}
    }as const
}
export const createTaskAC=(idTodolist: string, title: string)=>{
    return{
        type:"CREATE-TASK",
        payload:{idTodolist,title}
    }as const
}
export const createTodolistAndTaskAC=(todolistId:string)=>{
    return{
        type:"CREATE-NEW-TODOLIST-AND-TAS",
        payload:{todolistId}
    }as const
}
export const doubleClickRenameTaskAC=(idTodolist: string, idTask: string, newTitle: string)=>{
    return{
        type:"DOUBLE-CLICK-RENAME-TASK",
        payload:{idTodolist, idTask, newTitle}
    }as const
}