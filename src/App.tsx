import "./App.css";
import { Paper, Divider, Button, List } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";
import { useSelector, useDispatch } from "react-redux";
import Filter from "./components/Filter";

type Tasks = {
  id: number;
  text: string;
  completed: boolean;
};

type State = { filter: { filterBy: string }; tasks: Tasks[] };

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  console.log(state);
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

  function editText(text: string, id: number) {
    dispatch({
      type: "EDIT_TEXT",
      payload: { text, id },
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
        <Filter />
        <Divider />
        <List>
          {state.tasks
            .filter((obj) => {
              if (state.filter.filterBy === "all") {
                return true;
              }
              if (state.filter.filterBy === "completed") {
                return obj.completed;
              }
              if (state.filter.filterBy === "active") {
                return !obj.completed;
              }
            })
            .map((obj: any) => {
              return (
                <Item
                  text={obj.text}
                  key={obj.id}
                  id={obj.id}
                  checked={obj.completed}
                  onDelete={deleteTask}
                  onCheck={toggleCheckbox}
                  onEdit={editText}
                />
              );
            })}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button disabled={state.tasks.length === 0} onClick={checkAllTasks}>
            Отметить всё
          </Button>
          <Button disabled={state.tasks.length === 0} onClick={deleteAllTasks}>
            Очистить
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
