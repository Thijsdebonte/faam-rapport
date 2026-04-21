import { useState, useEffect } from 'react'
import LoginScreen from './components/LoginScreen'
import ProjectSettings from './components/ProjectSettings'
import VacancyInput from './components/VacancyInput'
import ReportPreview from './components/ReportPreview'
import './index.css'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [step, setStep] = useState('settings')
  const [project, setProject] = useState({
    clientName: '',
    periodFrom: '',
    periodTo: '',
  })
  const [vacancies, setVacancies] = useState([])

  useEffect(() => {
    const session = localStorage.getItem('faam_session')
    if (session === 'true') setIsLoggedIn(true)
  }, [])

  const handleLogin = () => {
    localStorage.setItem('faam_session', 'true')
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('faam_session')
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen" style={{ background: '#f0f0f0' }}>
      <nav className="no-print" style={{ background: '#242a2e' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}
          className="flex items-center justify-between py-4">
          <img src="/faam-logo-wit-groen.png" alt="Faam" style={{ height: '32px' }} />
          <div className="flex items-center gap-6">
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              Wervingsrapport Generator
            </span>
            <button
              onClick={handleLogout}
              style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Uitloggen
            </button>
          </div>
        </div>
      </nav>

      <div className="no-print" style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 24px 8px' }}>
        <StepIndicator step={step} />
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 48px' }}>
        {step === 'settings' && (
          <ProjectSettings
            project={project}
            onChange={setProject}
            vacancies={vacancies}
            onVacanciesChange={setVacancies}
            onNext={() => setStep('vacancies')}
          />
        )}
        {step === 'vacancies' && (
          <VacancyInput
            vacancies={vacancies}
            onChange={setVacancies}
            project={project}
            onBack={() => setStep('settings')}
            onNext={() => setStep('report')}
          />
        )}
        {step === 'report' && (
          <ReportPreview
            project={project}
            vacancies={vacancies}
            onBack={() => setStep('vacancies')}
          />
        )}
      </div>
    </div>
  )
}

function StepIndicator({ step }) {
  const steps = [
    { key: 'settings', label: 'Projectinstellingen' },
    { key: 'vacancies', label: 'Vacaturegegevens' },
    { key: 'report', label: 'Rapport' },
  ]
  const currentIndex = steps.findIndex(s => s.key === step)

  return (
    <div className="flex items-center gap-0 mb-4">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center rounded-full text-sm font-bold"
              style={{
                width: '28px',
                height: '28px',
                background: i <= currentIndex ? '#04ba7e' : '#ccc',
                color: 'white',
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <span
              className="text-sm font-medium"
              style={{ color: i <= currentIndex ? '#242a2e' : '#999' }}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                width: '48px',
                height: '2px',
                background: i < currentIndex ? '#04ba7e' : '#ccc',
                margin: '0 12px',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
