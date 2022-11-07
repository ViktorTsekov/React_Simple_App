import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import postsReducer from './postsSlice'
import tasksReducer from './tasksSlice'

export const store = configureStore({
  reducer: {
    usersReducer: usersReducer,
    postsReducer: postsReducer,
    tasksReducer: tasksReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
