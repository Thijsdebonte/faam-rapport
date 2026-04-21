// Rendered at exactly A4 landscape: 1123 × 794 px (96 dpi)
export default function VacancyPage({ vacancy, project }) {
  const clarity = vacancy.clarityData
  const meta = vacancy.metaData

  return (
    <div
      className="pdf-page-break"
      style={{
        width: '1123px',
        height: '794px',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexShrink: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        pageBreakBefore: 'always',
      }}
    >
      {/* ── Header bar ── */}
      <div
        style={{
          height: '72px',
          background: '#242a2e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          flexShrink: 0,
        }}
      >
        <img
          src="/faam-logo-wit-groen.png"
          alt="Faam"
          crossOrigin="anonymous"
          style={{ height: '26px', objectFit: 'contain' }}
        />
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '9px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: '600',
              margin: '0 0 3px',
            }}
          >
            Wervingsrapport · {project.clientName}
          </p>
          <h2
            style={{
              color: '#ffffff',
              fontSize: '20px',
              fontWeight: '700',
              margin: 0,
              letterSpacing: '-0.2px',
            }}
          >
            {vacancy.name}
          </h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          {project.periodFrom && project.periodTo && (
            <p style={{ color: '#04ba7e', fontSize: '11px', fontWeight: '600', margin: 0 }}>
              {formatDate(project.periodFrom)}
              <br />
              {formatDate(project.periodTo)}
            </p>
          )}
        </div>
      </div>

      {/* ── 3-column content ── */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0',
          overflow: 'hidden',
        }}
      >
        {/* Column 1: Faam.nl */}
        <Column color="#3b82f6" title="Faam.nl — vacaturepagina" borderRight>
          <MetricCard
            label="Bezoekers vacaturepagina"
            value={clarity ? formatNum(clarity.visitors) : '–'}
            color="#3b82f6"
          />
          <MetricCard
            label="Gemiddelde sessieduur"
            value={clarity ? `${clarity.avgDuration ?? '–'} sec` : '–'}
            color="#3b82f6"
          />
          <MetricCard
            label="Gemiddeld scroll%"
            value={clarity ? `${clarity.avgScroll ?? '–'}%` : '–'}
            color="#3b82f6"
          />
        </Column>

        {/* Column 2: Meta Ads */}
        <Column color="#8b5cf6" title="Vacatureadvertenties" borderRight>
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
        </Column>

        {/* Column 3: Sollicitaties */}
        <Column color="#04ba7e" title="Sollicitaties">
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Hero metric */}
            <div
              style={{
                background: '#f0fdf8',
                border: '1px solid #d1fae5',
                borderRadius: '10px',
                padding: '24px 20px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '3px',
                  background: '#04ba7e',
                }}
              />
              <p style={{ fontSize: '11px', color: '#888', fontWeight: '500', margin: '0 0 8px' }}>
                Aantal sollicitaties
              </p>
              <span
                style={{
                  fontSize: '80px',
                  fontWeight: '800',
                  color: '#242a2e',
                  lineHeight: 1,
                  letterSpacing: '-2px',
                  display: 'block',
                }}
              >
                {vacancy.applications !== '' ? String(vacancy.applications) : '–'}
              </span>
            </div>

            {/* Description box */}
            <div
              style={{
                flex: 1,
                background: '#242a2e',
                borderRadius: '10px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '12px',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Via gerichte Meta-advertenties en een geoptimaliseerde vacaturepagina op{' '}
                <span style={{ color: '#04ba7e', fontWeight: '600' }}>Faam.nl</span> zijn
                actieve en passieve kandidaten bereikt voor de positie{' '}
                <strong style={{ color: 'white' }}>{vacancy.name}</strong>.
              </p>
            </div>
          </div>
        </Column>
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          height: '32px',
          background: '#f8f9fa',
          borderTop: '1px solid #ececec',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          flexShrink: 0,
        }}
      >
        <span style={{ color: '#bbb', fontSize: '10px', letterSpacing: '0.5px' }}>
          Vertrouwelijk · {project.clientName}
        </span>
        <span style={{ color: '#04ba7e', fontSize: '10px', fontWeight: '700', letterSpacing: '0.5px' }}>
          faam.nl
        </span>
      </div>
    </div>
  )
}

function Column({ color, title, children, borderRight = false }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 28px',
        borderRight: borderRight ? '1px solid #f0f0f0' : 'none',
        overflow: 'hidden',
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: '3px',
            height: '14px',
            background: color,
            borderRadius: '2px',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: '10px',
            fontWeight: '700',
            color: '#555',
            textTransform: 'uppercase',
            letterSpacing: '1.2px',
          }}
        >
          {title}
        </span>
      </div>

      {/* Cards */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function MetricCard({ label, value, color }) {
  return (
    <div
      style={{
        flex: 1,
        background: 'white',
        border: '1px solid #f0f0f0',
        borderRadius: '10px',
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '3px',
          background: color,
        }}
      />
      <span style={{ fontSize: '11px', color: '#999', fontWeight: '500', lineHeight: 1.4 }}>
        {label}
      </span>
      <span
        style={{
          fontSize: '48px',
          fontWeight: '800',
          color: '#242a2e',
          lineHeight: 1,
          letterSpacing: '-1.5px',
          marginTop: '8px',
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
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })
}
