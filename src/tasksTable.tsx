import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {toggleTaskById} from './redux/tasksSlice'

interface props {
  data: any
  getUserNameById: any
}

const TasksTable: React.FC<props> = ({data, getUserNameById}) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [tablePages, setTablePages] = useState<any[]>([])

  const dispatch = useDispatch()

  const decreasePageNumber = () => {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const increasePageNumber = () => {
    if(currentPage !== tablePages.length && tablePages.length !== 0) {
      setCurrentPage(currentPage + 1)
    }
  }

  const printPageNumber = () => {
    return `${currentPage}/${tablePages.length === 0 ? 1 : tablePages.length}`
  }

  useEffect(() => {
    const chunkSize = 10
    let pages: any[] = []
    let index: number = 0

    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize)

      index++
      pages = [...pages, { pageNumber: index, content: [...chunk]}]
    }

    setTablePages(pages)

    if(currentPage > pages.length) {
      setCurrentPage(pages.length === 0 ? 1 : pages.length)
    }
  }, [data])

  return (
    <div>
      <table style={{margin: '20px', backgroundColor: 'black', width: '600px'}}>
        <tr style={{backgroundColor: 'grey'}}>
          <th style={{width: '200px'}}>Task</th>
          <th style={{width: '200px'}}>Owner</th>
          <th style={{width: '200px'}}>Is completed</th>
        </tr>
        {
          tablePages.map((page: any) => {
            if(page.pageNumber === currentPage) {
              return page.content.map((entry: any, index: number) => {
                return <tr key={index} style={{backgroundColor: 'lightgrey', textAlign: 'center'}}>
                  <td>{entry.title}</td>
                  <td>{getUserNameById(entry.userId)}</td>
                  <td><input type="checkbox" checked={entry.completed} onChange={() => dispatch(toggleTaskById({
                    taskId: entry.id,
                  }))} /></td>
                </tr>
              })
            }
          })
        }
      </table>
      <div style={{marginLeft: '20px'}}>
        Page: {printPageNumber()}
        <button style={{marginRight: '10px', marginLeft: '10px'}} onClick={() => decreasePageNumber()}>Prev</button>
        <button onClick={() => increasePageNumber()}>Next</button>
      </div>
      <br />
    </div>
  )
}

export default TasksTable
