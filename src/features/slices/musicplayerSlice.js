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
        singer: "Son Tung - MTP",
        pathsong: require("../../assets/songMusic/song2.mp3"),
        image: require("../../assets/imgMusic/song2.jpg"),
      },
      {
        id: 3142,
        namesong: "Ban tinh ca dau tien",
        singer: "Anh Tu",
        pathsong: require("../../assets/songMusic/song3.mp3"),
        image: require("../../assets/imgMusic/song3.jpg"),
      },
      {
        id: 4434,
        namesong: "Mot con vit",
        singer: "Tung Kem",
        image: require("../../assets/imgMusic/song4.jpg"),
        pathsong: require("../../assets/songMusic/song4.mp3"),
      },
      {
        id: 513123,
        namesong: "Ha ha",
        singer: "Tung Kem",
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
};

export const musicplayerSlice = createSlice({
  name: "musicplayer",
  initialState,

  reducers: {
    // current music
    getCurrentMusic: (state) => {
      state.infoCurrentMusic.currentMusic =
        state.infoMusic.listMusic[state.infoCurrentMusic.currentIndex];
    },
    updateCurrentMusicWhenClickBtnNext: (state) => {
      if (state.infoCurrentMusic.statusRandom) {
        let newIndex;
        do {
          newIndex = Math.floor(
            Math.random() * state.infoMusic.listMusic.length
          );
        } while (newIndex === state.infoCurrentMusic.currentIndex);
        state.infoCurrentMusic.currentIndex = newIndex;
      } else {
        state.infoCurrentMusic.currentIndex <
        state.infoMusic.listMusic.length - 1
          ? state.infoCurrentMusic.currentIndex++
          : (state.infoCurrentMusic.currentIndex = 0);
      }

      state.infoCurrentMusic.currentMusic =
        state.infoMusic.listMusic[state.infoCurrentMusic.currentIndex];
    },
    updateCurrentMusicWhenClickBtnPrev: (state) => {
      if (state.infoCurrentMusic.statusRandom) {
        let newIndex;
        do {
          newIndex = Math.floor(
            Math.random() * state.infoMusic.listMusic.length
          );
        } while (newIndex === state.infoCurrentMusic.currentIndex);
        state.infoCurrentMusic.currentIndex = newIndex;
      } else {
        state.infoCurrentMusic.currentIndex > 0
          ? state.infoCurrentMusic.currentIndex--
          : (state.infoCurrentMusic.currentIndex =
              state.infoMusic.listMusic.length - 1);
      }

      state.infoCurrentMusic.currentMusic =
        state.infoMusic.listMusic[state.infoCurrentMusic.currentIndex];
    },
    updateStatusRandom: (state) => {
      state.infoCurrentMusic.statusRandom =
        !state.infoCurrentMusic.statusRandom;
    },
    updateInfoCurrentMusicWhenClickMusicItem: (state, action) => {
      state.infoCurrentMusic.currentMusic = action.payload;
      state.infoCurrentMusic.currentIndex = action.payload.indexsong;
    },
  },
});

export const {
  getCurrentMusic,
  updateCurrentMusicWhenClickBtnNext,
  updateCurrentMusicWhenClickBtnPrev,
  updateStatusRandom,
  updateInfoCurrentMusicWhenClickMusicItem,
} = musicplayerSlice.actions;

export default musicplayerSlice.reducer;
