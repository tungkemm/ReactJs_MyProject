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
      statusWork: infoWork.statusWork,
      listWork: infoWork.listWork.filter((work) => {
        if (status === "All") {
          return priority.length
            ? work.namework.includes(searchText) &&
                priority.includes(work.priority)
            : work.namework.includes(searchText);
        }

        return (
          work.namework.includes(searchText) &&
          (status === "Completed" ? work.status : !work.status) &&
          (priority.length ? priority.includes(work.priority) : true)
        );
      }),
    };
  }
);

// //// musicplayer
export const musicplayerSelector = (state) => state.musicplayer.infoMusic;
export const currentMusicSelector = (state) => state.musicplayer.infoCurrentMusic.currentMusic;
export const statusRandomSelector = (state) => state.musicplayer.infoCurrentMusic.statusRandom;
export const currentIndexSelector = (state) => state.musicplayer.infoCurrentMusic.currentIndex;


