import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const roleDescriptions = {
  org_admin: 'You can view all tasks across all departments and delete any task.',
  dept_head: 'You can view your department\'s tasks, create tasks, assign them, and manage users.',
  member: 'You can view tasks assigned to you and update their status.',
}

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div>
      <h1 style={{ color: '#2c3e50', marginBottom: '8px' }}>
        Welcome, {user?.name}! 👋
      </h1>
      <p style={{ color: '#7f8c8d', marginBottom: '32px' }}>
        {roleDescriptions[user?.role]}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{
          backgroundColor: 'white', padding: '24px', borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #2980b9'
        }}>
          <h3 style={{ margin: '0 0 8px', color: '#2c3e50' }}>Your Role</h3>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#2980b9' }}>
            {user?.role?.replace('_', ' ').toUpperCase()}
          </p>
        </div>

        <div style={{
          backgroundColor: 'white', padding: '24px', borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #27ae60'
        }}>
          <h3 style={{ margin: '0 0 8px', color: '#2c3e50' }}>Department</h3>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#27ae60' }}>
            {user?.department?.toUpperCase()}
          </p>
        </div>

        <div style={{
          backgroundColor: 'white', padding: '24px', borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #e74c3c'
        }}>
          <h3 style={{ margin: '0 0 8px', color: '#2c3e50' }}>Email</h3>
          <p style={{ margin: 0, fontSize: '16px', color: '#e74c3c' }}>
            {user?.email}
          </p>
        </div>
      </div>

      <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
        <Link to="/tasks" style={{
          backgroundColor: '#2980b9', color: 'white', padding: '12px 24px',
          borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold',
        }}>
          View My Tasks →
        </Link>
        {user?.role === 'dept_head' && (
          <Link to="/tasks/create" style={{
            backgroundColor: '#27ae60', color: 'white', padding: '12px 24px',
            borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold',
          }}>
            Create Task →
          </Link>
        )}
        {(user?.role === 'dept_head' || user?.role === 'org_admin') && (
          <Link to="/users" style={{
            backgroundColor: '#8e44ad', color: 'white', padding: '12px 24px',
            borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold',
          }}>
            Manage Users →
          </Link>
        )}
      </div>
    </div>
  )
}

export default Dashboard