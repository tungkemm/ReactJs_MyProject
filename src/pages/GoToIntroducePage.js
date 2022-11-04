import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const GoToIntroducePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/login')
  }, [])

  return (
    <div>Loading ...</div>
  )
}

export default GoToIntroducePage