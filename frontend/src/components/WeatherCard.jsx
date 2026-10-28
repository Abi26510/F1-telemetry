import React from 'react';
import { CloudRain, Thermometer, Wind, Droplets, Sun, Gauge, Activity } from 'lucide-react';

export default function WeatherCard({ weather, loading }) {
  // 1. Loading State Animation matching Speed Visualisation panel
  if (loading) {
    return (
      <div className="f1-panel" style={{ minHeight: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <Activity size={36} className="animate-spin" color="#e10600" />
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f1f5f9' }}>Reading Session Weather</h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Fetching track temperatures, wind vectors & precipitation...</p>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const isRain = weather.rainfall;

  return (
    <div className="f1-panel">
      <div className="panel-header">
        <div className="panel-title">
          <Sun size={18} color="#ffb703" />
          <span>Session Weather Conditions</span>
        </div>
        <span
          className={isRain ? 'badge-yellow' : 'badge-green'}
          style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}
        >
          {isRain ? 'WET TRACK' : 'DRY TRACK'}
        </span>
      </div>

      <div className="panel-body">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.75rem'
        }}>
          {/* Air Temp */}
          <div style={{ background: '#0d0f17', border: '1px solid var(--f1-border)', borderRadius: '6px', padding: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.75rem' }}>
              <Thermometer size={14} color="#38bdf8" />
              <span>AIR TEMP</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem', fontFamily: 'monospace' }}>
              {weather.air_temp !== null ? `${weather.air_temp} °C` : 'N/A'}
            </div>
          </div>

          {/* Track Temp */}
          <div style={{ background: '#0d0f17', border: '1px solid var(--f1-border)', borderRadius: '6px', padding: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.75rem' }}>
              <Thermometer size={14} color="#f97316" />
              <span>TRACK TEMP</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem', fontFamily: 'monospace' }}>
              {weather.track_temp !== null ? `${weather.track_temp} °C` : 'N/A'}
            </div>
          </div>

          {/* Humidity */}
          <div style={{ background: '#0d0f17', border: '1px solid var(--f1-border)', borderRadius: '6px', padding: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.75rem' }}>
              <Droplets size={14} color="#00f0ff" />
              <span>HUMIDITY</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem', fontFamily: 'monospace' }}>
              {weather.humidity !== null ? `${weather.humidity} %` : 'N/A'}
            </div>
          </div>

          {/* Wind */}
          <div style={{ background: '#0d0f17', border: '1px solid var(--f1-border)', borderRadius: '6px', padding: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.75rem' }}>
              <Wind size={14} color="#a855f7" />
              <span>WIND SPEED</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem', fontFamily: 'monospace' }}>
              {weather.wind_speed !== null ? `${weather.wind_speed} m/s` : 'N/A'}
            </div>
          </div>

          {/* Rain status */}
          <div style={{ background: '#0d0f17', border: '1px solid var(--f1-border)', borderRadius: '6px', padding: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.75rem' }}>
              <CloudRain size={14} color={isRain ? "#ef4444" : "#10b981"} />
              <span>PRECIPITATION</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: isRain ? '#ef4444' : '#10b981', marginTop: '0.2rem' }}>
              {isRain ? 'RAIN DETECTED' : 'DRY / CLEAR'}
            </div>
          </div>

          {/* Pressure */}
          <div style={{ background: '#0d0f17', border: '1px solid var(--f1-border)', borderRadius: '6px', padding: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.75rem' }}>
              <Gauge size={14} color="#eab308" />
              <span>AIR PRESSURE</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem', fontFamily: 'monospace' }}>
              {weather.pressure !== null ? `${weather.pressure} mbar` : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
