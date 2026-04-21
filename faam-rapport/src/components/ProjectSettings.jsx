import { useState } from 'react'

export default function ProjectSettings({ project, onChange, vacancies, onVacanciesChange, onNext }) {
  const [newVacancyName, setNewVacancyName] = useState('')

  const addVacancy = () => {
    const name = newVacancyName.trim()
    if (!name) return
    onVacanciesChange([
      ...vacancies,
      { id: Date.now(), name, metaData: null, clarityData: null, applications: '' },
    ])
    setNewVacancyName('')
  }

  const removeVacancy = (id) => {
    onVacanciesChange(vacancies.filter(v => v.id !== id))
  }

  const isValid = project.clientName.trim() && project.periodFrom && project.periodTo && vacancies.length > 0

  return (
    <div>
      <Card title="Projectinstellingen">
        <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <Label>Klantnaam</Label>
            <Input
              value={project.clientName}
              onChange={e => onChange({ ...project, clientName: e.target.value })}
              placeholder="bijv. Op- en Overslag Twente"
            />
          </div>
          <div>
            <Label>Periode van</Label>
            <Input
              type="date"
              value={project.periodFrom}
              onChange={e => onChange({ ...project, periodFrom: e.target.value })}
            />
          </div>
          <div>
            <Label>Periode tot</Label>
            <Input
              type="date"
              value={project.periodTo}
              onChange={e => onChange({ ...project, periodTo: e.target.value })}
            />
          </div>
        </div>
      </Card>

      <Card title="Vacatures" className="mt-4">
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
          Voeg één of meerdere vacatures toe waarvoor je wervingsdata wilt rapporteren.
        </p>

        {vacancies.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            {vacancies.map((v, i) => (
              <div
                key={v.id}
                className="flex items-center justify-between"
                style={{
                  padding: '10px 14px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  border: '1px solid #e9ecef',
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    style={{
                      background: '#04ba7e',
                      color: 'white',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '700',
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontWeight: '500', color: '#242a2e' }}>{v.name}</span>
                </div>
                <button
                  onClick={() => removeVacancy(v.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#999',
                    cursor: 'pointer',
                    fontSize: '18px',
                    padding: '0 4px',
                    lineHeight: 1,
                  }}
                  title="Verwijder vacature"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <Input
            value={newVacancyName}
            onChange={e => setNewVacancyName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addVacancy()}
            placeholder="Naam van de vacature (bijv. Commercieel bedrijfsleider)"
            style={{ flex: 1 }}
          />
          <button
            onClick={addVacancy}
            disabled={!newVacancyName.trim()}
            style={{
              padding: '10px 20px',
              background: newVacancyName.trim() ? '#04ba7e' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: newVacancyName.trim() ? 'pointer' : 'not-allowed',
              whiteSpace: 'nowrap',
              fontSize: '14px',
            }}
          >
            + Voeg toe
          </button>
        </div>
      </Card>

      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          disabled={!isValid}
          style={{
            padding: '12px 32px',
            background: isValid ? '#242a2e' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: isValid ? 'pointer' : 'not-allowed',
            fontSize: '15px',
          }}
        >
          Volgende: Vacaturegegevens →
        </button>
      </div>
    </div>
  )
}

function Card({ title, children, className = '' }) {
  return (
    <div
      className={className}
      style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      <h2
        style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#242a2e',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '2px solid #04ba7e',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

function Label({ children }) {
  return (
    <label
      style={{
        display: 'block',
        fontSize: '13px',
        fontWeight: '600',
        color: '#555',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
    >
      {children}
    </label>
  )
}

function Input({ style = {}, ...props }) {
  return (
    <input
      style={{
        width: '100%',
        padding: '10px 12px',
        border: '1.5px solid #e5e7eb',
        borderRadius: '8px',
        fontSize: '15px',
        outline: 'none',
        color: '#242a2e',
        ...style,
      }}
      onFocus={e => (e.target.style.borderColor = '#04ba7e')}
      onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
      {...props}
    />
  )
}
