import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../reduce/Store";
import {ButtonTitleType, TasksStateType} from "../../App";
import {changeStatusCheckboxAC, createTaskAC, doubleClickRenameTaskAC, removeTaskAC} from "../reduce/taskReduce";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button} from "../Button/Button";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {CheckBox} from "../CheckBox/CheckBox";
import React from "react";

type TodolistTypeProps = {
    idTodolist: string
    titleTodolist: string
    removeTodolist: (idTodolist: string) => void
    filterButton: (idTodolist: string, filter: ButtonTitleType) => void
    doubleClickRenameTodolist: (idTodolist: string, newTitle: string) => void
    filterTodolist: ButtonTitleType
}
export const Todolist = (props: TodolistTypeProps) => {
    const {idTodolist, titleTodolist, removeTodolist, doubleClickRenameTodolist, filterTodolist, filterButton} = props
    const dispatch = useDispatch()


    const task = useSelector<RootReducerType, TasksStateType>(store => store.task)
    let allTasksTodolist = task[idTodolist]
    let taskAfterfilter = allTasksTodolist

    if (filterTodolist === "Active") {
        taskAfterfilter = allTasksTodolist.filter(f => !f.isDone)
    }
    if (filterTodolist === "Completed") {
        taskAfterfilter = allTasksTodolist.filter(f => f.isDone)
    }
    const createNewTaskCallbackID = (title: string) => {
        // createNewTask(idTodolist,title)
        dispatch(createTaskAC(idTodolist, title))

    }
    const changeStatusCheckboxCallbackID = (idTask: string, isDone: boolean) => {
        // changeStatusCheckbox(idTodolist,idTask,isDone)
        dispatch(changeStatusCheckboxAC(idTodolist, idTask, isDone))
    }
    const removeTaskCallbackID = (idTask: string) => {
        // removeTask(idTodolist,idTask)
        dispatch(removeTaskAC(idTodolist, idTask))
    }
    const removeTodolistCallbackID = () => {
        removeTodolist(idTodolist)

    }

    const filterButtonCallBackId = (nameButton: ButtonTitleType) => {
        filterButton(idTodolist, nameButton)
    }
    const doubleClickRenameTaskCallbackId = (idTask: string, newTitle: string) => {
        // doubleClickRenameTask(idTodolist,idTask,newTitle)
        dispatch(doubleClickRenameTaskAC(idTodolist, idTask, newTitle))

    }

    return (
        <div className={"todo"}>
            <h3><EditableSpan callBack={(newTitle) => doubleClickRenameTodolist(idTodolist, newTitle)}
                              oldtitle={titleTodolist}/><Button nameButton={"X"} callback={removeTodolistCallbackID}/>
            </h3>
            <AddItemForm callback={createNewTaskCallbackID}/>
            <ul>
                {taskAfterfilter.map(el => {
                    return (
                        <li key={el.id}>
                            <CheckBox callback={(checkedStatus) => changeStatusCheckboxCallbackID(el.id, checkedStatus)}
                                      checked={el.isDone}/>
                            {/*<span>{el.title}</span>*/}
                            <EditableSpan oldtitle={el.title} callBack={(newTitle) => {
                                doubleClickRenameTaskCallbackId(el.id, newTitle)
                            }}/>
                            <Button nameButton={"X"} callback={() => {
                                removeTaskCallbackID(el.id)
                            }}/>
                        </li>

                    )
                })}
            </ul>
            <Button nameButton={"All"} callback={() => {
                filterButtonCallBackId("All")
            }}/>
            <Button nameButton={"Active"} callback={() => {
                filterButtonCallBackId("Active")
            }}/>
            <Button nameButton={"Completed"} callback={() => {
                filterButtonCallBackId("Completed")
            }}/>
        </div>
    );
};