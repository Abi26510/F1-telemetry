import React from 'react';
import { Timer, Flame, Activity, Award } from 'lucide-react';

export default function SectorComparison({ sectorBreakdown, driverName, loading }) {
  // 1. Loading State Animation matching Speed Visualisation panel
  if (loading) {
    return (
      <div className="f1-panel" style={{ minHeight: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <Activity size={36} className="animate-spin" color="#e10600" />
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f1f5f9' }}>Analyzing Sector Timings</h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Calculating individual sector records, purple micro-sectors & driver deltas...</p>
        </div>
      </div>
    );
  }

  if (!sectorBreakdown) return null;

  const {
    driver_sectors,
    purple_sectors,
    fastest_driver_sectors,
    delta_s1,
    delta_s2,
    delta_s3,
    fastest_driver_name,
    s1_record_holder,
    s2_record_holder,
    s3_record_holder
  } = sectorBreakdown;

  // Format colon time string without any "Colon: " label
  const formatColon = (str) => {
    if (!str || str === 'N/A') return 'N/A';
    return str.replace('.', ':');
  };

  return (
    <div className="f1-panel">
      <div className="panel-header">
        <div className="panel-title">
          <Timer size={18} color="#9d4edd" />
          <span>Sector Timing Breakdown</span>
        </div>
        {driverName && (
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Driver: <strong style={{ color: '#fff' }}>{driverName}</strong>
          </span>
        )}
      </div>

      <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Table / Grid for 3 Sectors */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {/* Sector 1 */}
          <div style={{
            background: '#0d0f17',
            border: '1px solid var(--f1-border)',
            borderRadius: '6px',
            padding: '0.85rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Sector 1
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', margin: '0.35rem 0', fontFamily: 'monospace' }}>
                {formatColon(driver_sectors.sector_1)}
              </div>
              <div>
                <span className={delta_s1?.includes('PURPLE') ? 'badge-purple' : 'badge-yellow'} style={{ fontSize: '0.7rem' }}>
                  {delta_s1}
                </span>
              </div>
            </div>

            {/* Individual Sector Record Holder */}
            <div style={{
              marginTop: '0.65rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.15rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', fontSize: '0.7rem', color: '#c084fc', fontWeight: 600 }}>
                <Award size={12} color="#c084fc" />
                <span>Fastest: {formatColon(purple_sectors.sector_1)}</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {s1_record_holder || fastest_driver_name || 'Fastest Record'}
              </div>
            </div>
          </div>

          {/* Sector 2 */}
          <div style={{
            background: '#0d0f17',
            border: '1px solid var(--f1-border)',
            borderRadius: '6px',
            padding: '0.85rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Sector 2
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', margin: '0.35rem 0', fontFamily: 'monospace' }}>
                {formatColon(driver_sectors.sector_2)}
              </div>
              <div>
                <span className={delta_s2?.includes('PURPLE') ? 'badge-purple' : 'badge-yellow'} style={{ fontSize: '0.7rem' }}>
                  {delta_s2}
                </span>
              </div>
            </div>

            {/* Individual Sector Record Holder */}
            <div style={{
              marginTop: '0.65rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.15rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', fontSize: '0.7rem', color: '#c084fc', fontWeight: 600 }}>
                <Award size={12} color="#c084fc" />
                <span>Fastest: {formatColon(purple_sectors.sector_2)}</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {s2_record_holder || fastest_driver_name || 'Fastest Record'}
              </div>
            </div>
          </div>

          {/* Sector 3 */}
          <div style={{
            background: '#0d0f17',
            border: '1px solid var(--f1-border)',
            borderRadius: '6px',
            padding: '0.85rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Sector 3
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', margin: '0.35rem 0', fontFamily: 'monospace' }}>
                {formatColon(driver_sectors.sector_3)}
              </div>
              <div>
                <span className={delta_s3?.includes('PURPLE') ? 'badge-purple' : 'badge-yellow'} style={{ fontSize: '0.7rem' }}>
                  {delta_s3}
                </span>
              </div>
            </div>

            {/* Individual Sector Record Holder */}
            <div style={{
              marginTop: '0.65rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.15rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', fontSize: '0.7rem', color: '#c084fc', fontWeight: 600 }}>
                <Award size={12} color="#c084fc" />
                <span>Fastest: {formatColon(purple_sectors.sector_3)}</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {s3_record_holder || fastest_driver_name || 'Fastest Record'}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparisons Card */}
        <div style={{
          background: '#11131c',
          border: '1px solid var(--f1-border)',
          borderRadius: '6px',
          padding: '0.9rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {/* Fastest Driver Sectors */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Flame size={15} color="#e10600" />
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0' }}>
                Time per sectors for fastest driver {fastest_driver_name ? `(${fastest_driver_name})` : ''}:
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
              <span style={{ color: '#cbd5e1' }}>S1: <strong style={{ color: '#fff' }}>{formatColon(fastest_driver_sectors?.sector_1 || driver_sectors.sector_1)}</strong></span>
              <span style={{ color: '#64748b' }}>•</span>
              <span style={{ color: '#cbd5e1' }}>S2: <strong style={{ color: '#fff' }}>{formatColon(fastest_driver_sectors?.sector_2 || driver_sectors.sector_2)}</strong></span>
              <span style={{ color: '#64748b' }}>•</span>
              <span style={{ color: '#cbd5e1' }}>S3: <strong style={{ color: '#fff' }}>{formatColon(fastest_driver_sectors?.sector_3 || driver_sectors.sector_3)}</strong></span>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--f1-border)' }} />

          {/* Theoretical Best Purple Sectors with individual record holders */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#9d4edd' }} />
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#c084fc' }}>
                Time per sectors for fastest individual sectors (Purple records):
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', fontFamily: 'monospace', fontSize: '0.85rem', flexWrap: 'wrap' }}>
              <span style={{ color: '#e9d5ff' }}>
                S1: <strong style={{ color: '#fff' }}>{formatColon(purple_sectors.sector_1)}</strong>
                {s1_record_holder && <span style={{ color: '#38bdf8', fontSize: '0.75rem', marginLeft: '0.25rem' }}>({s1_record_holder})</span>}
              </span>
              <span style={{ color: '#64748b' }}>•</span>
              <span style={{ color: '#e9d5ff' }}>
                S2: <strong style={{ color: '#fff' }}>{formatColon(purple_sectors.sector_2)}</strong>
                {s2_record_holder && <span style={{ color: '#38bdf8', fontSize: '0.75rem', marginLeft: '0.25rem' }}>({s2_record_holder})</span>}
              </span>
              <span style={{ color: '#64748b' }}>•</span>
              <span style={{ color: '#e9d5ff' }}>
                S3: <strong style={{ color: '#fff' }}>{formatColon(purple_sectors.sector_3)}</strong>
                {s3_record_holder && <span style={{ color: '#38bdf8', fontSize: '0.75rem', marginLeft: '0.25rem' }}>({s3_record_holder})</span>}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
