import { useState } from 'react'
import { useAuth, MOCK_USERS } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const roleLabels = {
  org_admin: 'Org Admin',
  dept_head: 'Dept Head',
  member: 'Member',
}

const roleColors = {
  org_admin: '#e74c3c',
  dept_head: '#2980b9',
  member: '#27ae60',
}

const Login = () => {
  const [selected, setSelected] = useState(null)
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!selected) {
      toast.error('Please select a user to login')
      return
    }
    const result = await login(selected.email)
    if (result.success) {
      toast.success(`Welcome, ${selected.name}!`)
      navigate('/')
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(https://i.pinimg.com/474x/c8/f7/bd/c8f7bdd3e52c315dafb9641f92672498.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
      }} />
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        width: '500px',
        position: 'relative',
        zIndex: 1,
      }}>
        <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '8px' }}>
          Task Manager
        </h1>
        <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '32px' }}>
          Select a user to login as
        </p>

        <div style={{ display: 'grid', gap: '12px' }}>
          {MOCK_USERS.map((u) => (
            <div
              key={u.email}
              onClick={() => setSelected(u)}
              style={{
                padding: '16px',
                border: `2px solid ${selected?.email === u.email
                  ? roleColors[u.role] : '#e0e0e0'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: selected?.email === u.email ? '#f8f9fa' : 'white',
                transition: 'all 0.2s',
              }}
            >
              <div>
                <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>{u.name}</div>
                <div style={{ fontSize: '13px', color: '#7f8c8d' }}>
                  {u.department} department
                </div>
              </div>
              <span style={{
                backgroundColor: roleColors[u.role],
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
              }}>
                {roleLabels[u.role]}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleLogin}
          disabled={loading || !selected}
          style={{
            width: '100%',
            padding: '14px',
            marginTop: '24px',
            backgroundColor: selected ? '#2c3e50' : '#bdc3c7',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: selected ? 'pointer' : 'not-allowed',
          }}
        >
          {loading ? 'Logging in...' : `Login as ${selected?.name || '...'}`}
        </button>
      </div>
    </div>
  )
}

export default Login