import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import PostForm from './postForm'
import { deletePostById } from './redux/postsSlice'

interface props {
  data: any
  index: number
}

const UserPosts: React.FC<props> = ({data, index}) => {
  const [isEdited, setIsEdited] = useState(false)

  const dispatch = useDispatch()

  return (
    <div style={{marginBottom: '20px'}}>
      {
        !isEdited &&
          <div style={{marginLeft: '24px'}}>
            <p><b>{index + 1}. </b>{data.title}</p>
            <p>Content: {data.body}</p>
            <button onClick={() => setIsEdited(true)}>Edit</button>
            <button style={{marginLeft: '10px'}} onClick={() => {
              if(window.confirm('Are you sure you want to delete this post?')) {
                dispatch(deletePostById({
                  userId: data.userId,
                  postId: data.id,
                }))
              }
            }}>Delete</button>
          </div>
      }
      {
        isEdited &&
          <PostForm data={data} cancelEvent={() => setIsEdited(false)}/>
      }
    </div>
  )
}

export default UserPosts
