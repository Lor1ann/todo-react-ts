type Filter = { type: "SET_FILTER"; payload: { status: number } };

const initialState: any = {
  filterBy: "all",
};

export function FilterReducer(state: any = initialState, action: Filter) {
  if (action.type === "SET_FILTER") {
    return { ...state, filterBy: action.payload.status };
  }

  return state;
}
