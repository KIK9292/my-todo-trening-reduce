import React from 'react';
import {ButtonTitleType, TaskId} from "../../App";
import {Button} from "../Button/Button";
import {CheckBox} from "../CheckBox/CheckBox";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import "../../App.css"

type TodolistTypeProps = {
    idTodolist: string
    taskAfterfilter: TaskId[]
    titleTodolist: string
    createNewTask:(idTodolist: string,title:string)=>void
    changeStatusCheckbox:(idTodolist: string,idTask:string,isDone:boolean)=>void
    removeTask:(idTodolist: string,idTask:string)=>void
    removeTodolist:(idTodolist: string)=>void
    filterButton:(idTodolist: string,filter:ButtonTitleType)=>void
    doubleClickRenameTask:(idTodolist: string,idTask:string,newTitle:string)=>void
    doubleClickRenameTodolist:(idTodolist: string,newTitle:string)=>void
}


export const Todolist = (props: TodolistTypeProps) => {
    const {idTodolist, taskAfterfilter, titleTodolist,createNewTask,changeStatusCheckbox,removeTask,removeTodolist,filterButton,doubleClickRenameTask,doubleClickRenameTodolist} = props

// const createNewTaskCallback=(value:string)=>{
//     createNewTask(value,idTodolist)
// }
// const ButtonNewTaskHandler=()=>{
//     createNewTaskCallback(value)
// }
const createNewTaskCallbakID=(title:string)=>{
        createNewTask(idTodolist,title)
}
const changeStatusCheckboxCallbakID=(idTask:string,isDone:boolean)=>{
    changeStatusCheckbox(idTodolist,idTask,isDone)
}
const removeTaskCallbakID=(idTask:string)=>{
    removeTask(idTodolist,idTask)
}
const removeTodolistCallbakID=()=>{
    removeTodolist(idTodolist)
}

// const filterButtonCallBackId = (nameButton:ButtonTitleType) => {
//     filterButton(idTodolist,nameButton)
// }
const doubleClickRenameTaskCallbakId=(idTask:string,newTitle:string)=>{
    doubleClickRenameTask(idTodolist,idTask,newTitle)
}

    return (
        <div className={"todo"}>
            <h3><EditableSpan callBack={(newTitle)=>doubleClickRenameTodolist(idTodolist,newTitle)} oldtitle={titleTodolist}/><Button nameButton={"X"} callback={removeTodolistCallbakID}/></h3>
            <AddItemForm callback={createNewTaskCallbakID}/>
            <ul>
                {taskAfterfilter.map(el=>{
                    return(
                        <li key={el.id}>
                            <CheckBox  callback={(checkedStatus)=>changeStatusCheckboxCallbakID(el.id,checkedStatus)} checked={el.isDone}/>
                            {/*<span>{el.title}</span>*/}
                            <EditableSpan oldtitle={el.title} callBack={(newTitle)=>{doubleClickRenameTaskCallbakId(el.id,newTitle)}}/>
                            <Button nameButton={"X"} callback={()=>{removeTaskCallbakID(el.id)}}/>
                        </li>

                    )
                })}
            </ul>
            <Button nameButton={"All"} callback={()=>{filterButton(idTodolist,"All")}}/>
            <Button nameButton={"Active"} callback={()=>{filterButton(idTodolist,"Active")}}/>
            <Button nameButton={"Completed"} callback={()=>{filterButton(idTodolist,"Completed")}}/>
        </div>
    );
};

