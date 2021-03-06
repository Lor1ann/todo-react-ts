type Tasks = {
  id: number;
  text: string;
  completed: boolean;
};

type TasksAction =
  | { type: "ADD_TASK"; payload: { text: string; completed: boolean } }
  | { type: "DELETE_TASK"; payload: { id: number } }
  | { type: "DELETE_ALL" }
  | { type: "TOGGLE_CHECKBOX"; payload: { id: number } }
  | { type: "TOGGLE_CHECK_ALL" }
  | { type: "EDIT_TEXT"; payload: { text: string; id: string } };

const initialState: any[] = [];

export function tasksReducer(state: any = initialState, action: TasksAction) {
  if (action.type === "ADD_TASK") {
    return [
      ...state,
      {
        id: state.length,
        text: action.payload.text,
        completed: action.payload.completed,
      },
    ];
  }

  if (action.type === "DELETE_TASK") {
    return state.filter((elem: { id: number }) => {
      if (elem.id !== action.payload.id) {
        return true;
      }
    });
  }

  if (action.type === "DELETE_ALL") {
    return [];
  }

  if (action.type === "TOGGLE_CHECKBOX") {
    return state.map((obj: { id: number; completed: any }) => {
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
    const notCompleted = state.find(
      (obj: { completed: any }) => !obj.completed
    );
    return state.map((obj: any) => ({
      ...obj,
      completed: Boolean(notCompleted),
    }));
  }

  if (action.type === "EDIT_TEXT") {
    return state.map((obj: any) => {
      if (obj.id === action.payload.id) {
        return { ...obj, text: window.prompt("", action.payload.text) };
      }
      return obj;
    });
  }

  return state;
}
