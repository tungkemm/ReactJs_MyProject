import React, {useEffect} from 'react'
import clsx from "clsx";
import styles from "./Project1.module.css";
import WorkManage from '../../components/Project1/WorkManage/WorkManage'
import { useDispatch } from 'react-redux';
import { getListWork } from '../../features/slices/workSlice';

const Project1 = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListWork())
  }, [])

  return (
    <div className={clsx(styles.project1Page)}>
      <div>Nguyen Danh Tung</div>
      <WorkManage />
    </div>
  )
}

export default Project1