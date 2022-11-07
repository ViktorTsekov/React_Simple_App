import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Users from './users'
import UserPosts from './posts'
import Tasks from './tasks'
import Header from './header'

const App: React.FC = () => {
  return (
    <Router>
      <div className='content'>
        <Header />
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/posts' element={<UserPosts />} />
          <Route path='/tasks' element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
