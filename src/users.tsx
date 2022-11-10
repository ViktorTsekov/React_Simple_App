import React, {useEffect, useState} from 'react'
import User from './user'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from './redux/store'
import { setUsers } from './redux/usersSlice'

const Users: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const users = useSelector((state: RootState) => state.usersReducer.users)
  const dispatch = useDispatch()

  const printUsers = () => {
    if(users.length === 0) {
      return <div style={{margin: '24px'}}>No users found</div>
    }

    return users.map((user: any, index: React.Key) => {
      return <User key={index} data={user}/>
    })
  }

  useEffect(() => {
    if(users.length === 0) {
      setIsLoading(true)

      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => dispatch(setUsers(json)))
        .catch((err) => console.error('Unexpected error has occurred: ', err))
        .finally(() => setIsLoading(false))
    }
  }, [])

  return (
    <>
      {
        isLoading && <div style={{margin: "24px"}}>Loading...</div>
      }
      {
        !isLoading && printUsers()
      }
    </>
  )
}

export default Users
