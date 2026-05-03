import { useAuth, MOCK_USERS } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const roleLabels = {
  org_admin: 'Org Admin',
  dept_head: 'Dept Head',
  member: 'Member',
}

const UserSwitcher = () => {
  const { user, switchUser } = useAuth()
  const navigate = useNavigate()

  const handleSwitch = async (e) => {
    const email = e.target.value
    if (!email || email === user?.email) return
    const result = await switchUser(email)
    if (result.success) {
      navigate('/')
      toast.success(`Switched to ${email.split('@')[0]}`)
    } else {
      toast.error(result.message)
    }
  }

  return (
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
  )
}

export default UserSwitcher