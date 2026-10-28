import React, { useState, useEffect } from 'react';
import { fetchNextRace, fetchYears, fetchCircuits, fetchTelemetrySpeedMap, fetchAuthStatus } from './services/api';
import CountdownBanner from './components/CountdownBanner';
import CircuitSelector from './components/CircuitSelector';
import TelemetryViewer from './components/TelemetryViewer';
import SectorComparison from './components/SectorComparison';
import WeatherCard from './components/WeatherCard';
import AuthModal from './components/AuthModal';
import { AlertCircle, RefreshCw, Key } from 'lucide-react';

export default function App() {
  const [years, setYears] = useState([2024, 2023, 2022, 2021, 2020, 2019, 2018]);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [circuits, setCircuits] = useState([]);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [telemetry, setTelemetry] = useState(null);
  const [nextRace, setNextRace] = useState(null);
  const [authStatus, setAuthStatus] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [loadingCircuits, setLoadingCircuits] = useState(true);
  const [loadingTelemetry, setLoadingTelemetry] = useState(false);
  const [error, setError] = useState(null);

  // 1. Initial Load: Years, Auth Status, Next Race & 2023 Circuits
  useEffect(() => {
    async function init() {
      // Fetch Next Race Countdown
      try {
        const raceData = await fetchNextRace();
        setNextRace(raceData);
      } catch (err) {
        console.warn('Next race fetch notice:', err.message);
      } finally {
        setLoadingSchedule(false);
      }

      // Fetch Auth Status
      try {
        const auth = await fetchAuthStatus();
        setAuthStatus(auth);
      } catch (e) {}

      // Fetch Available Seasons (2018-2024, 2025 removed)
      try {
        const yearsList = await fetchYears();
        setYears(yearsList);
      } catch (e) {}

      // Load initial circuits for 2023 (all 22 circuits)
      await loadCircuitsForYear(2023);
    }

    init();
  }, []);

  // Helper: load circuits for a specific year
  const loadCircuitsForYear = async (yr) => {
    setLoadingCircuits(true);
    setError(null);
    try {
      const circuitList = await fetchCircuits(yr);
      setCircuits(circuitList);
      if (circuitList.length > 0) {
        const initialCircuit = circuitList[0];
        setSelectedCircuit(initialCircuit);
        setSelectedDriver('');
        await loadTelemetryData(yr, initialCircuit, '');
      } else {
        setSelectedCircuit(null);
        setTelemetry(null);
      }
    } catch (err) {
      setError(`Failed to load circuits for season ${yr}`);
    } finally {
      setLoadingCircuits(false);
    }
  };

  // 2. Fetch Telemetry for year, circuit and driver
  const loadTelemetryData = async (yr, circuit, driverCode) => {
    if (!circuit) return;
    setLoadingTelemetry(true);
    setError(null);
    try {
      const data = await fetchTelemetrySpeedMap({
        year: yr || circuit.year,
        gp: circuit.round_number || circuit.location || circuit.name,
        sessionType: circuit.session_type || 'Q',
        driver: driverCode
      });
      setTelemetry(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error generating speed telemetry map');
    } finally {
      setLoadingTelemetry(false);
    }
  };

  // Handler: Year selection changed
  const handleYearChange = (newYear) => {
    setSelectedYear(newYear);
    loadCircuitsForYear(newYear);
  };

  // Handler: Circuit selection changed
  const handleCircuitChange = (circuit) => {
    setSelectedCircuit(circuit);
    setSelectedDriver('');
    loadTelemetryData(selectedYear, circuit, '');
  };

  // Handler: Driver selection changed
  const handleDriverChange = (driverCode) => {
    setSelectedDriver(driverCode);
    if (selectedCircuit) {
      loadTelemetryData(selectedYear, selectedCircuit, driverCode);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header with Brand and Top-Middle Countdown */}
      <header className="header-container">
        <div className="header-brand">
          <span className="f1-badge">F1</span>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#fff' }}>
              Circuit Mapping & Speed Visualiser
            </h1>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>2023 Season Records & All Host Circuits</p>
          </div>
        </div>

        {/* Top Middle Countdown */}
        <CountdownBanner nextRace={nextRace} loading={loadingSchedule} />

        {/* Top Right Auth Quick Pill */}
        <div style={{ position: 'absolute', right: '1.5rem', top: '1.25rem' }}>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            style={{
              background: authStatus?.is_authenticated ? 'rgba(16, 185, 129, 0.15)' : 'rgba(234, 179, 8, 0.15)',
              border: `1px solid ${authStatus?.is_authenticated ? 'rgba(16, 185, 129, 0.4)' : 'rgba(234, 179, 8, 0.4)'}`,
              color: authStatus?.is_authenticated ? '#34d399' : '#facc15',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Key size={13} />
            <span>{authStatus?.is_authenticated ? 'F1 Live API Connected' : 'F1 Auth Guide'}</span>
          </button>
        </div>
      </header>

      {/* Error notification banner if any */}
      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          borderBottom: '1px solid #ef4444',
          color: '#fca5a5',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.85rem'
        }}>
          <AlertCircle size={18} color="#ef4444" />
          <span>{error}</span>
          <button
            onClick={() => loadTelemetryData(selectedYear, selectedCircuit, selectedDriver)}
            style={{
              marginLeft: 'auto',
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <RefreshCw size={12} /> Retry
          </button>
        </div>
      )}

      {/* Notice if benchmark mode is active */}
      {telemetry?.auth_notice && (
        <div style={{
          background: 'rgba(56, 189, 248, 0.08)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
          color: '#bae6fd',
          padding: '0.45rem 1.5rem',
          fontSize: '0.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>ℹ️ {telemetry.auth_notice}</span>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#38bdf8',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          >
            Setup Instructions ›
          </button>
        </div>
      )}

      {/* MAIN DASHBOARD LAYOUT */}
      <main className="app-layout-main">
        {/* LEFT COLUMN: Circuit Selection (Year on top -> Circuit -> Driver -> Track Outline) */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <CircuitSelector
            years={years}
            selectedYear={selectedYear}
            onSelectYear={handleYearChange}
            circuits={circuits}
            selectedCircuit={selectedCircuit}
            onSelectCircuit={handleCircuitChange}
            drivers={telemetry?.available_drivers || []}
            selectedDriver={selectedDriver}
            onSelectDriver={handleDriverChange}
            loadingTelemetry={loadingTelemetry}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            authStatus={authStatus}
          />
        </section>

        {/* RIGHT AREA: Speed Visualisation Panel on Top, Timing & Weather side-by-side Below */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* 1. Speed Visualisation Panel (Driver Banner, Lap Time, Speed Stats & Track Map) */}
          <TelemetryViewer
            telemetry={telemetry}
            loading={loadingTelemetry}
          />

          {/* 2. Side-by-Side Row: Sector Timing Breakdown on Left, Session Weather on the Right */}
          {(telemetry || loadingTelemetry) && (
            <div className="timing-weather-row">
              {/* Sector Timing Breakdown Panel */}
              <SectorComparison
                sectorBreakdown={telemetry?.sector_breakdown}
                driverName={telemetry?.driver_name}
                loading={loadingTelemetry}
              />

              {/* Session Weather Condition Panel (to the right side of timing breakdown panel) */}
              <WeatherCard
                weather={telemetry?.weather}
                loading={loadingTelemetry}
              />
            </div>
          )}
        </section>
      </main>

      {/* Auth Instructions Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        authStatus={authStatus}
      />

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--f1-border)',
        padding: '1.25rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#64748b'
      }}>
        Formula 1 Speed & Coordinate Telemetry Visualiser • FastF1 & Matplotlib • 2023 Season Championship Records (All 22 Circuits)
      </footer>
    </div>
  );
}
