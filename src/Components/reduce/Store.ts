import {combineReducers, createStore} from "redux";
import {todolistReduce} from "./todolistReduce";
import {taskReduce} from "./taskReduce";

export type RootReducerType=ReturnType<typeof rootReducer>

const rootReducer=combineReducers({
    todolist:todolistReduce,
    task:taskReduce

})

export const store = createStore(rootReducer)