export default function CoverPage({ project, vacancies }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '210 / 297',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        pageBreakAfter: 'always',
        padding: '8% 12%',
      }}
    >
      {/* Green accent line */}
      <div
        style={{
          width: '48px',
          height: '4px',
          background: '#00A850',
          marginBottom: '32px',
          borderRadius: '2px',
        }}
      />

      {/* Logo */}
      <img
        src="/faam-logo-wit-groen.png"
        alt="Faam"
        style={{ height: '36px', objectFit: 'contain', objectPosition: 'left', marginBottom: '48px' }}
        crossOrigin="anonymous"
      />

      {/* Main heading */}
      <div>
        <p
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1.8vw',
            fontWeight: '400',
            margin: '0 0 8px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Wervingsrapport
        </p>
        <h1
          style={{
            color: 'white',
            fontSize: '3.2vw',
            fontWeight: '800',
            margin: '0 0 16px',
            lineHeight: 1.2,
            letterSpacing: '-0.5px',
          }}
        >
          {project.clientName}
        </h1>
        {project.periodFrom && project.periodTo && (
          <p
            style={{
              color: '#00A850',
              fontSize: '1.4vw',
              fontWeight: '600',
              margin: '0 0 48px',
            }}
          >
            {formatDate(project.periodFrom)} – {formatDate(project.periodTo)}
          </p>
        )}
      </div>

      {/* Vacancies list */}
      {vacancies.length > 0 && (
        <div>
          <p
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '1vw',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '12px',
              fontWeight: '600',
            }}
          >
            Vacatures
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
                  background: '#00A850',
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
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.2vw' }}>
                {v.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Bottom decoration */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '12%',
          right: '12%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '1vw' }}>faam.nl</span>
      </div>
    </div>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
}
