import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts'

const DEPT_COLORS = {
  engineering: '#2980b9',
  design: '#8e44ad',
}

const CustomBarChart = ({ data }) => {
  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white', padding: '10px 14px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          borderRadius: '8px', border: '1px solid #e0e0e0',
        }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#6c3ebf', marginBottom: '4px' }}>
            {payload[0].payload.department}
          </p>
          <p style={{ fontSize: '13px', color: '#555' }}>
            Tasks: <strong>{payload[0].payload.count}</strong>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid stroke="none" />
        <XAxis dataKey="department" tick={{ fill: '#555', fontSize: 12 }} stroke="none" />
        <YAxis tick={{ fill: '#555', fontSize: 12 }} stroke="none" />
        <Tooltip content={<CustomToolTip />} cursor={{ fill: 'transparent' }} />
        <Bar dataKey="count" radius={[10, 10, 0, 0]}>
          {data?.map((entry, index) => (
            <Cell
              key={index}
              fill={DEPT_COLORS[entry.department] || '#27ae60'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CustomBarChart