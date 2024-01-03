import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    xxxx: (state) => {
      state.value += 1;
    },
    yyyy: (state) => {
      state.value -= 1;
    },
  },
});
export const { xxxx, yyyy } = counterSlice.actions;
export default counterSlice.reducer;
