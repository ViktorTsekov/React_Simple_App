import React, {useState} from 'react'
import {editPostById} from './redux/postsSlice'
import { useDispatch } from 'react-redux'

interface props {
  data: any
  cancelEvent: any
}

const UserPosts: React.FC<props> = ({data, cancelEvent}) => {
  const [title, setTitle] = useState(data.title)
  const [content, setContent] = useState(data.body)

  const dispatch = useDispatch()

  const sendForm = () => {
    const newPost = {...data}

    newPost.title = title
    newPost.body = content

    dispatch(editPostById({
      userId: data.userId,
      postId: data.id,
      newPost: newPost,
    }))

    cancelEvent()
  }

  return (
    <div style={{marginLeft: '24px'}}>
      <form>
        <label>Title: </label>
        <input
          type="text"  
          onChange={e => {
            setTitle(e.target.value)
          }}
          value={title}
        />
        <br />
        <label>Post content: </label>
        <input
          type="text"  
          onChange={e => {
            setContent(e.target.value)
          }}
          value={content}
        />
      </form>
      <div style={{marginTop: '10px'}}>
        <button onClick={() => cancelEvent()}>Cancel</button>
        <button style={{marginLeft: '10px'}} onClick={() => sendForm()}>Save</button>
      </div>
    </div>
    
  )
}

export default UserPosts
