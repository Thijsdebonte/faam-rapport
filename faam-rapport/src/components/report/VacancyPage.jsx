export default function VacancyPage({ vacancy, project, isFirst }) {
  const clarity = vacancy.clarityData
  const meta = vacancy.metaData

  return (
    <div
      className="pdf-page-break"
      style={{
        width: '100%',
        aspectRatio: '210 / 297',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
        pageBreakBefore: 'always',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: '#242a2e',
          padding: '3.5% 6%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div>
          <p
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '1vw',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              margin: '0 0 4px',
              fontWeight: '600',
            }}
          >
            Wervingsrapport · {project.clientName}
          </p>
          <h2
            style={{
              color: 'white',
              fontSize: '2.2vw',
              fontWeight: '700',
              margin: 0,
              letterSpacing: '-0.3px',
            }}
          >
            {vacancy.name}
          </h2>
          {project.periodFrom && project.periodTo && (
            <p style={{ color: '#04ba7e', fontSize: '1.1vw', margin: '4px 0 0', fontWeight: '500' }}>
              {formatDate(project.periodFrom)} – {formatDate(project.periodTo)}
            </p>
          )}
        </div>
        <img
          src="/faam-logo-wit-groen.png"
          alt="Faam"
          style={{ height: '28px', objectFit: 'contain' }}
          crossOrigin="anonymous"
        />
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: '4% 6%',
          display: 'flex',
          flexDirection: 'column',
          gap: '4%',
          overflow: 'hidden',
        }}
      >
        {/* Section: Faam.nl */}
        <Section
          title="Algemene informatie Faam.nl"
          icon="🌐"
          color="#3b82f6"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2%' }}>
            <MetricCard
              label="Bezoekers vacaturepagina"
              value={clarity ? formatNum(clarity.visitors) : '–'}
              color="#3b82f6"
            />
            <MetricCard
              label="Gemiddelde sessieduur"
              value={clarity ? `${clarity.avgDuration ?? '–'}s` : '–'}
              color="#3b82f6"
            />
            <MetricCard
              label="Gemiddeld scroll%"
              value={clarity ? `${clarity.avgScroll ?? '–'}%` : '–'}
              color="#3b82f6"
            />
          </div>
        </Section>

        {/* Section: Meta Ads */}
        <Section
          title="Algemene informatie vacatureadvertenties"
          icon="📢"
          color="#8b5cf6"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2%' }}>
            <MetricCard
              label="Aantal vertoningen"
              value={meta ? formatNum(meta.impressions) : '–'}
              color="#8b5cf6"
            />
            <MetricCard
              label="Uniek bereik"
              value={meta ? formatNum(meta.reach) : '–'}
              color="#8b5cf6"
            />
          </div>
        </Section>

        {/* Section: Applications */}
        <Section
          title="Sollicitaties"
          icon="✉️"
          color="#04ba7e"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2%' }}>
            <MetricCard
              label="Aantal sollicitaties"
              value={vacancy.applications !== '' ? String(vacancy.applications) : '–'}
              color="#04ba7e"
              large
            />
            <div
              style={{
                background: 'linear-gradient(135deg, #f0fdf8 0%, #e8fdf5 100%)',
                borderRadius: '10px',
                padding: '4%',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #d1fae5',
              }}
            >
              <p style={{ color: '#059669', fontSize: '1.1vw', lineHeight: 1.5, margin: 0 }}>
                Via gerichte Meta-advertenties en een geoptimaliseerde vacaturepagina op Faam.nl
                zijn actieve en passieve kandidaten bereikt voor de positie{' '}
                <strong>{vacancy.name}</strong>.
              </p>
            </div>
          </div>
        </Section>
      </div>

      {/* Footer */}
      <div
        style={{
          background: '#f8f9fa',
          borderTop: '1px solid #e9ecef',
          padding: '1.5% 6%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <span style={{ color: '#aaa', fontSize: '0.9vw' }}>
          Vertrouwelijk · {project.clientName}
        </span>
        <span style={{ color: '#04ba7e', fontSize: '0.9vw', fontWeight: '600' }}>faam.nl</span>
      </div>
    </div>
  )
}

function Section({ title, icon, color, children }) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '2%',
        }}
      >
        <div
          style={{
            width: '3px',
            height: '18px',
            background: color,
            borderRadius: '2px',
            flexShrink: 0,
          }}
        />
        <h3
          style={{
            fontSize: '1.1vw',
            fontWeight: '700',
            color: '#242a2e',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
          }}
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  )
}

function MetricCard({ label, value, color, large = false }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '10px',
        padding: '4%',
        border: '1px solid #f0f0f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: color,
        }}
      />
      <span
        style={{
          fontSize: '1vw',
          color: '#888',
          fontWeight: '500',
          lineHeight: 1.3,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: large ? '3.5vw' : '2.8vw',
          fontWeight: '800',
          color: '#242a2e',
          lineHeight: 1,
          letterSpacing: '-1px',
        }}
      >
        {value}
      </span>
    </div>
  )
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
