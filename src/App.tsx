import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Users from './users'
import UserPosts from './posts'

const App: React.FC = () => {
  return (
    <Router>
      <div className='content'>
        <div style={{padding: '15px', width: '100%', height: '30px', borderBottom: 'solid 1px black'}}>
          <a href='/' style={{marginLeft: '10px', marginRight: '20px'}}>Home</a>
          <a href='/tasks'>Tasks</a>
        </div>
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/posts' element={<UserPosts />} />
          <Route path='/tasks' element={<h3>Tasks</h3>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
