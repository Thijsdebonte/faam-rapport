import { useRef, useState } from 'react'
import CoverPage from './report/CoverPage'
import VacancyPage from './report/VacancyPage'

// A4 landscape at 96 dpi
const PAGE_W = 1123
const PAGE_H = 794

// Preview fits inside the 900px max-width container (minus 48px padding)
const PREVIEW_W = 852
const SCALE = PREVIEW_W / PAGE_W  // ≈ 0.758

export default function ReportPreview({ project, vacancies, onBack }) {
  const reportRef = useRef(null)
  const scalerRef = useRef(null)
  const [exporting, setExporting] = useState(false)

  const numPages = 1 + vacancies.length
  const previewH = Math.round(PAGE_H * SCALE) * numPages

  const handleExport = async () => {
    setExporting(true)

    // Remove scale transform so html2canvas captures real A4 pixels
    if (scalerRef.current) scalerRef.current.style.transform = 'none'

    try {
      const html2pdf = (await import('html2pdf.js')).default

      const opt = {
        margin: 0,
        filename: `${new Date().getFullYear()}_-_${project.clientName.replace(/\s+/g, '_')}_-_Wervingsrapport.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          width: PAGE_W,
        },
        jsPDF: {
          unit: 'px',
          format: [PAGE_W, PAGE_H],
          orientation: 'landscape',
        },
        pagebreak: { mode: 'css', before: '.pdf-page-break' },
      }

      await html2pdf().set(opt).from(reportRef.current).save()
    } catch (err) {
      alert('PDF export mislukt: ' + err.message)
    } finally {
      // Restore scale transform
      if (scalerRef.current) {
        scalerRef.current.style.transform = `scale(${SCALE})`
      }
      setExporting(false)
    }
  }

  return (
    <div>
      {/* Toolbar */}
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
            Voorvertoning — <strong>{project.clientName}</strong>
            <span style={{ color: '#aaa', marginLeft: '8px' }}>
              ({numPages} pagina{numPages !== 1 ? "'s" : ''})
            </span>
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
            '↓ Exporteer als PDF'
          )}
        </button>
      </div>

      {/* Scaled preview container */}
      <div
        style={{
          width: `${PREVIEW_W}px`,
          height: `${previewH}px`,
          overflow: 'hidden',
          borderRadius: '8px',
          boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
        }}
      >
        <div
          ref={scalerRef}
          style={{
            transform: `scale(${SCALE})`,
            transformOrigin: 'top left',
            width: `${PAGE_W}px`,
          }}
        >
          <div ref={reportRef}>
            <CoverPage project={project} vacancies={vacancies} />
            {vacancies.map((vacancy) => (
              <VacancyPage
                key={vacancy.id}
                vacancy={vacancy}
                project={project}
              />
            ))}
          </div>
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
