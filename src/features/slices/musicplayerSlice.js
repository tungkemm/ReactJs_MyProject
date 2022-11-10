import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoMusic: {
    statusMusic: "idle",
    listMusic: [],
  },
  infoCurrentMusic: {
    currentIndex: 0,
    currentMusic: {},
    statusRandom: false,
  },
  filterMusic: {
    searchbyText: "",
  },
};

export const musicplayerSlice = createSlice({
  name: "musicplayer",
  initialState,

  reducers: {
    ////// list music
    getListMusicAndCurrentMusic: (state, action) => {
      state.infoMusic.listMusic = action.payload;
      state.infoCurrentMusic.currentMusic =
        state.infoMusic.listMusic[state.infoCurrentMusic.currentIndex];
    },
    deleteMusic: (state, action) => {
      const newListMusic = state.infoMusic.listMusic.filter(
        (itemMusic) => itemMusic.id !== action.payload
      );
      state.infoMusic.listMusic = newListMusic;
    },
    updateFilterText: (state, action) => {
      state.filterMusic.searchbyText = action.payload;
    },

    /////// current music and current index music
    // khi next/prev/bai hat ket thuc/chon bai tu list: luon luon phai update lai current music va current index
    updateCurrentMusicWhenClickBtnNext: (state) => {
      if (state.infoCurrentMusic.statusRandom) {
        // update lai currentIndex khi bat random
        let newIndex;
        do {
          newIndex = Math.floor(
            Math.random() * state.infoMusic.listMusic.length
          );
        } while (newIndex === state.infoCurrentMusic.currentIndex);
        state.infoCurrentMusic.currentIndex = newIndex;
      } else {
        // update lai currentIndex khi ko bat random
        state.infoCurrentMusic.currentIndex <
        state.infoMusic.listMusic.length - 1
          ? state.infoCurrentMusic.currentIndex++
          : (state.infoCurrentMusic.currentIndex = 0);
      }

      // update lai current music
      state.infoCurrentMusic.currentMusic =
        state.infoMusic.listMusic[state.infoCurrentMusic.currentIndex];
    },
    updateCurrentMusicWhenClickBtnPrev: (state) => {
      if (state.infoCurrentMusic.statusRandom) {
        // update lai currentIndex khi bat random
        let newIndex;
        do {
          newIndex = Math.floor(
            Math.random() * state.infoMusic.listMusic.length
          );
        } while (newIndex === state.infoCurrentMusic.currentIndex);
        state.infoCurrentMusic.currentIndex = newIndex;
      } else {
        // update lai currentIndex khi ko bat random
        state.infoCurrentMusic.currentIndex > 0
          ? state.infoCurrentMusic.currentIndex--
          : (state.infoCurrentMusic.currentIndex =
              state.infoMusic.listMusic.length - 1);
      }

      // update lai current music
      state.infoCurrentMusic.currentMusic =
        state.infoMusic.listMusic[state.infoCurrentMusic.currentIndex];
    },
    updateStatusRandom: (state) => {
      state.infoCurrentMusic.statusRandom =
        !state.infoCurrentMusic.statusRandom;
    },
    updateInfoCurrentMusicWhenClickMusicItem: (state, action) => {
      // update lai current music
      state.infoCurrentMusic.currentMusic = action.payload;

      //update lai currentIndex
      const updateCurrentIndex = state.infoMusic.listMusic.findIndex(
        (itemMusic) => itemMusic.id === action.payload.id
      );
      state.infoCurrentMusic.currentIndex = updateCurrentIndex;
    },
  },
});

export const {
  getListMusicAndCurrentMusic,
  updateCurrentMusicWhenClickBtnNext,
  updateCurrentMusicWhenClickBtnPrev,
  updateStatusRandom,
  updateInfoCurrentMusicWhenClickMusicItem,
  deleteMusic,
  updateFilterText,
} = musicplayerSlice.actions;

export default musicplayerSlice.reducer;
