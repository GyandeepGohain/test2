import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import API from '../api/axios'

const statusColors = {
  todo: '#f39c12',
  in_progress: '#2980b9',
  completed: '#27ae60',
}

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
        toast.error('Access denied: ' + error.response.data.message)
      } else {
        toast.error('Failed to fetch tasks')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [user])

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

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading tasks...</div>

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
            <div key={task._id} style={{
              backgroundColor: 'white', padding: '20px', borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderLeft: `4px solid ${statusColors[task.status]}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px', color: '#2c3e50' }}>{task.title}</h3>
                  <p style={{ margin: '0 0 12px', color: '#7f8c8d', fontSize: '14px' }}>
                    {task.description}
                  </p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#95a5a6' }}>
                    <span>📁 {task.department}</span>
                    <span>👤 {task.assignedTo?.name}</span>
                    <span>✉️ {task.assignedTo?.email}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                  {/* Status badge */}
                  <span style={{
                    backgroundColor: statusColors[task.status],
                    color: 'white', padding: '4px 12px',
                    borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                    {task.status?.replace('_', ' ')}
                  </span>

                  {/* Status update - member can update their own tasks, dept_head and org_admin too */}
                  {(task.assignedTo?._id === user?._id ||
                    user?.role === 'dept_head' ||
                    user?.role === 'org_admin') && (
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusUpdate(task._id, e.target.value)}
                      style={{
                        padding: '6px 10px', borderRadius: '4px',
                        border: '1px solid #ddd', fontSize: '13px', cursor: 'pointer',
                      }}
                    >
                      <option value="todo">Todo</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  )}

                  {/* Delete button - org_admin only */}
                  {user?.role === 'org_admin' && (
                    <button
                      onClick={() => handleDelete(task._id)}
                      style={{
                        backgroundColor: '#e74c3c', color: 'white',
                        border: 'none', padding: '6px 14px',
                        borderRadius: '4px', cursor: 'pointer', fontSize: '13px',
                      }}
                    >
                      🗑 Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tasks