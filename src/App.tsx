import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Components/Todolist/Todolist";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {
    createTodolistAC,
    doubleClickRenameTodolistAC,
    filterButtonAC,
    removeTodolistAC,
    todolostReduce
} from "./Components/reduce/todolostReduce";
import {
    changeStatusCheckboxAC,
    createTaskAC, createTodolistAndTaskAC, doubleClickRenameTaskAC,
    removeTaskAC,
    removeTodolistTaskAC,
    taskReduce
} from "./Components/reduce/taskReduce";


//Типизация Кнопок фильтрации
export type ButtonTitleType = "All" | "Active" | "Completed" // типизация кнопок фильтрации
// типизация стейта тудулистов
export type TodolistsType = {
    id: string
    title: string
    filter: ButtonTitleType
}
//Типизация Тасок
export type TasksStateType = {
    [key: string]: TaskId[]
}
export type TaskId = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    //Сттейтт тудулистов и начальное состояние блока фильтрации
    const stateTodolists: TodolistsType[] = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]


//Сттейтт тасок и начальное состояние чекбокса
    const stateTasks: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}

        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ],
    };

    let [todolist, dispatchTodolist] = useReducer(todolostReduce, stateTodolists)
    let [task, dispatchTask] = useReducer(taskReduce, stateTasks)


    const changeStatusCheckbox = (idTodolist: string, idTask: string, isDone: boolean) => {
        // setTasks({...tasks,[idTodolist]:tasks[idTodolist].map(el=>el.id===idTask?{...el,isDone}:el)})
        dispatchTask(changeStatusCheckboxAC(idTodolist,idTask,isDone))
    }
    const removeTask = (idTodolist: string, idTask: string) => {
        // setTasks({...tasks,[idTodolist]:tasks[idTodolist].filter(el=>el.id!==idTask)})
        dispatchTask(removeTaskAC(idTodolist,idTask))
    }
    const removeTodolist = (idTodolist: string) => {
// setTodolists(todolists.filter(el=>el.id!==idTodolist))
//     delete tasks[idTodolist]
//     console.log(tasks)
        dispatchTodolist(removeTodolistAC(idTodolist))
        dispatchTask(removeTodolistTaskAC(idTodolist))


    }
    const createNewTask = (idTodolist: string, title: string,) => {
        // const newTask = {id: v1(), title: title, isDone: false}
        // setTasks({...tasks, [idTodolist]: [newTask, ...tasks[idTodolist]]})
// setTasks({...tasks,[idTodolist]:[newTask,...tasks[idTodolist]]})
        dispatchTask(createTaskAC(idTodolist,title))
    }
    const createNewTodolist = (title: string) => {
        let todolistId = v1()
        // const newTudulis:TodolistsType = {id: todolistId, title: title, filter: "All"}
        // setTodolists([...todolists, newTudulis])
        // setTasks({...tasks,[todolistId]:[]})
dispatchTodolist(createTodolistAC(title,todolistId))
        dispatchTask(createTodolistAndTaskAC(todolistId))

    }

    const filterButton = (idTodolist: string, filter: ButtonTitleType) => {
        // setTodolists(todolists.map(el=>el.id===idTodolist?{...el,filter}:el))
dispatchTodolist(filterButtonAC(idTodolist,filter))
    }
    const doubleClickRenameTask = (idTodolist: string, idTask: string, newTitle: string) => {
        // setTasks({...tasks,[idTodolist]:tasks[idTodolist].map(el=>el.id===idTask?{...el,title:newTitle}:el)})
dispatchTask(doubleClickRenameTaskAC(idTodolist, idTask, newTitle))
    }
    const doubleClickRenameTodolist = (idTodolist: string, newTitle: string) => {
// setTodolists(todolists.map(el=>el.id===idTodolist?{...el,title:newTitle}:el))
        dispatchTodolist(doubleClickRenameTodolistAC(idTodolist,newTitle))
    }
    return (
        <div className={"App"}>
            <div><h3>Add TODOLIST</h3>

                <AddItemForm callback={createNewTodolist}/></div>
            {
                todolist.map(el => {
                        let allTasksTodolist = task[el.id]
                        let taskAfterfilter = allTasksTodolist

                        if (el.filter === "Active") {
                            taskAfterfilter = allTasksTodolist.filter(f => f.isDone !== true)
                        }
                        if (el.filter === "Completed") {
                            taskAfterfilter = allTasksTodolist.filter(f => f.isDone !== false)
                        }
                        return (
                            <Todolist
                                key={el.id}
                                idTodolist={el.id}
                                titleTodolist={el.title}
                                taskAfterfilter={taskAfterfilter}
                                createNewTask={createNewTask}
                                changeStatusCheckbox={changeStatusCheckbox}
                                removeTask={removeTask}
                                removeTodolist={removeTodolist}
                                filterButton={filterButton}
                                doubleClickRenameTask={doubleClickRenameTask}
                                doubleClickRenameTodolist={doubleClickRenameTodolist}
                            />
                        )


                    }
                )
            }
        </div>
    )
}

export default App;



