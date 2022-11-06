import React, {useEffect} from 'react'
import User from './user'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from './redux/store'
import { setUsers } from './redux/usersSlice'

const Users: React.FC = () => {
  const users = useSelector((state: RootState) => state.usersReducer.users)
  const dispatch = useDispatch()

  useEffect(() => {
    if(users.length === 0) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => dispatch(setUsers(json)))
    }
  }, [])

  return (
    <>
      <p style={{marginLeft: '24px'}}>Users: </p>
      {
        users.map((user: any, index: React.Key) => {
          return <User key={index} data={user}/>
        })
      }
    </>
  )
}

export default Users
