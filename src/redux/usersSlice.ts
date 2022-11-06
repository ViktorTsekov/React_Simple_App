import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UsersState {
  users: any
}

const initialState: UsersState = {
  users: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload
    },
    updateUserById: (state, action: PayloadAction<any>) => {
      const id = action.payload.updatedUser.id

      const newUsers = action.payload.currentUsers.map((user: any) => {
        if(user.id === id) {
          return action.payload.updatedUser
        } else {
          return user
        }
      })

      state.users = newUsers
    }
  },
})

export const { setUsers, updateUserById } = usersSlice.actions

export default usersSlice.reducer
