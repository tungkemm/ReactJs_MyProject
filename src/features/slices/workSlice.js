import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  infoWork: {
    statusWork: "idle",
    listWork: [
      // {
      //   id: 1,
      //   namework: "Dau lung",
      //   priority: "Medium",
      //   status: true,
        //   1 - false: chua hoan thanh
        //   2 - true: da hoan thanh cong viec
      // },
    ],
  },
  filterWork: {
    searchByText: "",
    searchBtStatus: "All",
    searchByPriority: [],
  },
};

// GET data list work tu sever ve
export const getListWork = createAsyncThunk("work/getListWork", async () => {
  try {
    const response = await axios.get("http://localhost:4000/listwork");
    return response.data;
  } catch (error) {
    console.error("loi call api", error);
  }
});

// POST data len sever va return ve du lieu do
export const addNewWork = createAsyncThunk(
  "work/addNewWork",
  async (newwork) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/listwork",
        newwork
      );
      return response.data;
    } catch (error) {
      console.error("loi call api", error);
    }
  }
);

// DELETE data va return ve du lieu do
export const deleteWork = createAsyncThunk("work/deleteWork", async (id) => {
  try {
    await axios.delete(`http://localhost:4000/listwork/${id}`);
    const response = await axios.get("http://localhost:4000/listwork");
    return response.data;
  } catch (error) {
    console.error("loi call api", error);
  }
});

// UPDATE status complete va return ve obj do
export const updateStatusWork = createAsyncThunk(
  "work/updateStatusWork",
  async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/listwork/${data.id}`,
        {
          ...data,
          status: !data.status,
        }
      );
      return response.data;
    } catch (error) {
      console.error("loi call api", error);
    }
  }
);

// UPDATE data va return ve du lieu do
export const updateWork = createAsyncThunk("work/updateWork", async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/listwork/${data.id}`,
      {
        ...data,
        namework: data.namework,
        priority: data.priority,
        status: data.status,
      }
    );
    return response.data;
  } catch (error) {
    console.error("loi call api", error);
  }
});

export const workSlice = createSlice({
  name: "work",
  initialState,
  
  reducers: {
    //////// Todo
    // deleteWork: (state, action) => {
    //   const newListWork = state.infoWork.listWork.filter(
    //     (work) => work.id !== action.payload
    //   );
    //   state.infoWork.listWork = newListWork;
    // },

    /////// Filter
    updateFilterText: (state, action) => {
      state.filterWork.searchByText = action.payload;
    },
    updateFilterStatus: (state, action) => {
      state.filterWork.searchBtStatus = action.payload;
    },
    updateFilterPriority: (state, action) => {
      state.filterWork.searchByPriority = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Get work vao store
      .addCase(getListWork.pending, (state) => {
        state.infoWork.statusWork = "loading";
      })
      .addCase(getListWork.fulfilled, (state, action) => {
        state.infoWork.listWork = action.payload;
        state.infoWork.statusWork = "idle";
      })
      // chua biet xu ly khi rejected
      .addCase(getListWork.rejected, (state) => {
        console.log(state)
        // state.infoWork.listWork = [];
        // state.infoWork.statusWork = "idle";
      })

      // Add new work
      .addCase(addNewWork.pending, (state) => {
        state.infoWork.statusWork = "loading";
      })
      .addCase(addNewWork.fulfilled, (state, action) => {
        state.infoWork.listWork.push(action.payload);
        state.infoWork.statusWork = "idle";
      })

      // Update status work
      .addCase(updateStatusWork.fulfilled, (state, action) => {
        const currentWork = state.infoWork.listWork.find(
          (work) => work.id === action.payload.id
        );
        currentWork.status = action.payload.status;
      })

      // Update work
      .addCase(updateWork.pending, (state) => {
        state.infoWork.statusWork = "loading";
      })
      .addCase(updateWork.fulfilled, (state, action) => {
        const currentWork = state.infoWork.listWork.find(
          (work) => work.id === action.payload.id
        );
        currentWork.namework = action.payload.namework;
        currentWork.priority = action.payload.priority;
        currentWork.status = action.payload.status;
        state.infoWork.statusWork = "idle";
      })

      // Delete work (get worklist after delete work)
      .addCase(deleteWork.pending, (state) => {
        state.infoWork.statusWork = "loading";
      })
      .addCase(deleteWork.fulfilled, (state, action) => {
        state.infoWork.listWork = action.payload;
        state.infoWork.statusWork = "idle";
      });
  },
});

export const { updateFilterText, updateFilterStatus, updateFilterPriority } =
  workSlice.actions;

export default workSlice.reducer;
