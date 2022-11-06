import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import postsReducer from './postsSlice'

export const store = configureStore({
  reducer: {
    usersReducer: usersReducer,
    postsReducer: postsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
