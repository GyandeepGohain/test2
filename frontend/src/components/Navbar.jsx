import { useState } from 'react'
import { MdMenu, MdClose } from 'react-icons/md'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import UserSwitcher from './UserSwitcher'
import Sidebar from './Sidebar'

const roleColors = {
  org_admin: '#e74c3c',
  dept_head: '#2980b9',
  member: '#27ae60',
}

const roleLabels = {
  org_admin: 'Org Admin',
  dept_head: 'Dept Head',
  member: 'Member',
}

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [openSideMenu, setOpenSideMenu] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <nav style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setOpenSideMenu(!openSideMenu)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
            }}
            className="hamburger-btn"
          >
            {openSideMenu
              ? <MdClose style={{ fontSize: '26px' }} />
              : <MdMenu style={{ fontSize: '26px' }} />
            }
          </button>
          <h2 style={{ margin: 0, fontSize: '18px', whiteSpace: 'nowrap' }}>
            📋 Task Manager
          </h2>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '12px', flexWrap: 'wrap',
        }}>
          <UserSwitcher />

          <div style={{
            backgroundColor: roleColors[user?.role],
            padding: '4px 12px', borderRadius: '20px',
            fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap',
          }}>
            {user?.name} | {roleLabels[user?.role]}
          </div>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#e74c3c', color: 'white',
              border: 'none', padding: '6px 14px', borderRadius: '4px',
              cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap',
            }}
          >
            Logout
          </button>
        </div>
      </nav>
      {openSideMenu && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            display: 'flex',
          }}
          className="mobile-overlay"
        >
          <div
            onClick={() => setOpenSideMenu(false)}
            style={{
              position: 'absolute', inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          />
          <div style={{
            position: 'relative', zIndex: 210,
            width: '260px', backgroundColor: '#2c3e50',
            height: '100%', boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
          }}>
            <button
              onClick={() => setOpenSideMenu(false)}
              style={{
                position: 'absolute', top: '12px', right: '12px',
                background: 'rgba(255,255,255,0.1)', border: 'none',
                color: 'white', cursor: 'pointer', padding: '6px',
                borderRadius: '4px',
              }}
            >
              <MdClose style={{ fontSize: '22px' }} />
            </button>

            <div style={{ paddingTop: '50px' }}>
              <Sidebar onNavigate={() => setOpenSideMenu(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar