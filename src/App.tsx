import "./App.css";
import React from "react";
import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function App() {
  type Task = {
    id: number;
    text: string;
    complited: boolean;
  };

  function reduser(
    state: Array<Task>,
    action: { type: string; text?: string; complited: boolean }
  ) {
    if (action.type === "ADD_TASK") {
      return [
        ...state,
        {
          id: state.length,
          text: action.text,
          complited: action.complited,
        },
      ] as Array<Task>;
    }

    return state;
  }

  const [text, setText] = React.useState<string>("");
  const [checkAddField, setCheckAddField] = React.useState(false);

  function getText(e: any) {
    setText(e.target.value);
  }

  function getCheck() {
    setCheckAddField(!checkAddField);
  }

  const [state, dispatch] = React.useReducer(reduser, [] as Array<Task>);

  function addTask() {
    dispatch({
      type: "ADD_TASK",
      text: text,
      complited: checkAddField,
    });
    setText("");
    setCheckAddField(false);
  }

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          checked={checkAddField}
          addTask={addTask}
          getText={getText}
          text={text}
          getCheck={getCheck}
        />
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
              <Item text={obj.text} key={obj.id} checked={obj.complited} />
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
