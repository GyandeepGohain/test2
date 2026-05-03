import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

const roleColors = {
  org_admin: '#e74c3c',
  dept_head: '#2980b9',
  member: '#27ae60',
}

const Users = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const { data } = await API.get('/users')
      setUsers(data)
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('❌ Access Denied: ' + error.response.data.message)
      } else {
        toast.error('Failed to fetch users')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [user])

  const handleRoleChange = async (userId, newRole) => {
    try {
      await API.patch(`/users/${userId}/role`, { role: newRole })
      toast.success('Role updated successfully!')
      fetchUsers()
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('❌ Access Denied: ' + error.response.data.message)
      } else {
        toast.error('Failed to update role')
      }
    }
  }

  const handleDeptChange = async (userId, newDept) => {
    try {
      await API.patch(`/users/${userId}/department`, { department: newDept })
      toast.success('Department updated successfully!')
      fetchUsers()
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('❌ Access Denied: ' + error.response.data.message)
      } else {
        toast.error('Failed to update department')
      }
    }
  }

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading users...</div>

  return (
    <div>
      <h1 style={{ color: '#2c3e50', marginBottom: '8px' }}>
        {user?.role === 'org_admin' ? 'All Users' : `${user?.department} Department Users`}
      </h1>
      <p style={{ color: '#7f8c8d', marginBottom: '24px' }}>
        {user?.role === 'dept_head'
          ? 'Manage roles and departments for users in your department.'
          : 'View all users across all departments.'}
      </p>

      <div style={{ backgroundColor: 'white', borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
              <th style={{ padding: '14px 20px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '14px 20px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '14px 20px', textAlign: 'left' }}>Role</th>
              <th style={{ padding: '14px 20px', textAlign: 'left' }}>Department</th>
              {user?.role === 'dept_head' && (
                <th style={{ padding: '14px 20px', textAlign: 'left' }}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id} style={{
                backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                borderBottom: '1px solid #ecf0f1',
              }}>
                <td style={{ padding: '14px 20px', fontWeight: 'bold', color: '#2c3e50' }}>
                  {u.name}
                  {u._id === user._id && (
                    <span style={{ marginLeft: '8px', fontSize: '11px',
                      backgroundColor: '#3498db', color: 'white',
                      padding: '2px 6px', borderRadius: '10px' }}>
                      You
                    </span>
                  )}
                </td>
                <td style={{ padding: '14px 20px', color: '#7f8c8d' }}>{u.email}</td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{
                    backgroundColor: roleColors[u.role],
                    color: 'white', padding: '4px 10px',
                    borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
                  }}>
                    {u.role?.replace('_', ' ')}
                  </span>
                </td>
                <td style={{ padding: '14px 20px', color: '#2c3e50' }}>{u.department}</td>

                {/* Dept Head can change roles and departments */}
                {user?.role === 'dept_head' && (
                  <td style={{ padding: '14px 20px' }}>
                    {u._id !== user._id ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          style={{ padding: '6px 10px', borderRadius: '4px',
                            border: '1px solid #ddd', fontSize: '13px' }}
                        >
                          <option value="member">Member</option>
                          <option value="dept_head">Dept Head</option>
                        </select>
                        <select
                          value={u.department}
                          onChange={(e) => handleDeptChange(u._id, e.target.value)}
                          style={{ padding: '6px 10px', borderRadius: '4px',
                            border: '1px solid #ddd', fontSize: '13px' }}
                        >
                          <option value="engineering">Engineering</option>
                          <option value="design">Design</option>
                        </select>
                      </div>
                    ) : (
                      <span style={{ color: '#bdc3c7', fontSize: '13px' }}>—</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users