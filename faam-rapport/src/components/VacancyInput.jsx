import { useState } from 'react'
import { parseMetaCSV, parseClarityCSV } from '../utils/csvParser'

export default function VacancyInput({ vacancies, onChange, project, onBack, onNext }) {
  const allFilled = vacancies.every(v =>
    v.applications !== '' &&
    (v.metaData || v.metaSkipped) &&
    (v.clarityData || v.claritySkipped)
  )

  const updateVacancy = (id, patch) => {
    onChange(vacancies.map(v => v.id === id ? { ...v, ...patch } : v))
  }

  return (
    <div>
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ fontSize: '14px', color: '#666' }}>
          <strong style={{ color: '#242a2e' }}>{project.clientName}</strong>
          {' · '}
          {formatDate(project.periodFrom)} – {formatDate(project.periodTo)}
          {' · '}
          {vacancies.length} vacature{vacancies.length !== 1 ? 's' : ''}
        </div>
      </div>

      {vacancies.map((vacancy, index) => (
        <VacancyCard
          key={vacancy.id}
          vacancy={vacancy}
          index={index}
          onUpdate={(patch) => updateVacancy(vacancy.id, patch)}
        />
      ))}

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          style={{
            padding: '12px 24px',
            background: 'white',
            color: '#242a2e',
            border: '1.5px solid #ddd',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '15px',
          }}
        >
          ← Terug
        </button>
        <button
          onClick={onNext}
          disabled={!allFilled}
          style={{
            padding: '12px 32px',
            background: allFilled ? '#242a2e' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: allFilled ? 'pointer' : 'not-allowed',
            fontSize: '15px',
          }}
        >
          Rapport genereren →
        </button>
      </div>
    </div>
  )
}

