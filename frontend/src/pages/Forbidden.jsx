import { useNavigate } from 'react-router-dom'

const Forbidden = () => {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', backgroundColor: '#f0f2f5',
    }}>
      <div style={{
        textAlign: 'center', backgroundColor: 'white', padding: '48px',
        borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}>
        <div style={{ fontSize: '72px', marginBottom: '16px' }}>🚫</div>
        <h1 style={{ color: '#e74c3c', marginBottom: '8px' }}>403 - Access Denied</h1>
        <p style={{ color: '#7f8c8d', marginBottom: '32px', maxWidth: '400px' }}>
          You don't have permission to access this page.
          Please contact your administrator if you believe this is a mistake.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#2c3e50', color: 'white',
            border: 'none', padding: '12px 28px', borderRadius: '6px',
            fontSize: '15px', cursor: 'pointer', fontWeight: 'bold',
          }}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  )
}

export default Forbidden