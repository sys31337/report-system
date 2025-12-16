import React, { useState } from 'react'

export default function StaffOverview({ reports }) {
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedReportId, setSelectedReportId] = useState(null)

  const categories = ['all', ...new Set(reports.map(r => r.category))]
  
  const filteredReports = reports.filter(report => {
    const statusMatch = filterStatus === 'all' || report.status === filterStatus
    const categoryMatch = filterCategory === 'all' || report.category === filterCategory
    return statusMatch && categoryMatch
  })

  const selectedReport = reports.find(r => r.id === selectedReportId)

  const handleClaimReport = (reportId) => {
    if (window.postMessage) {
      window.postMessage({
        type: 'report-system:claimReport',
        data: { reportId }
      }, '*')
    }
  }

  const handleCloseReport = (reportId) => {
    if (window.postMessage) {
      window.postMessage({
        type: 'report-system:closeReport',
        data: { reportId }
      }, '*')
    }
  }

  const handleExecuteAction = (reportId, action) => {
    if (window.postMessage) {
      window.postMessage({
        type: 'report-system:executeAction',
        data: { reportId, action }
      }, '*')
    }
  }

  return (
    <div className="staff-overview">
      <div className="filters">
        <div className="filter-group">
          <label>Status</label>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="claimed">Claimed</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="staff-content">
        <div className="reports-list">
          <h3>Reports ({filteredReports.length})</h3>
          {filteredReports.map(report => (
            <div
              key={report.id}
              className={`report-card ${selectedReportId === report.id ? 'active' : ''}`}
              onClick={() => setSelectedReportId(report.id)}
            >
              <div className="card-header">
                <h4>{report.subject}</h4>
                <span className={`status ${report.status}`}>
                  {report.status}
                </span>
              </div>
              <p className="card-player">{report.playerName}</p>
              <p className="card-category">{report.category}</p>
            </div>
          ))}
        </div>

        {selectedReport ? (
          <div className="report-details">
            <h2>{selectedReport.subject}</h2>
            
            <div className="detail-row">
              <strong>Player:</strong> {selectedReport.playerName}
            </div>
            <div className="detail-row">
              <strong>Category:</strong> {selectedReport.category}
            </div>
            <div className="detail-row">
              <strong>Status:</strong> 
              <span className={`status-badge ${selectedReport.status}`}>
                {selectedReport.status}
              </span>
            </div>

            <div className="description-box">
              <h4>Description</h4>
              <p>{selectedReport.description}</p>
            </div>

            <div className="actions">
              {selectedReport.status === 'open' && (
                <button 
                  className="btn-action btn-claim"
                  onClick={() => handleClaimReport(selectedReport.id)}
                >
                  Claim Report
                </button>
              )}

              {selectedReport.status === 'claimed' && (
                <>
                  <button 
                    className="btn-action btn-secondary"
                    onClick={() => handleExecuteAction(selectedReport.id, 'heal')}
                  >
                    Heal Player
                  </button>
                  <button 
                    className="btn-action btn-secondary"
                    onClick={() => handleExecuteAction(selectedReport.id, 'teleport')}
                  >
                    Teleport To
                  </button>
                  <button 
                    className="btn-action btn-secondary"
                    onClick={() => handleExecuteAction(selectedReport.id, 'bring')}
                  >
                    Bring Player
                  </button>
                </>
              )}

              {selectedReport.status !== 'closed' && (
                <button 
                  className="btn-action btn-close"
                  onClick={() => handleCloseReport(selectedReport.id)}
                >
                  Close Report
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="no-selection">
            <p>Select a report to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}