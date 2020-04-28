import React, { useReducer } from "react";
import { View, Text, AsyncStorage } from "react-native";
import noteAPI from "../api/noteApi";
const _ = require("lodash");

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const reducer = (prevState, action) => {
    switch (action.type) {
      case "getNotes":
        return action.payload;
      case "addNote":
        return [action.payload, ...prevState];
      case "updateNote": {
        const index = _.findIndex(prevState, { _id: action.payload._id });
        prevState[index].title = action.payload.title;
        prevState[index].content = action.payload.content;
        return prevState;
      }
      case "deleteNote": {
        const newState = prevState.filter(
          (item) => item._id !== action.payload
        );
        return newState;
      }
      case "logout":
        return [];
      default:
        return prevState;
    }
  };

  const [state, dispatch] = useReducer(reducer, []);

  const getNotes = () =>
    new Promise(async (resolve, reject) => {
      try {
        const notes = await noteAPI.get("/user/notes");
        dispatch({ type: "getNotes", payload: notes.data });
        return resolve();
      } catch (e) {
        console.log(e);
        return reject();
      }
    });
  const addNote = (title, content, color) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await noteAPI.post("/note/", {
          title,
          content,
          color,
        });
        if (data._id) {
          dispatch({ type: "addNote", payload: data });
          return resolve(data);
        } else {
          return reject(data);
        }
      } catch (e) {
        console.log(e);
      }
    });

  const updateNote = (_id, title, content, color) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await noteAPI.put("/note/", {
          _id,
          title,
          content,
          color,
        });
        if (data._id) {
          dispatch({ type: "updateNote", payload: data });
          resolve();
        } else {
          reject();
        }
      } catch (e) {
        console.log(e);
      }
    });

  const deleteNote = ({ _id }) =>
    new Promise(async (resolve, reject) => {
      try {
        await noteAPI.delete(`/note/${_id}`).then(() => {
          dispatch({ type: "deleteNote", payload: _id });
          resolve();
        });
      } catch (e) {
        console.log(e);
      }
    });

  const logout = async () => {
    try {
      dispatch({ type: "logout" });
    } catch (e) {}
  };

  return (
    <Context.Provider
      value={{
        state,
        addNote,
        logout,
        updateNote,
        deleteNote,
        getNotes,
      }}
    >
      {children}
    </Context.Provider>
  );
};
