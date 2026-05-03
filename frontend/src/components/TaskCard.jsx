import { useAuth } from '../context/AuthContext'

const statusColors = {
  todo: '#f39c12',
  in_progress: '#2980b9',
  completed: '#27ae60',
}

const TaskCard = ({ task, onStatusUpdate, onDelete }) => {
  const { user } = useAuth()

  const isAssignedToMe = task.assignedTo?._id === user?._id
  const isOrgAdmin = user?.role === 'org_admin'
  const isDeptHead = user?.role === 'dept_head' && 
    task.department === user?.department

  const canUpdateStatus = isAssignedToMe || isOrgAdmin || isDeptHead
  const canDelete = isOrgAdmin || isDeptHead

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      borderLeft: `4px solid ${statusColors[task.status]}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        
        {/* Left side - Task info */}
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 8px', color: '#2c3e50' }}>{task.title}</h3>
          {task.description && (
            <p style={{ margin: '0 0 12px', color: '#7f8c8d', fontSize: '14px' }}>
              {task.description}
            </p>
          )}
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#95a5a6', flexWrap: 'wrap' }}>
            <span>📁 {task.department}</span>
            <span>👤 Assigned to: <strong>{task.assignedTo?.name}</strong></span>
            <span>✉️ {task.assignedTo?.email}</span>
            {task.createdBy && (
              <span>🔧 Created by: {task.createdBy?.name}</span>
            )}
          </div>
        </div>

        {/* Right side - Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', marginLeft: '16px' }}>
          
          {/* Status Badge */}
          <span style={{
            backgroundColor: statusColors[task.status],
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            {task.status?.replace('_', ' ')}
          </span>

          {/* Status Update Dropdown */}
          {canUpdateStatus && (
            <select
              value={task.status}
              onChange={(e) => onStatusUpdate(task._id, e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          )}

          {/* Delete Button */}
          {canDelete && (
            <button
              onClick={() => onDelete(task._id)}
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
              🗑 Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskCard