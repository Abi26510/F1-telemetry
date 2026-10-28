import React from 'react';
import { X, Key, ShieldCheck, Terminal, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, authStatus }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 6, 10, 0.85)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem'
    }}>
      <div style={{
        background: '#141724',
        border: '1px solid var(--f1-border)',
        borderRadius: '12px',
        maxWidth: '620px',
        width: '100%',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.7)',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--f1-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Key size={18} color="#e10600" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
              Formula 1 API Authentication Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '0.2rem'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
          {/* Current Status Badge */}
          <div style={{
            background: authStatus?.is_authenticated ? 'rgba(16, 185, 129, 0.12)' : 'rgba(234, 179, 8, 0.12)',
            border: `1px solid ${authStatus?.is_authenticated ? 'rgba(16, 185, 129, 0.4)' : 'rgba(234, 179, 8, 0.4)'}`,
            borderRadius: '8px',
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            {authStatus?.is_authenticated ? (
              <CheckCircle2 size={20} color="#10b981" />
            ) : (
              <ShieldCheck size={20} color="#facc15" />
            )}
            <div>
              <div style={{ fontWeight: 700, color: authStatus?.is_authenticated ? '#34d399' : '#facc15' }}>
                {authStatus?.is_authenticated ? 'Live F1 Account Connected' : 'Free F1 Account Recommended'}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                {authStatus?.message}
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, color: '#f8fafc', marginBottom: '0.3rem' }}>
              Why is authentication needed?
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
              • <strong>Seasons 2018–2022</strong> (including 2019, 2020, 2021, 2022): Completely open without any password.
              <br />
              • <strong>Seasons 2023–2025</strong>: Formula 1's live timing server (<code>livetiming.formula1.com</code>) requires an official F1 token. A standard <strong>free account</strong> from Formula 1 is all that is required.
            </p>
          </div>

          {/* Steps */}
          <div>
            <h4 style={{ fontWeight: 700, color: '#f8fafc', marginBottom: '0.4rem' }}>
              Step 1: Get a free F1 account
            </h4>
            <a
              href="https://www.formula1.com/en/register.html"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#38bdf8',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <span>Register Free on Formula1.com</span>
              <ExternalLink size={13} />
            </a>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, color: '#f8fafc', marginBottom: '0.4rem' }}>
              Step 2: Connect via Terminal (Method A - Recommended)
            </h4>
            <div style={{
              background: '#0a0c12',
              border: '1px solid var(--f1-border)',
              borderRadius: '6px',
              padding: '0.6rem 0.85rem',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              color: '#00f0ff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Terminal size={15} />
              <span>python -m fastf1 auth f1tv --authenticate</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, color: '#f8fafc', marginBottom: '0.4rem' }}>
              Or configure in <code>backend/.env</code> (Method B)
            </h4>
            <div style={{
              background: '#0a0c12',
              border: '1px solid var(--f1-border)',
              borderRadius: '6px',
              padding: '0.6rem 0.85rem',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              color: '#94a3b8'
            }}>
              F1_USERNAME=your_email@example.com<br />
              F1_PASSWORD=your_password
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '0.75rem 1.25rem',
          borderTop: '1px solid var(--f1-border)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <button
            onClick={onClose}
            style={{
              background: 'var(--f1-red)',
              color: '#ffffff',
              border: 'none',
              padding: '0.45rem 1rem',
              borderRadius: '6px',
              fontWeight: 700,
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
