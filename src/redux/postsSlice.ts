import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PostsState {
  posts: any
}

const initialState: PostsState = {
  posts: [],
}

export const usersSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<any>) => {
      const ids = state.posts.map((post: any) => post.userId)

      if (!ids.includes(action.payload.userId)) {
        const newPosts = [...state.posts, {userId: action.payload.userId, userPosts: action.payload.userPosts}]

        state.posts = newPosts
      }
    },
    deletePostById: (state, action: PayloadAction<any>) => {
      let userPosts: any[] = []

      state.posts.map((post: any) => {
        if(post.userId === action.payload.userId) {
          post.userPosts.map((element: any) => {
            userPosts = [...userPosts, {...element}]
          })
        }
      })

      const newPosts = userPosts.filter((post: any) => {
        if(post.id !== action.payload.postId) {
          return post
        }
      })

      state.posts.map((post: any) => {
        if(post.userId === action.payload.userId) {
          post.userPosts = newPosts
        }
      })
    },
    editPostById: (state, action: PayloadAction<any>) => {
      let userPosts: any[] = []
      let newPosts: any[] = []

      state.posts.map((post: any) => {
        if(post.userId === action.payload.userId) {
          post.userPosts.map((element: any) => {
            userPosts = [...userPosts, {...element}]
          })
        }
      })

      userPosts.map((post: any) => {
        if(post.id === action.payload.postId) {
          newPosts = [...newPosts, {...action.payload.newPost}]
        } else {
          newPosts = [...newPosts, {...post}]
        }
      })

      state.posts.map((post: any) => {
        if(post.userId === action.payload.userId) {
          post.userPosts = newPosts
        }
      })
    }
  },
})

export const { setPosts, deletePostById, editPostById } = usersSlice.actions

export default usersSlice.reducer
