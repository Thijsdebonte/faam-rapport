import { useState } from 'react'

const CORRECT_PASSWORD = import.meta.env.VITE_APP_PASSWORD || 'faam2024'

export default function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      onLogin()
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#242a2e' }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '400px',
          margin: '0 24px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
        }}
      >
        <div className="flex justify-center mb-8">
          <img src="/faam-logo-zwart-groen.png" alt="Faam" style={{ height: '48px' }} />
        </div>

        <h1
          className="text-center font-bold mb-1"
          style={{ fontSize: '22px', color: '#242a2e', margin: '0 0 6px' }}
        >
          Wervingsrapport Generator
        </h1>
        <p
          className="text-center mb-8"
          style={{ color: '#888', fontSize: '14px', margin: '0 0 32px' }}
        >
          Log in met het teamwachtwoord
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Wachtwoord"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              autoFocus
              style={{
                width: '100%',
                padding: '12px 16px',
                border: error ? '2px solid #ef4444' : '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.15s',
                animation: shaking ? 'shake 0.4s ease' : 'none',
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = '#04ba7e'
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = '#e5e7eb'
              }}
            />
            {error && (
              <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                Onjuist wachtwoord. Probeer opnieuw.
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '13px',
              background: '#04ba7e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseOver={(e) => (e.target.style.background = '#03a870')}
            onMouseOut={(e) => (e.target.style.background = '#04ba7e')}
          >
            Inloggen
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}
