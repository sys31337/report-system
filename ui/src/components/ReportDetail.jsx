import React, { useState } from 'react'

export default function ReportDetail({ reports }) {
  const [selectedReportId, setSelectedReportId] = useState(null)
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')

  const selectedReport = reports.find(r => r.id === selectedReportId)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    if (window.postMessage) {
      window.postMessage({
        type: 'report-system:sendMessage',
        data: {
          reportId: selectedReportId,
          message: messageInput
        }
      }, '*')
    }

    setMessages([...messages, {
      sender: 'You',
      message: messageInput,
      timestamp: new Date().toLocaleTimeString()
    }])
    setMessageInput('')
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return '#FF6B6B'
      case 'claimed': return '#FFD93D'
      case 'closed': return '#6BCB77'
      default: return '#666'
    }
  }

  return (
    <div className="report-detail-container">
      <div className="reports-list">
        <h3>Your Reports</h3>
        {reports.length === 0 ? (
          <p className="no-reports">No reports yet</p>
        ) : (
          reports.map(report => (
            <div
              key={report.id}
              className={`report-item ${selectedReportId === report.id ? 'active' : ''}`}
              onClick={() => setSelectedReportId(report.id)}
            >
              <div className="report-header">
                <h4>{report.subject}</h4>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(report.status) }}
                >
                  {report.status}
                </span>
              </div>
              <p className="report-category">{report.category}</p>
              <small className="report-time">
                {new Date(report.createdAt * 1000).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>

      {selectedReport ? (
        <div className="report-view">
          <div className="report-info">
            <h2>{selectedReport.subject}</h2>
            <p className="report-category">Category: {selectedReport.category}</p>
            <p className="report-status">
              Status: <span style={{ color: getStatusColor(selectedReport.status) }}>
                {selectedReport.status.toUpperCase()}
              </span>
            </p>
            {selectedReport.claimedByName && (
              <p className="report-claimed">Claimed by: {selectedReport.claimedByName}</p>
            )}
            <div className="report-description">
              <h4>Description</h4>
              <p>{selectedReport.description}</p>
            </div>
          </div>

          <div className="chat-section">
            <h4>Live Chat with Staff</h4>
            <div className="messages">
              {messages.map((msg, idx) => (
                <div key={idx} className="message">
                  <strong>{msg.sender}</strong>
                  <p>{msg.message}</p>
                  <small>{msg.timestamp}</small>
                </div>
              ))}
            </div>
            
            {selectedReport.status !== 'closed' && (
              <form onSubmit={handleSendMessage} className="message-input-form">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="message-input"
                />
                <button type="submit" className="btn-send">Send</button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="no-selection">
          <p>Select a report to view details</p>
        </div>
      )}
    </div>
  )
}