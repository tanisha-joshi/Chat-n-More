import {initialState} from './reducer.js'
import React,{createContext,useContext,useReducer} from "react"
export const StateContext=createContext();
export const StateProvider=({reducer,intialState,children})=>{
    return (
        <StateContext.Provider value={useReducer(reducer,initialState)}>
            {children}
        </StateContext.Provider>
    )

}
export default StateProvider;
export const useStateValue=()=>useContext(StateContext); 