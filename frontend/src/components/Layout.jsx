import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ display: 'flex', flex: 1 }}>
        <div className="desktop-sidebar" style={{ flexShrink: 0 }}>
          <Sidebar />
        </div>
        <main style={{
          flex: 1, padding: '24px',
          backgroundColor: '#f0f2f5', minWidth: 0,
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout