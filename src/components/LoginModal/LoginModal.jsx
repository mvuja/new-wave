import { useState, useEffect, useRef } from 'react'
import './_login-modal.scss'
import useAuthStore from '../../store/useAuthStore'
import Button from '../UI/Button'

const LoginModal = ({ onClose }) => {
  const { login, loading, error, clearError } = useAuthStore()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const overlayRef   = useRef(null)
  const firstInputRef = useRef(null)

  // Focus first input on open
  useEffect(() => {
    firstInputRef.current?.focus()
  }, [])

  // Clear error message on mount
  useEffect(() => {
    clearError()
  }, [clearError])

  // Close on ESC
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.classList.add('no-scroll')
    return () => document.body.classList.remove('no-scroll')
  }, [])

  // Click outside overlay → close
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  const validate = () => {
    const errs = {}
    if (!username.trim()) errs.username = 'Username is required.'
    if (!password.trim()) errs.password = 'Password is required.'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError()
    const errs = validate()
    setFieldErrors(errs)
    if (Object.keys(errs).length > 0) return

    try {
      await login(username.trim(), password)
      onClose()
    } catch {
      // error is already set in the store
    }
  }

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close login modal">
          &#x2715;
        </button>

        <h2 id="modal-title">Sign in to New Wave</h2>
        <p className="modal-subtitle">
          Try <strong>emilys</strong> / <strong>emilyspass</strong>
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${fieldErrors.username ? 'has-error' : ''}`}>
            <label htmlFor="modal-username">Username</label>
            <input
              ref={firstInputRef}
              id="modal-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="emilys"
              autoComplete="username"
              disabled={loading}
            />
            {fieldErrors.username && (
              <span className="field-error">{fieldErrors.username}</span>
            )}
          </div>

          <div className={`form-group ${fieldErrors.password ? 'has-error' : ''}`}>
            <label htmlFor="modal-password">Password</label>
            <input
              id="modal-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
            />
            {fieldErrors.password && (
              <span className="field-error">{fieldErrors.password}</span>
            )}
          </div>

          {error && <p className="server-error">{error}</p>}

          <div className="modal-submit-wrapper">
            <Button type="submit" icon={false} onClick={undefined} disabled={loading}>
              {loading ? <span className="spinner" /> : 'Sign in'}
            </Button>
          </div>
        </form>

        <p className="modal-note">
          Auth uses DummyJSON test accounts. No real signup needed.
        </p>
      </div>
    </div>
  )
}

export default LoginModal