function VacancyCard({ vacancy, index, onUpdate }) {
  const [metaLoading, setMetaLoading] = useState(false)
  const [clarityLoading, setClarityLoading] = useState(false)
  const [metaError, setMetaError] = useState(null)
  const [clarityError, setClarityError] = useState(null)

  const handleMetaUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setMetaLoading(true)
    setMetaError(null)
    try {
      const data = await parseMetaCSV(file)
      onUpdate({ metaData: data, metaSkipped: false, metaFileName: file.name })
    } catch (err) {
      setMetaError('Kon CSV niet verwerken: ' + err.message)
    } finally {
      setMetaLoading(false)
    }
  }

  const handleClarityUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setClarityLoading(true)
    setClarityError(null)
    try {
      const data = await parseClarityCSV(file)
      onUpdate({ clarityData: data, claritySkipped: false, clarityFileName: file.name })
    } catch (err) {
      setClarityError('Kon CSV niet verwerken: ' + err.message)
    } finally {
      setClarityLoading(false)
    }
  }

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        marginBottom: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: '#242a2e',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            background: '#04ba7e',
            color: 'white',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: '700',
            flexShrink: 0,
          }}
        >
          {index + 1}
        </span>
        <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: 0 }}>
          {vacancy.name}
        </h3>
      </div>

      <div style={{ padding: '24px' }}>
        <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* Meta Ads CSV */}
          <div>
            <SectionLabel>Meta Ads CSV</SectionLabel>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '10px' }}>
              Kolommen: impressies, bereik/uniek bereik
            </p>
            <FileUploadZone
              label="Meta Ads export"
              fileName={vacancy.metaFileName}
              loading={metaLoading}
              error={metaError}
              onUpload={handleMetaUpload}
              onSkip={() => onUpdate({ metaSkipped: true, metaData: null, metaFileName: null })}
              skipped={vacancy.metaSkipped}
            />
            {vacancy.metaData && (
              <DataPreview
                label="Herkende waarden"
                items={[
                  { label: 'Impressies', value: formatNum(vacancy.metaData.impressions) },
                  { label: 'Uniek bereik', value: formatNum(vacancy.metaData.reach) },
                ]}
              />
            )}
            {vacancy.metaData && (
              <div style={{ marginTop: '12px' }}>
                <SectionLabel style={{ marginBottom: '8px' }}>Waarden aanpassen</SectionLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                      Impressies
                    </label>
                    <input
                      type="number"
                      value={vacancy.metaData.impressions || ''}
                      onChange={e => onUpdate({
                        metaData: { ...vacancy.metaData, impressions: parseInt(e.target.value) || 0 }
                      })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                      Uniek bereik
                    </label>
                    <input
                      type="number"
                      value={vacancy.metaData.reach || ''}
                      onChange={e => onUpdate({
                        metaData: { ...vacancy.metaData, reach: parseInt(e.target.value) || 0 }
                      })}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Microsoft Clarity CSV */}
          <div>
            <SectionLabel>Microsoft Clarity CSV</SectionLabel>
            <p style={{ fontSize: '13px', color: '#888', marginBottom: '10px' }}>
              Kolommen: bezoekers/sessies, gem. sessieduur (sec), gem. scroll%
            </p>
            <FileUploadZone
              label="Clarity export"
              fileName={vacancy.clarityFileName}
              loading={clarityLoading}
              error={clarityError}
              onUpload={handleClarityUpload}
              onSkip={() => onUpdate({ claritySkipped: true, clarityData: null, clarityFileName: null })}
              skipped={vacancy.claritySkipped}
            />
            {vacancy.clarityData && (
              <DataPreview
                label="Herkende waarden"
                items={[
                  { label: 'Bezoekers', value: formatNum(vacancy.clarityData.visitors) },
                  { label: 'Gem. sessieduur', value: vacancy.clarityData.avgDuration ? `${vacancy.clarityData.avgDuration}s` : '–' },
                  { label: 'Gem. scroll%', value: vacancy.clarityData.avgScroll ? `${vacancy.clarityData.avgScroll}%` : '–' },
                ]}
              />
            )}
            {vacancy.clarityData && (
              <div style={{ marginTop: '12px' }}>
                <SectionLabel style={{ marginBottom: '8px' }}>Waarden aanpassen</SectionLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                      Bezoekers
                    </label>
                    <input
                      type="number"
                      value={vacancy.clarityData.visitors || ''}
                      onChange={e => onUpdate({
                        clarityData: { ...vacancy.clarityData, visitors: parseInt(e.target.value) || 0 }
                      })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                      Gem. duur (sec)
                    </label>
                    <input
                      type="number"
                      value={vacancy.clarityData.avgDuration || ''}
                      onChange={e => onUpdate({
                        clarityData: { ...vacancy.clarityData, avgDuration: parseInt(e.target.value) || 0 }
                      })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>
                      Gem. scroll%
                    </label>
                    <input
                      type="number"
                      value={vacancy.clarityData.avgScroll || ''}
                      onChange={e => onUpdate({
                        clarityData: { ...vacancy.clarityData, avgScroll: parseInt(e.target.value) || 0 }
                      })}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Applications */}
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f0f0f0' }}>
          <SectionLabel>Aantal sollicitaties</SectionLabel>
          <div style={{ maxWidth: '200px' }}>
            <input
              type="number"
              min="0"
              value={vacancy.applications}
              onChange={e => onUpdate({ applications: e.target.value })}
              placeholder="0"
              style={{
                ...inputStyle,
                fontSize: '20px',
                fontWeight: '700',
                color: '#04ba7e',
                textAlign: 'center',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function FileUploadZone({ label, fileName, loading, error, onUpload, onSkip, skipped }) {
  if (skipped) {
    return (
      <div
        style={{
          padding: '12px',
          background: '#fff8e1',
          border: '1.5px dashed #f0c040',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#888',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>CSV overgeslagen</span>
        <button
          onClick={() => onSkip()}
          style={{ background: 'none', border: 'none', color: '#04ba7e', cursor: 'pointer', fontSize: '12px' }}
        >
          Toch uploaden
        </button>
      </div>
    )
  }

  return (
    <div>
      <label
        style={{
          display: 'block',
          padding: '16px',
          background: fileName ? '#f0fdf8' : '#f8f9fa',
          border: `1.5px dashed ${fileName ? '#04ba7e' : '#ccc'}`,
          borderRadius: '8px',
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'all 0.15s',
        }}
      >
        <input type="file" accept=".csv" onChange={onUpload} style={{ display: 'none' }} />
        {loading ? (
          <span style={{ color: '#888', fontSize: '13px' }}>Verwerken...</span>
        ) : fileName ? (
          <div>
            <div style={{ fontSize: '18px', marginBottom: '4px' }}>✓</div>
            <div style={{ fontSize: '12px', color: '#04ba7e', fontWeight: '600' }}>{fileName}</div>
            <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>Klik om te vervangen</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '20px', marginBottom: '4px', opacity: 0.5 }}>📄</div>
            <div style={{ fontSize: '13px', color: '#666' }}>Klik om CSV te uploaden</div>
          </div>
        )}
      </label>
      {error && (
        <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{error}</p>
      )}
      {!fileName && (
        <button
          onClick={onSkip}
          style={{
            background: 'none',
            border: 'none',
            color: '#aaa',
            fontSize: '12px',
            cursor: 'pointer',
            marginTop: '6px',
            padding: 0,
          }}
        >
          Geen CSV beschikbaar? Sla over
        </button>
      )}
    </div>
  )
}

function DataPreview({ label, items }) {
  return (
    <div
      style={{
        marginTop: '10px',
        padding: '10px 12px',
        background: '#f0fdf8',
        borderRadius: '8px',
        border: '1px solid #d1fae5',
      }}
    >
      <div style={{ fontSize: '11px', fontWeight: '700', color: '#059669', marginBottom: '6px', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div className="flex gap-4 flex-wrap">
        {items.map(item => (
          <div key={item.label}>
            <div style={{ fontSize: '11px', color: '#888' }}>{item.label}</div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#242a2e' }}>{item.value || '–'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionLabel({ children, style = {} }) {
  return (
    <div
      style={{
        fontSize: '12px',
        fontWeight: '700',
        color: '#555',
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
        marginBottom: '8px',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  border: '1.5px solid #e5e7eb',
  borderRadius: '6px',
  fontSize: '14px',
  outline: 'none',
  color: '#242a2e',
}

function formatNum(n) {
  if (n === null || n === undefined) return '–'
  return n.toLocaleString('nl-NL')
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
}
