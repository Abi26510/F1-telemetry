import React from 'react';
import { Gauge, Zap, Disc, Activity, User, Award, Timer } from 'lucide-react';

export default function TelemetryViewer({ telemetry, loading }) {
  if (loading) {
    return (
      <div className="f1-panel" style={{ minHeight: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <Activity size={36} className="animate-spin" color="#e10600" />
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f1f5f9' }}>Analyzing FastF1 Telemetry</h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Extracting GPS positional coordinates, car speed, and braking zones...</p>
        </div>
      </div>
    );
  }

  if (!telemetry) {
    return (
      <div className="f1-panel" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#94a3b8' }}>Select a circuit to view telemetry and speed visualisation.</p>
      </div>
    );
  }

  const {
    driver_name,
    driver_code,
    driver_number,
    team_name,
    lap_time,
    grand_prix,
    circuit_name,
    telemetry_stats,
    map_image_data_uri
  } = telemetry;

  return (
    <div className="f1-panel">
      {/* Top Header with Driver & Lap Time Overview */}
      <div className="panel-header" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'var(--f1-red)',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.1rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '4px',
            fontFamily: 'monospace'
          }}>
            #{driver_number}
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
              {driver_name} <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>({driver_code})</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#38bdf8' }}>{team_name}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block' }}>
              Lap Time
            </span>
            <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#a855f7', fontFamily: 'monospace' }}>
              {lap_time}
            </span>
          </div>
        </div>
      </div>

      <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Speed Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0.75rem'
        }}>
          <div style={{ background: '#0e1017', border: '1px solid var(--f1-border)', borderRadius: '6px', padding: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#00f0ff', fontSize: '0.75rem', fontWeight: 600 }}>
              <Zap size={14} />
              <span>TOP SPEED</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem', fontFamily: 'monospace' }}>
              {telemetry_stats.max_speed_kmh} <span style={{ fontSize: '0.8rem', color: '#64748b' }}>km/h</span>
            </div>
          </div>

          <div style={{ background: '#0e1017', border: '1px solid var(--f1-border)', borderRadius: '6px', padding: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#eab308', fontSize: '0.75rem', fontWeight: 600 }}>
              <Gauge size={14} />
              <span>MIN SPEED</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem', fontFamily: 'monospace' }}>
              {telemetry_stats.min_speed_kmh} <span style={{ fontSize: '0.8rem', color: '#64748b' }}>km/h</span>
            </div>
          </div>

          <div style={{ background: '#0e1017', border: '1px solid var(--f1-border)', borderRadius: '6px', padding: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.75rem', fontWeight: 600 }}>
              <Activity size={14} />
              <span>AVG SPEED</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem', fontFamily: 'monospace' }}>
              {telemetry_stats.avg_speed_kmh} <span style={{ fontSize: '0.8rem', color: '#64748b' }}>km/h</span>
            </div>
          </div>

          <div style={{ background: '#0e1017', border: '1px solid var(--f1-border)', borderRadius: '6px', padding: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontSize: '0.75rem', fontWeight: 600 }}>
              <Disc size={14} />
              <span>BRAKING LOAD</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem', fontFamily: 'monospace' }}>
              {telemetry_stats.braking_percentage}% <span style={{ fontSize: '0.8rem', color: '#64748b' }}>of lap</span>
            </div>
          </div>
        </div>

        {/* Speed Map Visualisation Image */}
        <div style={{
          background: '#090a0f',
          border: '1px solid var(--f1-border)',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          <img
            src={map_image_data_uri}
            alt={`${grand_prix} Speed Map`}
            style={{
              width: '100%',
              maxHeight: '480px',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>
      </div>
    </div>
  );
}
