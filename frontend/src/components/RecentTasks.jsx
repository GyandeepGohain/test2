import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const statusStyles = {
  todo: { backgroundColor: '#fff3cd', color: '#856404' },
  in_progress: { backgroundColor: '#cce5ff', color: '#004085' },
  completed: { backgroundColor: '#d4edda', color: '#155724' },
}

const RecentTasks = ({ tasks }) => {
  const navigate = useNavigate()

  return (
    <div style={{
      backgroundColor: 'white', borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden',
    }}>
      <div style={{
        padding: '20px 24px', borderBottom: '1px solid #ecf0f1',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <h3 style={{ margin: 0, color: '#2c3e50', fontSize: '16px', fontWeight: '600' }}>
          Recent Tasks
        </h3>
        <button
          onClick={() => navigate('/tasks')}
          style={{
            backgroundColor: '#eef4ff', color: '#2980b9', border: 'none',
            padding: '6px 14px', borderRadius: '6px', cursor: 'pointer',
            fontSize: '13px', fontWeight: '500',
          }}
        >
          See More →
        </button>
      </div>

      <div style={{ padding: '16px 24px', overflowX: 'auto' }}>
        {tasks?.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                {['Task Name', 'Assigned To', 'Status', 'Department', 'Created On'].map(h => (
                  <th key={h} style={{
                    padding: '12px 16px', textAlign: 'left',
                    fontSize: '12px', fontWeight: '600',
                    color: '#6c757d', textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task._id} style={{
                  backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
                  borderBottom: '1px solid #f0f0f0',
                }}>
                  <td style={{ padding: '14px 16px', fontSize: '14px',
                    fontWeight: '500', color: '#2c3e50' }}>
                    {task.title}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#555' }}>
                    {task.assignedTo?.name}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      ...statusStyles[task.status],
                      padding: '4px 10px', borderRadius: '20px',
                      fontSize: '12px', fontWeight: '600',
                    }}>
                      {task.status?.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#555' }}>
                    {task.department}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#888' }}>
                    {moment(task.createdAt).format('MMM Do, YYYY')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '32px' }}>
            No recent tasks found
          </p>
        )}
      </div>
    </div>
  )
}

export default RecentTasks