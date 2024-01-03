import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface BossType {
  id: number;
  fullname: string;
  email: string;
  passw: string;
  isBoss: boolean;
  createdAt: string;
  usern: string;
  company: string;
  birthday: string;
}
const initialState: BossType = {
  id: -1,
  fullname: "",
  email: "",
  passw: "",
  isBoss: false,
  createdAt: "",
  usern: "",
  company: "",
  birthday: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<BossType>) => {
      // Update state properties individually
      state.id = action.payload.id;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.passw = action.payload.passw;
      state.isBoss = action.payload.isBoss;
      state.createdAt = action.payload.createdAt;
      state.usern = action.payload.usern;
      state.company = action.payload.company;
      state.birthday = action.payload.birthday;
    },
    logout: (state) => {
      // Reset state properties
      state.id = initialState.id;
      state.fullname = initialState.fullname;
      state.email = initialState.email;
      state.passw = initialState.passw;
      state.isBoss = initialState.isBoss;
      state.createdAt = initialState.createdAt;
      state.usern = initialState.usern;
      state.company = initialState.company;
      state.birthday = initialState.birthday;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
