import { createSelector } from "@reduxjs/toolkit";

// //// account
export const accountSelector = (state) => state.account.infoAccount;
export const currentAccountSelector = (state) =>
  state.account.currentAccountLogin;

// //// work
export const workSelector = (state) => state.work.infoWork;
export const searchTextSelector = (state) => state.work.filterWork.searchByText;
export const searchStatusSelector = (state) =>
  state.work.filterWork.searchBtStatus;
export const searchPrioritySelector = (state) =>
  state.work.filterWork.searchByPriority;

// select ra list work khi da qua tim kiem
export const worksRemainingSelector = createSelector(
  workSelector,
  searchStatusSelector,
  searchTextSelector,
  searchPrioritySelector,
  (infoWork, status, searchText, priority) => {
    return {
      ...infoWork,
      listWork: infoWork.listWork.filter((item) => {
        if (status === "All") {
          return priority.length
            ? item.namework.includes(searchText) &&
                priority.includes(item.priority)
            : item.namework.includes(searchText);
        }

        return (
          item.namework.includes(searchText) &&
          (status === "Completed" ? item.status : !item.status) &&
          (priority.length ? priority.includes(item.priority) : true)
        );
      }),
    };
  }
);

// //// musicplayer
export const musicplayerSelector = (state) => state.musicplayer.infoMusic;
export const searchTextMusicSelector = (state) =>
  state.musicplayer.filterMusic.searchbyText;
export const currentMusicSelector = (state) =>
  state.musicplayer.infoCurrentMusic.currentMusic;
export const statusRandomSelector = (state) =>
  state.musicplayer.infoCurrentMusic.statusRandom;
export const currentIndexSelector = (state) =>
  state.musicplayer.infoCurrentMusic.currentIndex;

// select ra list music khi da qua tim kiem
export const musicsRemainingSelector = createSelector(
  musicplayerSelector,
  searchTextMusicSelector,
  (infoMusic, searchText) => {
    return {
      ...infoMusic,
      listMusic: infoMusic.listMusic.filter((item) => {
        return (
          item.namesong.includes(searchText) || item.singer.includes(searchText)
        );
      }),
    };
  }
);
