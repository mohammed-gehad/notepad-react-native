import React, { useReducer } from "react";
import { AsyncStorage } from "react-native";
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
        await noteAPI
          .get("/user/notes")
          .then(
            ({ data }) =>
              new Promise((resolve, reject) => {
                dispatch({ type: "getNotes", payload: data });
                resolve(data);
              })
          )
          .then((data) => {
            _saveLocal(data);
          });
        return resolve();
      } catch (e) {
        console.log(e);
        return reject();
      }
    });

  const _saveLocal = (data) =>
    new Promise(async (resolve, reject) => {
      if (data)
        await AsyncStorage.setItem("state", JSON.stringify(data)).then(resolve);
      else reject();
    });

  const _getLocal = () =>
    new Promise(async (resolve, reject) => {
      await AsyncStorage.getItem("state").then((data) => {
        data = JSON.parse(data);
        if (data) dispatch({ type: "getNotes", payload: data });
        else getNotes();
        resolve();
      });
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
      await AsyncStorage.clear();
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
        _getLocal,
      }}
    >
      {children}
    </Context.Provider>
  );
};
