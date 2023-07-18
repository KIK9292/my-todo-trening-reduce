import React from 'react';
import './App.css';
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {
    createTodolistAC,
    doubleClickRenameTodolistAC,
    filterButtonAC,
    removeTodolistAC
} from "./Components/reduce/todolistReduce";
import {createTodolistAndTaskAC, removeTodolistTaskAC} from "./Components/reduce/taskReduce";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./Components/reduce/Store";
import {Todolist} from "./Components/Todolist/CreateNewTaskCallbackID";


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

    const dispatch = useDispatch()

    const todolist = useSelector<RootReducerType, TodolistsType[]>(store => store.todolist)

    const removeTodolist = (idTodolist: string) => {

        dispatch(removeTodolistAC(idTodolist))
        dispatch(removeTodolistTaskAC(idTodolist))


    }

    const createNewTodolist = (title: string) => {
        let todolistId = v1()

        dispatch(createTodolistAC(title, todolistId))
        dispatch(createTodolistAndTaskAC(todolistId))

    }

const filterButton=(idTodolist: string,filter:ButtonTitleType)=>{
        dispatch(filterButtonAC(idTodolist,filter))
}

    const doubleClickRenameTodolist = (idTodolist: string, newTitle: string) => {

        dispatch(doubleClickRenameTodolistAC(idTodolist, newTitle))
    }
    return (
        <div className={"App"}>
            <div><h3>Add TODOLIST</h3>

                <AddItemForm callback={createNewTodolist}/></div>
            {
                todolist.map(el => {
                        return (
                            <Todolist
                                key={el.id}
                                idTodolist={el.id}
                                titleTodolist={el.title}
                                filterTodolist={el.filter}
                                removeTodolist={removeTodolist}
                                doubleClickRenameTodolist={doubleClickRenameTodolist}
                                filterButton={filterButton}
                            />
                        )


                    }
                )
            }
        </div>
    )
}

export default App;



