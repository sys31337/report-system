import React, { useState, useEffect } from 'react'
import './styles/App.css'
import ReportInterface from './components/ReportInterface'
import StaffOverview from './components/StaffOverview'
import ReportDetail from './components/ReportDetail'

function App() {
  const [activeView, setActiveView] = useState('report')
  const [darkMode, setDarkMode] = useState(false)
  const [reports, setReports] = useState([])
  const [config, setConfig] = useState({
    accentColor: '#FF6B6B',
    categories: ['Bug Report', 'Player Report', 'Feature Request', 'Support', 'Other']
  })

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent-color', config.accentColor)
    
    const hex = config.accentColor.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    root.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`)
  }, [config.accentColor])

  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data
      if (data.type === 'UPDATE_REPORTS') {
        setReports(data.reports)
      }
    }
    
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode')
  }

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <h1>Report System</h1>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <nav className="app-nav">
        <button 
          className={`nav-item ${activeView === 'report' ? 'active' : ''}`}
          onClick={() => setActiveView('report')}
        >
          Create Report
        </button>
        <button 
          className={`nav-item ${activeView === 'my-reports' ? 'active' : ''}`}
          onClick={() => setActiveView('my-reports')}
        >
          My Reports
        </button>
        <button 
          className={`nav-item ${activeView === 'staff' ? 'active' : ''}`}
          onClick={() => setActiveView('staff')}
        >
          Staff Overview
        </button>
      </nav>

      <main className="app-main">
        {activeView === 'report' && <ReportInterface categories={config.categories} />}
        {activeView === 'my-reports' && <ReportDetail reports={reports} />}
        {activeView === 'staff' && <StaffOverview reports={reports} />}
      </main>
    </div>
  )
}

export default App