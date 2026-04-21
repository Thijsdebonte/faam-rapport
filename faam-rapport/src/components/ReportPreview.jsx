import { useRef } from 'react'
import CoverPage from './report/CoverPage'
import VacancyPage from './report/VacancyPage'

export default function ReportPreview({ project, vacancies, onBack }) {
  const reportRef = useRef(null)

  const handleExport = () => window.print()

  return (
    <div>
      {/* Toolbar — hidden in print via .no-print */}
      <div
        className="no-print"
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '16px 24px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onBack}
            style={{
              padding: '10px 20px',
              background: 'white',
              color: '#242a2e',
              border: '1.5px solid #ddd',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            ← Terug
          </button>
          <span style={{ color: '#666', fontSize: '14px' }}>
            Voorvertoning rapport voor <strong>{project.clientName}</strong>
          </span>
        </div>
        <button
          onClick={handleExport}
          style={{
            padding: '12px 28px',
            background: '#04ba7e',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '15px',
          }}
        >
          ↓ Exporteer als PDF
        </button>
      </div>

      {/* Report pages — .report-container strips decoration in print */}
      <div
        className="report-container"
        style={{
          background: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        }}
      >
        <div ref={reportRef}>
          <CoverPage project={project} vacancies={vacancies} />
          {vacancies.map((vacancy, i) => (
            <VacancyPage
              key={vacancy.id}
              vacancy={vacancy}
              project={project}
              isFirst={i === 0}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
