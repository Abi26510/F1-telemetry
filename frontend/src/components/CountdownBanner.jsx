import React, { useState, useEffect } from 'react';
import { Flag, MapPin, Calendar, Clock } from 'lucide-react';

export default function CountdownBanner({ nextRace, loading }) {
  const [timeLeft, setTimeLeft] = useState({
    days: nextRace?.days_left || 0,
    hours: nextRace?.hours_left || 0,
    minutes: nextRace?.minutes_left || 0,
    seconds: nextRace?.seconds_left || 0,
  });

  useEffect(() => {
    if (!nextRace?.target_timestamp_utc) return;

    const target = new Date(nextRace.target_timestamp_utc).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [nextRace?.target_timestamp_utc]);

  if (loading) {
    return (
      <div className="countdown-box" style={{ opacity: 0.6 }}>
        <Clock className="animate-spin" size={18} color="#e10600" />
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Loading race schedule...</span>
      </div>
    );
  }

  if (!nextRace) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
        <MapPin size={14} color="#e10600" />
        <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{nextRace.event_name}</span>
        <span>•</span>
        <span>{nextRace.location}, {nextRace.country}</span>
      </div>

      <div className="countdown-box">
        <div className="countdown-segment">
          <span className="countdown-num">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="countdown-label">Days</span>
        </div>
        <span className="countdown-sep">:</span>
        <div className="countdown-segment">
          <span className="countdown-num">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <span className="countdown-sep">:</span>
        <div className="countdown-segment">
          <span className="countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="countdown-label">Mins</span>
        </div>
        <span className="countdown-sep">:</span>
        <div className="countdown-segment">
          <span className="countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="countdown-label">Secs</span>
        </div>
      </div>
    </div>
  );
}
