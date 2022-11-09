import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoMusic: {
    statusMusic: "idle",
    listMusic: [
      {
        id: 14234,
        namesong: "If",
        singer: "Lam Bao Ngoc",
        pathsong: require("../../assets/songMusic/song1.mp3"),
        image: require("../../assets/imgMusic/song1.jpg"),
      },
      {
        id: 423513,
        namesong: "Em cua ngay hom qua",
        singer: "Son Tung-MTP",
        pathsong: require("../../assets/songMusic/song2.mp3"),
        image: require("../../assets/imgMusic/song2.jpg"),
      },
      {
        id: 3142,
        namesong: "Ban tinh ca dau tien",
        singer: "Anh Tu, Lyly",
        pathsong: require("../../assets/songMusic/song3.mp3"),
        image: require("../../assets/imgMusic/song3.jpg"),
      },
      {
        id: 4434,
        namesong: "Loop",
        singer: "Coldzy, To$ka, VCC Left Hand",
        image: require("../../assets/imgMusic/song4.jpg"),
        pathsong: require("../../assets/songMusic/song4.mp3"),
      },
      {
        id: 513123,
        namesong: "Crying Over You",
        singer: "JustaTee, Binz",
        image: require("../../assets/imgMusic/song5.jpg"),
        pathsong: require("../../assets/songMusic/song5.mp3"),
      },
    ],
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
    /////// current music and current index music
    // khi next/prev/bai hat ket thuc/chon bai tu list: luon luon phai update lai current music va current index
    getCurrentMusic: (state) => {
      state.infoCurrentMusic.currentMusic =
        state.infoMusic.listMusic[state.infoCurrentMusic.currentIndex];
    },
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

    ////// list music
    deleteMusic: (state, action) => {
      const newListMusic = state.infoMusic.listMusic.filter(
        (itemMusic) => itemMusic.id !== action.payload
      );
      state.infoMusic.listMusic = newListMusic;
    },
    updateFilterText: (state, action) => {
      state.filterMusic.searchbyText = action.payload;
    },
  },
});

export const {
  getCurrentMusic,
  updateCurrentMusicWhenClickBtnNext,
  updateCurrentMusicWhenClickBtnPrev,
  updateStatusRandom,
  updateInfoCurrentMusicWhenClickMusicItem,
  deleteMusic,
  updateFilterText,
} = musicplayerSlice.actions;

export default musicplayerSlice.reducer;
