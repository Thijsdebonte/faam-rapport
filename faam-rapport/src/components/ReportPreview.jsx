import { useRef, useState } from 'react'
import CoverPage from './report/CoverPage'
import VacancyPage from './report/VacancyPage'

export default function ReportPreview({ project, vacancies, onBack }) {
  const reportRef = useRef(null)
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const element = reportRef.current

      const opt = {
        margin: 0,
        filename: `${new Date().getFullYear()}_-_${project.clientName.replace(/\s+/g, '_')}_-_Wervingsrapport.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
        pagebreak: { mode: 'avoid-all', before: '.pdf-page-break' },
      }

      await html2pdf().set(opt).from(element).save()
    } catch (err) {
      alert('PDF export mislukt: ' + err.message)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div>
      <div
        className="no-print flex items-center justify-between mb-6"
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '16px 24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        <div className="flex items-center gap-4">
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
          disabled={exporting}
          style={{
            padding: '12px 28px',
            background: exporting ? '#ccc' : '#04ba7e',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '700',
            cursor: exporting ? 'not-allowed' : 'pointer',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {exporting ? (
            <>
              <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
              Exporteren...
            </>
          ) : (
            <>
              ↓ Exporteer als PDF
            </>
          )}
        </button>
      </div>

      <div
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

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
