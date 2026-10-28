import React, { useState } from 'react';
import { X, Key, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, LogOut, ExternalLink, User, Lock, Sparkles } from 'lucide-react';
import { loginF1, logoutF1 } from '../services/api';

export default function AuthModal({
  isOpen,
  onClose,
  authStatus,
  onAuthChange
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter your Formula 1 account username/email and password.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await loginF1({ username: username.trim(), password });
      setSuccessMsg(res.message || 'Authenticated successfully with Formula 1!');
      if (onAuthChange) {
        onAuthChange(res);
      }
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await logoutF1();
      if (onAuthChange) {
        onAuthChange(res);
      }
      setSuccessMsg('Disconnected from Formula 1 account.');
      setTimeout(() => {
        setSuccessMsg(null);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to disconnect account.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    // Dismiss modal and continue in archive / benchmark mode
    sessionStorage.setItem('f1_auth_dismissed', 'true');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 7, 13, 0.88)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem'
    }}>
      <div style={{
        background: '#12141f',
        border: '1px solid #232738',
        borderRadius: '12px',
        maxWidth: '560px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #1f2438',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(90deg, rgba(225, 6, 0, 0.1) 0%, transparent 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              background: '#e10600',
              padding: '0.35rem 0.5rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Key size={16} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Formula 1 API Access Gateway
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Connect your account to grant backend access to live race telemetry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '0.3rem',
              borderRadius: '4px',
              transition: 'color 0.2s'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Status Banner */}
          <div style={{
            background: authStatus?.is_authenticated ? 'rgba(16, 185, 129, 0.1)' : 'rgba(56, 189, 248, 0.08)',
            border: `1px solid ${authStatus?.is_authenticated ? 'rgba(16, 185, 129, 0.3)' : 'rgba(56, 189, 248, 0.25)'}`,
            borderRadius: '8px',
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {authStatus?.is_authenticated ? (
                <CheckCircle2 size={20} color="#10b981" />
              ) : (
                <ShieldCheck size={20} color="#38bdf8" />
              )}
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: authStatus?.is_authenticated ? '#34d399' : '#38bdf8' }}>
                  {authStatus?.is_authenticated
                    ? `Connected: ${authStatus.username || 'F1 Account'}`
                    : 'F1 Live Connection Gateway'}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  {authStatus?.message || 'Connect to enable direct backend telemetry streaming.'}
                </div>
              </div>
            </div>

            {authStatus?.is_authenticated && (
              <button
                onClick={handleLogout}
                disabled={loading}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#f87171',
                  borderRadius: '6px',
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <LogOut size={13} />
                <span>Disconnect</span>
              </button>
            )}
          </div>

          {/* Feedback Messages */}
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '6px',
              padding: '0.7rem 0.9rem',
              color: '#fca5a5',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} color="#ef4444" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>{error}</div>
            </div>
          )}

          {successMsg && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '6px',
              padding: '0.7rem 0.9rem',
              color: '#6ee7b7',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle2 size={16} color="#10b981" />
              <div>{successMsg}</div>
            </div>
          )}

          {/* Interactive Sign-In Form (if not authenticated) */}
          {!authStatus?.is_authenticated ? (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Formula 1 Username or Email
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="name@example.com"
                    disabled={loading}
                    style={{
                      width: '100%',
                      background: '#0a0d17',
                      border: '1px solid #282f48',
                      borderRadius: '6px',
                      padding: '0.65rem 0.75rem 0.65rem 2.25rem',
                      color: '#f8fafc',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    disabled={loading}
                    style={{
                      width: '100%',
                      background: '#0a0d17',
                      border: '1px solid #282f48',
                      borderRadius: '6px',
                      padding: '0.65rem 0.75rem 0.65rem 2.25rem',
                      color: '#f8fafc',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: 'linear-gradient(90deg, #e10600 0%, #b30000 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.75rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '0.3rem',
                  boxShadow: '0 4px 15px rgba(225, 6, 0, 0.35)'
                }}
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Connecting to F1 API...</span>
                  </>
                ) : (
                  <>
                    <Key size={16} />
                    <span>Authorize F1 Telemetry Access</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div style={{
              background: '#0a0d17',
              border: '1px solid #1e243b',
              borderRadius: '8px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.85rem'
            }}>
              <div style={{ color: '#10b981', fontWeight: 700 }}>
                ✓ Direct API Session Active
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.4 }}>
                The backend engine is authorized with your Formula 1 subscription token. You have high-frequency access to live telemetry, GPS coordinates, and sector times.
              </p>
            </div>
          )}

          {/* Quick Explanations & Register Link */}
          <div style={{
            borderTop: '1px solid #1f2438',
            paddingTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            fontSize: '0.78rem',
            color: '#94a3b8'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Need a free Formula 1 account?</span>
              <a
                href="https://www.formula1.com/en/register.html"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#38bdf8',
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <span>Register on formula1.com</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <div style={{ color: '#64748b', fontSize: '0.74rem', lineHeight: 1.4 }}>
              ℹ️ Standard free accounts allow session queries and historical telemetry. Official 2023 championship archive data across all 22 rounds is pre-cached for instant access.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '0.85rem 1.5rem',
          borderTop: '1px solid #1f2438',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.01)'
        }}>
          <button
            onClick={handleGuestMode}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#38bdf8',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0'
            }}
          >
            <Sparkles size={13} />
            <span>Continue in Guest / 2023 Archive Mode ›</span>
          </button>

          <button
            onClick={onClose}
            style={{
              background: '#232738',
              color: '#f8fafc',
              border: 'none',
              padding: '0.45rem 1rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
