import "./App.css";
import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type Actions =
  | { type: "ADD_TASK"; payload: { text: string; completed: boolean } }
  | { type: "DELETE_TASK"; payload: { id: number } }
  | { type: "DELETE_ALL" }
  | { type: "TOGGLE_CHECKBOX"; payload: { id: number } }
  | { type: "TOGGLE_CHECK_ALL" };

type State = Array<Task>;

function reducer(state: State, action: Actions) {
  if (action.type === "ADD_TASK") {
    return [
      ...state,
      {
        id: state.length,
        text: action.payload.text,
        completed: action.payload.completed,
      },
    ] as Array<Task>;
  }

  if (action.type === "DELETE_TASK") {
    return state.filter((elem) => {
      if (elem.id !== action.payload.id) {
        return true;
      }
    });
  }

  if (action.type === "DELETE_ALL") {
    return [];
  }

  if (action.type === "TOGGLE_CHECKBOX") {
    return state.map((obj) => {
      if (action.payload.id === obj.id) {
        return {
          ...obj,
          completed: !obj.completed,
        };
      }
      return obj;
    });
  }

  if (action.type === "TOGGLE_CHECK_ALL") {
    const notCompleted = state.find((obj) => !obj.completed);
    return state.map((obj) => ({
      ...obj,
      completed: Boolean(notCompleted),
    }));
  }
  return state;
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, [] as Array<Task>);

  function addTask(text: string, completed: boolean) {
    if (text.trim()) {
      dispatch({
        type: "ADD_TASK",
        payload: { text, completed },
      });
    } else {
      alert("Вы не ввели текст задачи!");
    }
  }

  function deleteTask(id: number) {
    const solution = window.confirm("Вы точно хотите удалить задачу?");

    if (solution) {
      dispatch({
        type: "DELETE_TASK",
        payload: { id },
      });
    }
  }

  function deleteAllTasks() {
    const solution = window.confirm("Вы точно хотите удалить все задачи?");

    if (solution) {
      dispatch({
        type: "DELETE_ALL",
      });
    }
  }

  function toggleCheckbox(id: number) {
    dispatch({
      type: "TOGGLE_CHECKBOX",
      payload: { id },
    });
  }

  function checkAllTasks() {
    dispatch({
      type: "TOGGLE_CHECK_ALL",
    });
  }

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAdd={addTask} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj: any) => {
            return (
              <Item
                text={obj.text}
                key={obj.id}
                id={obj.id}
                checked={obj.completed}
                onDelete={deleteTask}
                onCheck={toggleCheckbox}
              />
            );
          })}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={checkAllTasks}>Отметить всё</Button>
          <Button onClick={deleteAllTasks}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
