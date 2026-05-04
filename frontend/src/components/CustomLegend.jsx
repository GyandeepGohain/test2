const CustomLegend = ({ payload }) => {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: '12px',
      justifyContent: 'center', marginTop: '16px',
    }}>
      {payload?.map((entry, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%',
            backgroundColor: entry.color,
          }} />
          <span style={{ fontSize: '12px', color: '#555', fontWeight: '500' }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CustomLegend