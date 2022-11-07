import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { setTasks, toggleTaskById } from './redux/tasksSlice'
import TasksTable from './tasksTable'

const Tasks: React.FC = () => {
  const [titleFilter, setTitleFilter] = useState('')
  const [ownerFilter, setOwnerFilter] = useState('')
  const [isCompletedFilter, setIsCompletedFilter] = useState('')
  const [filteredTasks, setFilteredTasks] = useState([])

  const users = useSelector((state: RootState) => state.usersReducer.users)
  const tasks = useSelector((state: RootState) => state.tasksReducer.tasks)
  
  const dispatch = useDispatch()

  const getUserNameById = (userId: any) => {
    return users.filter((user: any) => {
      if(user.id === userId) {
        return user
      }
    })[0].name
  }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(json => {
        if(tasks.length === 0) {
          dispatch(setTasks({tasks: json}))
          setFilteredTasks(json)
        } else {
          setFilteredTasks(tasks)
        }
      })
  }, [])

  useEffect(() => {
    let tasksFilteredByOwner: any[] = []

    // Filter by owner
    if(ownerFilter.length === 0) {
      tasksFilteredByOwner = [...tasks]
    } else {
      tasks.filter((task: any) => {
        if(getUserNameById(task.userId) === ownerFilter) {
          tasksFilteredByOwner = [...tasksFilteredByOwner, {...task}]
        }
      })
   }

   let tasksFilteredByCompletedStatus: any[] = []

    // Filter by completed status
    if(isCompletedFilter.length === 0) {
      tasksFilteredByCompletedStatus = [...tasksFilteredByOwner]
    } else {  
      tasksFilteredByOwner.filter((task) => {
        if(isCompletedFilter === "completed") {
          if(task.completed === true) {
            tasksFilteredByCompletedStatus = [...tasksFilteredByCompletedStatus, {...task}]
          }
        } else {
          if(task.completed === false) {
            tasksFilteredByCompletedStatus = [...tasksFilteredByCompletedStatus, {...task}]
          }
        }
      })
    }

    let tasksFilteredByTitle: any = []

    // Filter by title
    if(titleFilter.length === 0) {
      tasksFilteredByTitle=[...tasksFilteredByCompletedStatus]
    } else {
      tasksFilteredByCompletedStatus.filter((task) => {
        if(task.title === titleFilter) {
          tasksFilteredByTitle = [...tasksFilteredByTitle, {...task}]
        }
      })
    }

    setFilteredTasks(tasksFilteredByTitle)
  }, [tasks, titleFilter, ownerFilter, isCompletedFilter])

  return (
    <div>
      <div style={{marginLeft: '24px', marginTop: '10px'}}>
        <p>Filters: </p>
        <label>Task title: </label>
        <input type="text" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} />
        <br />
        <label>Task owner: </label>
        <input type="text" value={ownerFilter} onChange={(e) => setOwnerFilter(e.target.value)} />
        <br />
        <label>Completed status: </label>
        <select onChange={(e) => setIsCompletedFilter(e.target.value)}>
          <option value=""></option>
          <option value="completed">Completed</option>
          <option value="not completed">Not completed</option>
        </select>
      </div>
      <TasksTable data={filteredTasks} getUserNameById={getUserNameById}/>
    </div>
  )
}

export default Tasks
