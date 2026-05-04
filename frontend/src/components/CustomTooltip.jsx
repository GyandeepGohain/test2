const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'white', padding: '10px 14px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        borderRadius: '8px', border: '1px solid #e0e0e0',
      }}>
        <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#6c3ebf', marginBottom: '4px' }}>
          {payload[0].name}
        </p>
        <p style={{ fontSize: '13px', color: '#555' }}>
          Count: <strong style={{ color: '#111' }}>{payload[0].value}</strong>
        </p>
      </div>
    )
  }
  return null
}

export default CustomTooltip