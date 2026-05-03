import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Sidebar = () => {
  const { user } = useAuth()

  const linkStyle = ({ isActive }) => ({
    display: 'block',
    padding: '12px 20px',
    color: isActive ? '#fff' : '#bdc3c7',
    backgroundColor: isActive ? '#34495e' : 'transparent',
    textDecoration: 'none',
    borderRadius: '4px',
    marginBottom: '4px',
    fontSize: '14px',
    fontWeight: isActive ? 'bold' : 'normal',
  })

  return (
    <div style={{
      width: '220px',
      backgroundColor: '#2c3e50',
      padding: '20px 12px',
      minHeight: '100vh',
    }}>
      <h3 style={{ color: '#ecf0f1', marginBottom: '24px', fontSize: '14px',
        textTransform: 'uppercase', letterSpacing: '1px', padding: '0 8px' }}>
        Navigation
      </h3>

      <nav>
        <NavLink to="/" end style={linkStyle}>
          🏠 Dashboard
        </NavLink>

        <NavLink to="/tasks" style={linkStyle}>
          📋 Tasks
        </NavLink>

        {/* Only Dept Head can create tasks */}
        {user?.role === 'dept_head' && (
          <NavLink to="/tasks/create" style={linkStyle}>
            ➕ Create Task
          </NavLink>
        )}

        {/* Only Dept Head and Org Admin can see users */}
        {(user?.role === 'dept_head' || user?.role === 'org_admin') && (
          <NavLink to="/users" style={linkStyle}>
            👥 Users
          </NavLink>
        )}
      </nav>

      {/* Role info box */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        width: '196px',
        backgroundColor: '#34495e',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '12px',
        color: '#bdc3c7',
      }}>
        <div><strong style={{ color: '#fff' }}>Dept:</strong> {user?.department}</div>
        <div><strong style={{ color: '#fff' }}>Role:</strong> {user?.role}</div>
      </div>
    </div>
  )
}

export default Sidebar