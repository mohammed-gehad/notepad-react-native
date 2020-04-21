import React, { useReducer ,useContext} from "react";
import { AsyncStorage } from "react-native";
import authAPI from "../api/noteApi";
import { color } from "react-native-reanimated";
const _ = require("lodash");
import {Context as NoteContext } from './NoteContext'

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const noteContext = useContext(NoteContext)
  const reducer = (state, action) => {
    switch (action.type) {
      case "signin":
        return action.payload;
      case "getToken":
          return {...state,token:action.payload}    
      case "logout":
        return { }     
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    email: "",
    username: "",
    note: [],
    token: "",
  });

  const signin = async (email, password) => {
    const {
      headers: { token },
      data,
    } = await authAPI.post("/user/login", { email, password });

    if (token) {
      await AsyncStorage.setItem("token", token);
      data.token = token;
      dispatch({
        type: "signin",
        payload: _.pick(data, ["email", "username", "note", "token"]),
      });
    }
    else{
        return new Promise.reject(data)
    }
  };

  const signup = async (username, email, password) => {
    const {
      headers: { token },
      data,
    } = await authAPI.post("/user/register", { username, email, password });
    if (token) {
      await AsyncStorage.setItem("token", token);
      data.token = token;
      dispatch({
        type: "signin",
        payload: _.pick(data, ["email", "username", "note", "token"]),
      });
    }
    else{
        return new Promise.reject(data)
    }
  };

  const getUserInfo = async () => {
    try {
      const {
        headers: { token },
        data,
      } = await authAPI.get("/user/me");
      if (token) {
        data.token = token;
        dispatch({
          type: "signin",
          payload: _.pick(data, ["email", "username", "note", "token"]),
        });
      }
    } catch (e) {
      console.log(e);
    }
    return new Promise.resolve(false)
  };

  const getToken =async ()=>{
      try{
          
          const token  =await AsyncStorage.getItem('token')
          if(token){
              dispatch({type:'getToken',payload:token})
            }
      }
      catch(e){
          console.log(e)
      }
      return new Promise.resolve(false)
  }

  const logout =async () =>{
    try{
      noteContext.logout()
      AsyncStorage.removeItem('token')
      dispatch({type:'logout'})
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <Context.Provider value={{ state, signin, signup, getUserInfo ,getToken , logout}}>
      {children}
    </Context.Provider>
  );
};
