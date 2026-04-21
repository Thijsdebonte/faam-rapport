export default function CoverPage({ project, vacancies }) {
  return (
    <div
      className="report-page"
      style={{
        width: '100%',
        aspectRatio: '210 / 297',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '8% 12%',
      }}
    >
      {/* Green accent line */}
      <div
        style={{
          width: '5cqw',
          height: '4px',
          background: '#00A850',
          marginBottom: '3.5cqw',
          borderRadius: '2px',
          flexShrink: 0,
        }}
      />

      {/* Logo — explicit width:auto prevents print stretching; no objectFit needed */}
      <img
        src="/faam-logo-wit-groen.png"
        alt="Faam"
        style={{
          height: '4cqw',
          width: 'auto',
          maxWidth: '22cqw',
          display: 'block',
          marginBottom: '5cqw',
          flexShrink: 0,
        }}
        crossOrigin="anonymous"
      />

      {/* Main heading */}
      <div>
        <p
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1.8cqw',
            fontWeight: '400',
            margin: '0 0 0.8cqw',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Wervingsrapport
        </p>
        <h1
          style={{
            color: 'white',
            fontSize: '3.2cqw',
            fontWeight: '800',
            margin: '0 0 1.6cqw',
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
              fontSize: '1.4cqw',
              fontWeight: '600',
              margin: '0 0 5cqw',
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
              fontSize: '1cqw',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '1.2cqw',
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
                gap: '1cqw',
                marginBottom: '0.8cqw',
              }}
            >
              <span
                style={{
                  width: '2cqw',
                  height: '2cqw',
                  background: '#00A850',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1cqw',
                  fontWeight: '700',
                  color: 'white',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.2cqw' }}>
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
          gap: '1.2cqw',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '1cqw' }}>faam.nl</span>
      </div>
    </div>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
}
