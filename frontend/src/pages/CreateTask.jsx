import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

const CreateTask = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    status: 'todo',
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get('/users')
        // Only show members from same department
        const members = data.filter(
          u => u.department === user.department && u.role === 'member'
        )
        setUsers(members)
      } catch (error) {
        toast.error('Failed to fetch users')
      }
    }
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.assignedTo) {
      toast.error('Title and assigned user are required')
      return
    }
    setLoading(true)
    try {
      await API.post('/tasks', form)
      toast.success('Task created successfully!')
      navigate('/tasks')
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('❌ Access Denied: ' + error.response.data.message)
      } else {
        toast.error(error.response?.data?.message || 'Failed to create task')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '24px' }}>Create New Task</h1>

      <div style={{
        backgroundColor: 'white', padding: '32px',
        borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px',
              fontWeight: 'bold', color: '#2c3e50' }}>
              Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter task title"
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '6px',
                border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px',
              fontWeight: 'bold', color: '#2c3e50' }}>
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Enter task description"
              rows={4}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '6px',
                border: '1px solid #ddd', fontSize: '14px',
                resize: 'vertical', boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px',
              fontWeight: 'bold', color: '#2c3e50' }}>
              Assign To *
            </label>
            <select
              value={form.assignedTo}
              onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '6px',
                border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box',
              }}
            >
              <option value="">Select a member</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', marginBottom: '6px',
              fontWeight: 'bold', color: '#2c3e50' }}>
              Initial Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '6px',
                border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box',
              }}
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1, padding: '12px', backgroundColor: '#27ae60',
                color: 'white', border: 'none', borderRadius: '6px',
                fontSize: '15px', fontWeight: 'bold', cursor: 'pointer',
              }}
            >
              {loading ? 'Creating...' : 'Create Task'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              style={{
                padding: '12px 20px', backgroundColor: '#95a5a6',
                color: 'white', border: 'none', borderRadius: '6px',
                fontSize: '15px', cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTask