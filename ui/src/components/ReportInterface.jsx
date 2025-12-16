import React, { useState } from 'react'

export default function ReportInterface({ categories }) {
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!subject.trim() || !description.trim()) {
      alert('Please fill in all fields')
      return
    }

    if (window.postMessage) {
      window.postMessage({
        type: 'report-system:submitReport',
        data: {
          subject,
          category,
          description
        }
      }, '*')
    }

    setSubmitted(true)
    setTimeout(() => {
      setSubject('')
      setDescription('')
      setCategory(categories[0])
      setSubmitted(false)
    }, 2000)
  }

  return (
    <div className="report-interface">
      <h2>Submit a Report</h2>
      
      {submitted ? (
        <div className="success-message">
          ✓ Report submitted successfully
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label>Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief subject of your report"
              className="form-control"
              maxLength="100"
            />
            <small>{subject.length}/100</small>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of your report..."
              className="form-control"
              rows="6"
              maxLength="1000"
            />
            <small>{description.length}/1000</small>
          </div>

          <button type="submit" className="btn-primary">
            Submit Report
          </button>
        </form>
      )}
    </div>
  )
}