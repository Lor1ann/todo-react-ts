import { Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";

const filterIndex = { all: 0, active: 1, completed: 2 } as any;

const Filter = () => {
  const state = useSelector((state: RootState) => state.filter.filterBy);
  console.log(state);
  const dispatch = useDispatch();

  function setFilter(_: any, newIndex: number) {
    const status = Object.keys(filterIndex)[newIndex];
    dispatch({
      type: "SET_FILTER",
      payload: { status },
    });
  }
  return (
    <Tabs onChange={setFilter} value={filterIndex[state]}>
      <Tab label="Все" />
      <Tab label="Активные" />
      <Tab label="Завершённые" />
    </Tabs>
  );
};

export default Filter;
