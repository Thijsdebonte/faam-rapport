// Rendered at exactly A4 landscape: 1123 × 794 px (96 dpi)
export default function CoverPage({ project, vacancies }) {
  return (
    <div
      style={{
        width: '1123px',
        height: '794px',
        background: '#111',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        flexShrink: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* ── Left: full-height photo ── */}
      <div style={{ width: '490px', height: '794px', flexShrink: 0, overflow: 'hidden' }}>
        <img
          src="/personeelsfoto.jpg"
          alt=""
          crossOrigin="anonymous"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        />
      </div>

      {/* ── Right: dark content panel ── */}
      <div
        style={{
          flex: 1,
          height: '794px',
          background: '#111',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '52px 56px 44px 60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle diagonal decoration */}
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            right: '-60px',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            border: '1px solid rgba(4,186,126,0.12)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-20px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '1px solid rgba(4,186,126,0.08)',
            pointerEvents: 'none',
          }}
        />

        {/* Top: logo */}
        <div>
          <img
            src="/faam-logo-wit-groen.png"
            alt="Faam"
            crossOrigin="anonymous"
            style={{ height: '38px', objectFit: 'contain', objectPosition: 'left', display: 'block' }}
          />
        </div>

        {/* Middle: main text block */}
        <div>
          <div
            style={{
              width: '44px',
              height: '3px',
              background: '#04ba7e',
              borderRadius: '2px',
              marginBottom: '28px',
            }}
          />
          <p
            style={{
              color: 'rgba(255,255,255,0.38)',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              margin: '0 0 14px',
            }}
          >
            Wervingsrapport voor
          </p>
          <h1
            style={{
              color: '#ffffff',
              fontSize: '42px',
              fontWeight: '800',
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
              margin: '0 0 16px',
            }}
          >
            {project.clientName}
          </h1>
          {project.periodFrom && project.periodTo && (
            <p
              style={{
                color: '#04ba7e',
                fontSize: '15px',
                fontWeight: '600',
                margin: '0 0 44px',
              }}
            >
              {formatDate(project.periodFrom)} – {formatDate(project.periodTo)}
            </p>
          )}

          {vacancies.length > 0 && (
            <div>
              <p
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  margin: '0 0 12px',
                }}
              >
                Vacatures in dit rapport
              </p>
              {vacancies.map((v, i) => (
                <div
                  key={v.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      background: '#04ba7e',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: '700',
                      color: 'white',
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px' }}>
                    {v.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom: divider + faam.nl */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', letterSpacing: '1px' }}>
            faam.nl
          </span>
        </div>
      </div>
    </div>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
}
