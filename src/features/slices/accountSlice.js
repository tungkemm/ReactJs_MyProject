import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  infoAccount: {
    statusAccount: "idle",
    listAccount: [
      // {
      //   id: 2,
      //   fullname: "Kem Kem",
      //   address: "Hoa Binh",
      //   birthday: "26/11/2004",
      //   phone: 123,
      //   username: "tungkem",
      //   password: "123",
      //   gmail: "kem@gmail.com",
      // },
    ],
  },
  currentAccountLogin: {},
};

// GET list account
export const getAccountWork = createAsyncThunk(
  "work/getAccountWork",
  async () => {
    try {
      const response = await axios.get("http://localhost:4000/listaccount");
      return response.data;
    } catch (error) {
      console.error("loi call api", error);
    }
  }
);

// POST data len sever va return ve du lieu do
export const addNewAccount = createAsyncThunk(
  "work/addNewAccount",
  async (newaccount) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/listaccount",
        newaccount
      );
      return response.data;
    } catch (error) {
      console.error("loi call api", error);
    }
  }
);


export const accountSlice = createSlice({
  name: "account",
  initialState,

  reducers: {
    // current account
    updateCurrentAccountWhenLogin: (state, action) => {
      const accountLogin = state.infoAccount.listAccount.find(
        (account) =>
          account.username === action.payload.username &&
          account.password === action.payload.password
      );
      if (accountLogin) state.currentAccountLogin = accountLogin;
    },
    updateCurrentAccountWhenLogout: (state) => {
      state.currentAccountLogin = {};
    },
  },

  extraReducers: (builder) => {
    builder
      // Get account vao store
      .addCase(getAccountWork.pending, (state) => {
        state.infoAccount.statusAccount = "loading";
      })
      .addCase(getAccountWork.fulfilled, (state, action) => {
        state.infoAccount.listAccount = action.payload;
        state.infoAccount.statusAccount = "idle";
      })

      // Add new account
      .addCase(addNewAccount.pending, (state) => {
        state.infoAccount.statusAccount = "loading";
      })
      .addCase(addNewAccount.fulfilled, (state, action) => {
        state.infoAccount.listAccount.push(action.payload);
        state.infoAccount.statusAccount = "idle";
      })
  },
});

export const {
  updateCurrentAccountWhenLogin,
  updateCurrentAccountWhenLogout,
} = accountSlice.actions;

export default accountSlice.reducer;
