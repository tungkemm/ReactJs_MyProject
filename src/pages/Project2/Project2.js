import React, { useEffect } from "react";
import clsx from "clsx";
import styles from "./Project2.module.css";
import { useDispatch } from "react-redux";
import MusicPlayerManage from "../../components/Project2/MusicPlayerManage/MusicPlayerManage";
import { getListMusicAndCurrentMusic } from "../../features/slices/musicplayerSlice";
import { listMusic } from "../../assets/data/dataListMusic";

const Project2 = () => {
  const dispatch = useDispatch();

  // khi component dc mount, dispatch de lay list music tu assets
  useEffect(() => {
    dispatch(getListMusicAndCurrentMusic(listMusic));
  }, []);

  return (
    <div className={clsx(styles.project2Page)}>
      <div>Kem kem</div>
      <MusicPlayerManage />
    </div>
  );
};

export default Project2;
