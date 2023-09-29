import { useState } from "react";
import React from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [toDo, setToDo] = useState([]);
  const [archivedItems, setArchivedItems] = useState([]);
  const [editText, setEditText] = useState("");

  const changeHandler = (event) => {
    setInputText(event.target.value);
  };

  const addItem = (item) => {
    if(item === ""){} else {
    const storedItems = [...toDo];
    storedItems.push(item);
    setToDo(storedItems);
    setInputText("");
  }};

  const removeHandler = (clickedIndex) => {
    const storedItems = [...toDo];
    storedItems.splice(clickedIndex, 1);
    setToDo(storedItems);
  };

  const editHandler = (event) => {
    setEditText(event.target.value);
  };

  const editItem = (item, clickedIndex) => {
    if(item === ""){} else {
    const editItems = [...toDo];
    editItems.splice(clickedIndex, 1, item);
    setToDo(editItems);
    setEditText("");
  }};

  const done = (item, index) => {
    const archive = [...archivedItems];
    archive.push(item);
    setArchivedItems(archive);
    removeHandler(index);
  };

  const removeArchive = (clickedIndex) => {
    const storedArchive = [...archivedItems];
    storedArchive.splice(clickedIndex, 1);
    setArchivedItems(storedArchive);
  };

  return (
    <div className="App">
      <div className="toDo">
        <h1>To Do List</h1>
        <input
          id="input "
          value={inputText}
          type="text"
          onChange={changeHandler}
        ></input>
        <button className="add" onClick={() => addItem(inputText)}>✚</button>
        {toDo.map((item, index) => {
          return (
            <div key={index}>
              <h3>{item}</h3>
              <ToDo
                index={index}
                editItem={editItem}
                editHandler={editHandler}
                editText={editText}
              />
              <button className="done" onClick={() => done(item, index)}>
                ✔️
              </button>
              <button className="delete" onClick={() => removeHandler(index)}>
                ❌
              </button>
            </div>
          );
        })}
        <div className="completed">
        <h1>Completed Items</h1>
        {archivedItems.map((item, index) => {
          return (
            <div key={index}>
              <h3>{item}</h3>
              <button className="delete" onClick={() => removeArchive(index)}>
                ❌
              </button>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

const ToDo = ({ index, editText, editHandler, editItem }) => {
  const [toggle, setToggle] = useState(false);
  const edit = () => {
    setToggle(!toggle);
    editItem(editText, index);
  };

  return (
    <>
      {toggle && (
        <div>
          <input
            id={index}
            value={editText}
            type="text"
            onChange={editHandler}
          ></input>
          <button className="edit" onClick={() => edit()}>
            💾
          </button>
        </div>
      )}
      <button className="edit" onClick={() => setToggle(!toggle)}>
        ✏️
      </button>
    </>
  );
};

export default App;
