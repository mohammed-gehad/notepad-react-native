import React, { useReducer } from "react";
import { View, Text } from "react-native";
import noteAPI from "../api/noteApi";
const _ = require("lodash");

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const reducer = (prevState, action) => {
    switch (action.type) {
      case "getNotes":
        return action.payload;
      case "addNote":
        return [...prevState, action.payload];
      case "updateNote": {
        const index = _.findIndex(prevState, { _id: action.payload._id });
        prevState[index].title = action.payload.title;
        prevState[index].content = action.payload.content;
        return prevState;
      }
      case "logout":
        return [];
      default:
        return prevState;
    }
  };

  const getNotes = async () => {
    try {
      const notes = await noteAPI.get("/user/notes");
      dispatch({ type: "getNotes", payload: notes.data });
    } catch (e) {
      console.log(e);
    }
  };

  const addNote = async (title, content) => {
    try {
      const { data } = await noteAPI.post("/note/", { title, content });
      if (data._id) {
        dispatch({ type: "addNote", payload: data });

        return new Promise.resolve(data);
      } else {
        return new Promise.reject(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateNote = async (_id, title, content) => {
    try {
      const { data } = await noteAPI.put("/note/", { _id, title, content });
      if (data._id) {
        dispatch({ type: "updateNote", payload: data });
        return new Promise.resolve(data);
      } else {
        return new Promise.reject(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      dispatch({ type: "logout" });
    } catch (e) {}
  };

  const [state, dispatch] = useReducer(reducer, []);
  return (
    <Context.Provider value={{ state, getNotes, addNote, logout, updateNote }}>
      {children}
    </Context.Provider>
  );
};
