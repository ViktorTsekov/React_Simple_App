import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()
  
  return (
    <div style={{padding: '15px', width: '100%', height: '30px', borderBottom: 'solid 1px black'}}>
      <a onClick={() => navigate('/')} style={{marginLeft: '10px', marginRight: '20px', cursor: 'pointer'}}>Home</a>
      <a onClick={() => navigate('/tasks')} style={{cursor: 'pointer'}}>Tasks</a>
    </div>
  )
}

export default Header
