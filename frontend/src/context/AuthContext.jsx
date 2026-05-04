import { createContext, useContext, useState, useEffect } from 'react'
import API from '../api/axios'

const AuthContext = createContext()
export const MOCK_USERS = [
  { name: 'Alice', email: 'alice@test.com', role: 'org_admin', department: 'engineering' },
  { name: 'Bob', email: 'bob@test.com', role: 'dept_head', department: 'engineering' },
  { name: 'Charlie', email: 'charlie@test.com', role: 'member', department: 'engineering' },
  { name: 'Diana', email: 'diana@test.com', role: 'dept_head', department: 'design' },
  { name: 'Eve', email: 'eve@test.com', role: 'member', department: 'design' },
  { name: 'Frank', email: 'frank@test.com', role: 'member', department: 'engineering' },
]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [loading, setLoading] = useState(false)

  const login = async (email) => {
    setLoading(true)
    try {
      const { data } = await API.post('/auth/login', {
        email,
        password: '123456',
      })
      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const switchUser = async (email) => {
    logout()
    return await login(email)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, switchUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)