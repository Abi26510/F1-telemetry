const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export async function fetchNextRace() {
  const res = await fetch(`${API_BASE_URL}/schedule/next`);
  if (!res.ok) {
    throw new Error(`Failed to load upcoming race: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchYears() {
  const res = await fetch(`${API_BASE_URL}/years`);
  if (!res.ok) {
    return [2024, 2023, 2022, 2021, 2020, 2019, 2018];
  }
  return res.json();
}

export async function fetchCircuits(year = 2023) {
  const url = year ? `${API_BASE_URL}/circuits?year=${year}` : `${API_BASE_URL}/circuits`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load circuits: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchAuthStatus() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/status`);
    if (!res.ok) return { is_authenticated: false };
    return res.json();
  } catch {
    return { is_authenticated: false };
  }
}

export async function fetchTelemetrySpeedMap({ year = 2023, gp = '1', sessionType = 'Q', driver = '' }) {
  const params = new URLSearchParams({
    year: year.toString(),
    gp: gp.toString(),
    session_type: sessionType
  });
  if (driver) {
    params.append('driver', driver);
  }

  const res = await fetch(`${API_BASE_URL}/telemetry/speed-map?${params.toString()}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Failed to load telemetry speed map (${res.status})`);
  }
  return res.json();
}
