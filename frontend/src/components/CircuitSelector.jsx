import React from 'react';
import { Compass, User, Calendar, Map, RefreshCw, Key } from 'lucide-react';
import { getTrackSvg } from '../utils/trackSvgMapper';

export default function CircuitSelector({
  years = [2024, 2023, 2022, 2021, 2020, 2019, 2018],
  selectedYear = 2023,
  onSelectYear,
  circuits = [],
  selectedCircuit,
  onSelectCircuit,
  drivers = [],
  selectedDriver,
  onSelectDriver,
  loadingTelemetry,
  onOpenAuthModal,
  authStatus
}) {

  return (
    <div className="f1-panel">
      <div className="panel-header">
        <div className="panel-title">
          <Compass size={18} color="#e10600" />
          <span>Circuit & Season</span>
        </div>
        {loadingTelemetry && (
          <RefreshCw size={15} className="animate-spin" color="#00f0ff" />
        )}
      </div>

      <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* 1. Year Selection Dropdown (ABOVE Map / Circuit selection) */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 700 }}>
            <Calendar size={13} color="#38bdf8" />
            <span>Select Season / Year</span>
          </label>
          <select
            className="f1-select"
            value={selectedYear || 2023}
            onChange={(e) => onSelectYear(Number(e.target.value))}
            disabled={loadingTelemetry}
            style={{ fontWeight: 600, borderColor: '#38bdf8' }}
          >
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr} Championship Season {yr === 2023 ? '★ 22 Circuits' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Circuit / Map Selection Dropdown (BELOW Year selection) */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
            <Map size={13} color="#e10600" />
            <span>Select Circuit ({circuits.length} rounds)</span>
          </label>
          <select
            className="f1-select"
            value={selectedCircuit?.id || ''}
            onChange={(e) => {
              const found = circuits.find(c => c.id === e.target.value);
              if (found) onSelectCircuit(found);
            }}
            disabled={loadingTelemetry || !circuits.length}
          >
            {circuits.map((c) => (
              <option key={c.id} value={c.id}>
                {c.display_label}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Driver Selection Dropdown */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
            <User size={13} color="#e10600" />
            <span>Driver (Qualifying Lap)</span>
          </label>
          <select
            className="f1-select"
            value={selectedDriver}
            onChange={(e) => onSelectDriver(e.target.value)}
            disabled={loadingTelemetry || !drivers.length}
          >
            <option value="">Fastest Lap (Pole-sitter)</option>
            {drivers.map((drv) => (
              <option key={drv.code} value={drv.code}>
                {drv.full_name} ({drv.code}) — {drv.lap_time}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Selected Circuit Card & Track Outline Preview */}
        {selectedCircuit && (
          <div style={{
            background: '#0d0f17',
            border: '1px solid var(--f1-border)',
            borderRadius: '8px',
            padding: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.2 }}>
                  {selectedCircuit.name}
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {selectedCircuit.location}, {selectedCircuit.country}
                </p>
              </div>
              <span style={{
                background: 'rgba(225, 6, 0, 0.15)',
                color: '#ff4d4d',
                border: '1px solid rgba(225, 6, 0, 0.3)',
                padding: '0.1rem 0.4rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: 700
              }}>
                R{selectedCircuit.round_number}
              </span>
            </div>

            {/* Circuit Outline Image */}
            <div style={{
              background: 'radial-gradient(circle, #1a1e2d 0%, #0c0e15 80%)',
              border: '1px solid #232738',
              borderRadius: '6px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '180px',
              position: 'relative'
            }}>
              <img
                src={getTrackSvg(selectedCircuit)}
                alt={selectedCircuit.name}
                style={{
                  maxHeight: '150px',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 12px rgba(225, 6, 0, 0.45))'
                }}
              />
              <span style={{
                position: 'absolute',
                bottom: '4px',
                right: '8px',
                fontSize: '0.62rem',
                color: '#64748b',
                fontFamily: 'monospace'
              }}>
                CIRCUIT OUTLINE
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8' }}>
              <span>Season: <strong>{selectedYear}</strong></span>
              <span>Session: <strong>Qualifying (Q)</strong></span>
            </div>
          </div>
        )}

        {/* F1 API Authentication Pill */}
        <button
          onClick={onOpenAuthModal}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px dashed #334155',
            borderRadius: '6px',
            padding: '0.5rem 0.75rem',
            color: '#94a3b8',
            fontSize: '0.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'background 0.2s'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Key size={13} color="#facc15" />
            <span>F1 Live Timing Auth</span>
          </div>
          <span style={{
            color: authStatus?.is_authenticated ? '#34d399' : '#94a3b8',
            fontSize: '0.7rem',
            fontWeight: 600
          }}>
            {authStatus?.is_authenticated ? '● Active' : 'Setup Guide ›'}
          </span>
        </button>
      </div>
    </div>
  );
}
