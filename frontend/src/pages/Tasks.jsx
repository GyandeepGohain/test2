import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import API from '../api/axios'
import TaskCard from '../components/TaskCard'

const Tasks = () => {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks')
      setTasks(data)
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('❌ Access Denied: ' + error.response.data.message)
      } else {
        toast.error('Failed to fetch tasks')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTasks() }, [user])

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      await API.patch(`/tasks/${taskId}/status`, { status: newStatus })
      toast.success('Status updated!')
      fetchTasks()
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('❌ Access Denied: ' + error.response.data.message)
      } else {
        toast.error('Failed to update status')
      }
    }
  }

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    try {
      await API.delete(`/tasks/${taskId}`)
      toast.success('Task deleted!')
      fetchTasks()
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('❌ Access Denied: ' + error.response.data.message)
      } else {
        toast.error('Failed to delete task')
      }
    }
  }

  if (loading) return (
    <div style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
      Loading tasks...
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>
          {user?.role === 'org_admin' ? 'All Tasks' :
           user?.role === 'dept_head' ? `${user.department} Department Tasks` :
           'My Tasks'}
        </h1>
        {user?.role === 'dept_head' && (
          <Link to="/tasks/create" style={{
            backgroundColor: '#27ae60', color: 'white', padding: '10px 20px',
            borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold',
          }}>
            + Create Task
          </Link>
        )}
      </div>

      {tasks.length === 0 ? (
        <div style={{
          backgroundColor: 'white', padding: '40px', borderRadius: '10px',
          textAlign: 'center', color: '#7f8c8d',
        }}>
          No tasks found.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Tasks