import React, {useEffect} from 'react'
import clsx from "clsx";
import styles from "./Project2.module.css";
import { useDispatch, useSelector } from 'react-redux';
import MusicPlayerManage from '../../components/Project2/MusicPlayerManage/MusicPlayerManage';
import { musicplayerSelector } from '../../features/selector';
import { getCurrentMusic } from '../../features/slices/musicplayerSlice';

const Project2 = () => {
  const dispatch = useDispatch()
  const infoMusicplayer = useSelector(musicplayerSelector);

  // khi component dc mount, dispatch de lay data bai hat dau tien trong dsach bai hat
  useEffect(() => {
    if(infoMusicplayer.listMusic.length > 0) {
      dispatch(getCurrentMusic())
    }
  }, [])

  return (
    <div className={clsx(styles.project2Page)}>
      <div>Kem kem</div>
      <MusicPlayerManage />
    </div>
  )
}

export default Project2