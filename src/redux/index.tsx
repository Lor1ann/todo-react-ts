import { createStore } from "redux";

type Tasks = {
  id: number;
  text: string;
  completed: boolean;
};

type Actions =
  | { type: "ADD_TASK"; payload: { text: string; completed: boolean } }
  | { type: "DELETE_TASK"; payload: { id: number } }
  | { type: "DELETE_ALL" }
  | { type: "TOGGLE_CHECKBOX"; payload: { id: number } }
  | { type: "TOGGLE_CHECK_ALL" }
  | { type: "SET_FILTER"; payload: { status: number } };

const store = createStore(reducer, { filterBy: "all", tasks: [] });

function reducer(state: any, action: Actions) {
  if (action.type === "ADD_TASK") {
    return {
      ...state,
      tasks: [
        ...state.tasks,
        {
          id: state.tasks.length,
          text: action.payload.text,
          completed: action.payload.completed,
        },
      ],
    } as Array<Tasks>;
  }

  if (action.type === "DELETE_TASK") {
    return {
      ...state,
      tasks: state.tasks.filter((elem: { id: number }) => {
        if (elem.id !== action.payload.id) {
          return true;
        }
      }),
    };
  }

  if (action.type === "DELETE_ALL") {
    return { ...state, tasks: [] };
  }

  if (action.type === "TOGGLE_CHECKBOX") {
    return {
      ...state,
      tasks: state.tasks.map((obj: { id: number; completed: any }) => {
        if (action.payload.id === obj.id) {
          return {
            ...obj,
            completed: !obj.completed,
          };
        }
        return obj;
      }),
    };
  }

  if (action.type === "TOGGLE_CHECK_ALL") {
    const notCompleted = state.tasks.find(
      (obj: { completed: any }) => !obj.completed
    );
    return {
      ...state,
      tasks: state.tasks.map((obj: any) => ({
        ...obj,
        completed: Boolean(notCompleted),
      })),
    };
  }

  if (action.type === "SET_FILTER") {
    return { ...state, filterBy: action.payload.status };
  }

  return state;
}

export default store;
