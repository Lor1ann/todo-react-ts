import { createStore, combineReducers } from "redux";
import { tasksReducer } from "./reducers/tasks";
import { FilterReducer } from "./reducers/filter";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  filter: FilterReducer,
  tasks: tasksReducer,
});
const store = createStore(rootReducer);

export default store;
