import React from 'react'
import { ResumeFormData } from '@/components/resume/resume-form'

export const SampleStyles = `
.sample-template {
  font-family: Arial, sans-serif;
  max-width: 210mm;
  margin: 0 auto;
  padding: 18mm;
  color: #111827;
}

.sample-header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  border-bottom:2px solid #e5e7eb;
  padding-bottom:10px;
  margin-bottom:12px;
}

.sample-name { font-size:20pt; font-weight:700 }
.sample-contact { font-size:10pt; color:#6b7280 }

.sample-section { margin-bottom:14px }
.sample-title { font-weight:700; color:#111827; font-size:11pt; margin-bottom:6px }
.sample-list { margin:0; padding-left:16px }

@media print { .sample-template { padding:12mm } }
`

export function SampleTemplate({ data }: { data: ResumeFormData }) {
  const personalInfo = (data as any).personalInfo || (data as any).personal_info || {}

  return (
    <div className="sample-template">
      <header className="sample-header">
        <div>
          <div className="sample-name">{personalInfo?.fullName || 'Full Name'}</div>
          <div className="sample-contact">{personalInfo?.email || ''} · {personalInfo?.phone || ''}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="sample-contact">{personalInfo?.location || ''}</div>
        </div>
      </header>

      {personalInfo?.summary && (
        <section className="sample-section">
          <div className="sample-title">Summary</div>
          <div>{personalInfo.summary}</div>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="sample-section">
          <div className="sample-title">Experience</div>
          <ul className="sample-list">
            {data.experience.map((e: any, i: number) => (
              <li key={i}><strong>{e.position}</strong> — {e.company} <span style={{color:'#6b7280'}}>({e.startDate} - {e.endDate})</span></li>
            ))}
          </ul>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="sample-section">
          <div className="sample-title">Skills</div>
          <div>{data.skills.join(', ')}</div>
        </section>
      )}
    </div>
  )
}
