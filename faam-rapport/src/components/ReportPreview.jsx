import { useRef, useState } from 'react'
import CoverPage from './report/CoverPage'
import VacancyPage from './report/VacancyPage'

export default function ReportPreview({ project, vacancies, onBack }) {
  const reportRef = useRef(null)
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])

      const pages = Array.from(reportRef.current.querySelectorAll('.report-page'))
      if (!pages.length) throw new Error('Geen pagina-elementen gevonden')

      const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' })
      const pdfW = pdf.internal.pageSize.getWidth()   // 595.28 pt
      const pdfH = pdf.internal.pageSize.getHeight()  // 841.89 pt

      for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i], {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        })
        const imgData = canvas.toDataURL('image/jpeg', 0.98)
        if (i > 0) pdf.addPage()
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH)
      }

      const filename = `${new Date().getFullYear()}_-_${project.clientName.replace(/\s+/g, '_')}_-_Wervingsrapport.pdf`
      pdf.save(filename)
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
