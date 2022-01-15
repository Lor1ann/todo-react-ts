import "./App.css";
import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

type Task = {
  id: number;
  text: string;
  complited: boolean;
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, [] as Array<Task>);

  function reducer(
    state: Array<Task>,
    action: {
      type: string;
      payload?: any;
    }
  ) {
    if (action.type === "ADD_TASK") {
      return [
        ...state,
        {
          id: state.length,
          text: action.payload.text,
          complited: action.payload.complited,
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
    return state;
  }

  function addTask(text: string, complited: boolean) {
    if (text.trim()) {
      dispatch({
        type: "ADD_TASK",
        payload: { text, complited },
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
                checked={obj.complited}
                onDelete={deleteTask}
              />
            );
          })}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
