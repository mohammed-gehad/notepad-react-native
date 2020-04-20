import React,{useReducer} from 'react'
import { View, Text } from 'react-native'
import noteAPI from '../api/noteApi'

export const Context = React.createContext()

export const Provider =({children})=>{
    const reducer = (prevState,action) => {
        switch(action.type){
            case 'getNotes' :
                return action.payload
            default : return prevState
        }
    }

    const getNotes =async()=>{
        try{    
            const notes =await noteAPI.get('/user/notes')
            dispatch({type:'getNotes',payload:notes.data})
        }
        catch(e){
            console.log(e)
        }

    }
    
    const [state , dispatch]= useReducer(reducer,[])
    return(
        <Context.Provider value={{state ,getNotes}}>
            {children}
        </Context.Provider>
    )
}