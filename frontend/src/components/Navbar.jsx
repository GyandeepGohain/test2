import { useAuth, MOCK_USERS } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

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
  const { user, switchUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleSwitch = async (e) => {
    const email = e.target.value
    if (!email) return
    const result = await switchUser(email)
    if (result.success) {
      navigate('/')
      toast.success(`Switched to ${email.split('@')[0]}`)
    } else {
      toast.error(result.message)
    }
  }

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
        {/* User Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '13px', color: '#bdc3c7' }}>
            Switch User:
          </label>
          <select
            onChange={handleSwitch}
            value={user?.email || ''}
            style={{
              padding: '6px 10px',
              borderRadius: '4px',
              border: 'none',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            {MOCK_USERS.map((u) => (
              <option key={u.email} value={u.email}>
                {u.name} ({roleLabels[u.role]} - {u.department})
              </option>
            ))}
          </select>
        </div>

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