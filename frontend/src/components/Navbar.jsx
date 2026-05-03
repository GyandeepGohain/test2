import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import UserSwitcher from './UserSwitcher'

const roleColors = {
  org_admin: '#e74c3c',
  dept_head: '#2980b9',
  member: '#27ae60',
}

const roleLabels = {
  org_admin: 'Org Admin',
  dept_head: 'Dept Head',
  member: 'Member',
}

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <h2 style={{ margin: 0, fontSize: '18px' }}>Task Manager</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

        {/* User Switcher Component */}
        <UserSwitcher />

        {/* Current User Badge */}
        <div style={{
          backgroundColor: roleColors[user?.role],
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
        }}>
          {user?.name} | {roleLabels[user?.role]}
        </div>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '6px 14px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar