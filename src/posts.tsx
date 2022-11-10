import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom"
import { setPosts } from './redux/postsSlice'
import { RootState } from './redux/store'
import User from './user'
import Post from './post'

const UserPosts: React.FC = () => {
  const [postsOfCurrentUser, setPostsOfCurrentUser] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const users = useSelector((state: RootState) => state.usersReducer.users)
  const posts = useSelector((state: RootState) => state.postsReducer.posts)

  const user = users.filter((user: any) => {
    if(user.id === location.state.userId) {
      return user
    }
  })[0]

  const printUserPosts = () => {
    if(postsOfCurrentUser.length === 0) {
      return <div style={{margin: "24px"}}>No posts to display</div>
    }

    return <>
      <p style={{marginLeft: '24px'}}>Posts: </p>
      {
        postsOfCurrentUser.map((post: any, index: number) => {
          return <Post key={index} index={index} data={post}/>
        })
      }
    </>
  }

  useEffect(() => {
    setIsLoading(true)

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${location.state.userId}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(setPosts({
          userId: location.state.userId,
          userPosts: json,
        }))
      })
      .catch((err) => console.error('Unexpected error has occurred: ', err))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    posts.forEach((element: any) => {
      if (element.userId === location.state.userId) {
        setPostsOfCurrentUser(element.userPosts)
      }
    })
  }, [posts])

  return (
    <div>
      {
        isLoading && <div style={{margin: "24px"}}>Loading...</div>
      }
      {
        !isLoading && (
          <>
            <User data={user}/>
            {
              printUserPosts()
            }
          </> 
        )
      }
    </div>
  )
}

export default UserPosts
