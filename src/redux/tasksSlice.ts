import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TasksState {
  tasks: any
}

const initialState: TasksState = {
  tasks: [],
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<any>) => {
      state.tasks = action.payload.tasks
    },
    toggleTaskById: (state, action: PayloadAction<any>) => {
      let newTasks: any = [] 
      
      state.tasks.map((task: any) => {
        if(task.id === action.payload.taskId) {
          let newTask = {...task}

          newTask.completed = !task.completed
          newTasks = [...newTasks, newTask]
        } else {
          newTasks = [...newTasks, {...task}]
        }
      })

      state.tasks = newTasks
    }
  },
})

export const { setTasks, toggleTaskById } = tasksSlice.actions

export default tasksSlice.reducer
