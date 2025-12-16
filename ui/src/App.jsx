import React, { useState, useEffect } from 'react'
import './styles/App.css'
import ReportInterface from './components/ReportInterface'
import StaffOverview from './components/StaffOverview'
import ReportDetail from './components/ReportDetail'
import { getThemeConfig } from './config/themeConfig'

function App() {
  const [activeView, setActiveView] = useState('report')
  const [config, setConfig] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [reports, setReports] = useState([])

  useEffect(() => {
    const initializeTheme = async () => {
      const themeConfig = await getThemeConfig()
      setConfig(themeConfig)
      setDarkMode(themeConfig.darkMode)
      
      const root = document.documentElement
      root.style.setProperty('--accent-color', themeConfig.accentColor)
      
      if (themeConfig.accentRgb) {
        root.style.setProperty(
          '--accent-rgb',
          `${themeConfig.accentRgb.r}, ${themeConfig.accentRgb.g}, ${themeConfig.accentRgb.b}`
        )
      }
    }

    initializeTheme()
  }, [])

  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener('message', (event) => {
        const data = event.data
        if (data.type === 'UPDATE_REPORTS') {
          setReports(data.reports)
        }
      })
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode')
  }

  if (!config) {
    return <div className="loading">Loading...</div>
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