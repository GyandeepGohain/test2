import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import API from '../api/axios'
import CustomPieChart from '../components/CustomPieChart'
import CustomBarChart from '../components/CustomBarChart'
import RecentTasks from '../components/RecentTasks'

const COLORS = ['#f39c12', '#2980b9', '#27ae60']

const roleDescriptions = {
  org_admin: 'You can view all tasks across all departments and delete any task.',
  dept_head: "You can view your department's tasks, create and delete tasks, and manage users.",
  member: 'You can view tasks assigned to you and update their status.',
}

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await API.get('/tasks/dashboard')
        setDashboardData(data)
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [user])

  if (loading) return (
    <div style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
      Loading dashboard...
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #2980b9, #6c3ebf)',
        borderRadius: '12px', padding: '28px 32px', color: 'white',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '16px',
      }}>
        <div>
          <h2 style={{ margin: '0 0 6px', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 'bold' }}>
            Welcome back, {user?.name}! 👋
          </h2>
          <p style={{ margin: '0 0 6px', opacity: 0.85, fontSize: '14px' }}>
            {moment().format('dddd, Do MMMM YYYY')}
          </p>
          <p style={{ margin: 0, opacity: 0.75, fontSize: '13px' }}>
            {roleDescriptions[user?.role]}
          </p>
        </div>
        {user?.role === 'dept_head' && (
          <button
            onClick={() => navigate('/tasks/create')}
            style={{
              backgroundColor: 'white', color: '#2980b9',
              border: 'none', padding: '10px 22px', borderRadius: '8px',
              fontWeight: 'bold', cursor: 'pointer', fontSize: '14px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)', whiteSpace: 'nowrap',
            }}
          >
            + Create New Task
          </button>
        )}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
      }}>
        {[
          { label: 'Total Tasks', value: dashboardData?.stats?.total || 0, color: '#2980b9' },
          { label: 'Todo', value: dashboardData?.stats?.todo || 0, color: '#f39c12' },
          { label: 'In Progress', value: dashboardData?.stats?.inProgress || 0, color: '#8e44ad' },
          { label: 'Completed', value: dashboardData?.stats?.completed || 0, color: '#27ae60' },
        ].map((stat) => (
          <div key={stat.label} style={{
            backgroundColor: 'white', padding: '20px 24px',
            borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderLeft: `4px solid ${stat.color}`,
          }}>
            <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#7f8c8d', fontWeight: '500' }}>
              {stat.label}
            </p>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#2c3e50' }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
      }}>
        <div style={{
          backgroundColor: 'white', padding: '24px',
          borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>
          <h3 style={{ margin: '0 0 16px', color: '#2c3e50', fontSize: '15px', fontWeight: '600' }}>
            📊 Task Status Distribution
          </h3>
          <CustomPieChart
            data={dashboardData?.pieChartData || []}
            colors={COLORS}
          />
        </div>

        <div style={{
          backgroundColor: 'white', padding: '24px',
          borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>
          <h3 style={{ margin: '0 0 16px', color: '#2c3e50', fontSize: '15px', fontWeight: '600' }}>
            📁 Tasks by Department
          </h3>
          <CustomBarChart data={dashboardData?.barChartData || []} />
        </div>
      </div>
      <RecentTasks tasks={dashboardData?.recentTasks || []} />
    </div>
  )
}

export default Dashboard