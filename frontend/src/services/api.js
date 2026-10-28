function resolveApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (!envUrl || typeof envUrl !== 'string' || !envUrl.trim() || envUrl.trim() === '/') {
    // If running in development vs production
    if (import.meta.env.DEV) {
      return 'http://127.0.0.1:8000/api/v1';
    }
    // In production on Vercel when VITE_API_BASE_URL is not set, fallback to /api/v1
    return '/api/v1';
  }

  let sanitized = envUrl.trim().replace(/\/+$/, ''); // Strip all trailing slashes

  // If user provided root Render URL without /api/v1 (e.g. https://f1-api.onrender.com)
  if (!sanitized.endsWith('/api/v1')) {
    sanitized = `${sanitized}/api/v1`;
  }
  return sanitized;
}

const API_BASE_URL = resolveApiBaseUrl();

/**
 * Builds a clean URL ensuring exactly one slash between API_BASE_URL and path,
 * avoiding any double-slash issues (e.g. "//auth/login").
 */
function buildApiUrl(path, queryParams = null) {
  const cleanPath = path.replace(/^\/+/, '');
  const base = API_BASE_URL.replace(/\/+$/, '');
  const urlString = `${base}/${cleanPath}`;

  if (!queryParams) {
    return urlString;
  }

  const searchParams = new URLSearchParams();
  for (const [key, val] of Object.entries(queryParams)) {
    if (val !== undefined && val !== null && val !== '') {
      searchParams.append(key, val);
    }
  }
  const qs = searchParams.toString();
  return qs ? `${urlString}?${qs}` : urlString;
}

export async function fetchNextRace() {
  const res = await fetch(buildApiUrl('/schedule/next'));
  if (!res.ok) {
    throw new Error(`Failed to load upcoming race: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchYears() {
  const res = await fetch(buildApiUrl('/years'));
  if (!res.ok) {
    return [2024, 2023, 2022, 2021, 2020, 2019, 2018];
  }
  return res.json();
}

export async function fetchCircuits(year = 2023) {
  const url = buildApiUrl('/circuits', year ? { year } : null);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load circuits: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchAuthStatus() {
  try {
    const res = await fetch(buildApiUrl('/auth/status'));
    if (!res.ok) return { is_authenticated: false };
    return res.json();
  } catch {
    return { is_authenticated: false };
  }
}

export async function loginF1({ username, password }) {
  const res = await fetch(buildApiUrl('/auth/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Sign-in failed. Please check your credentials.');
  }
  return res.json();
}

export async function logoutF1() {
  const res = await fetch(buildApiUrl('/auth/logout'), {
    method: 'POST'
  });
  if (!res.ok) {
    throw new Error('Failed to disconnect Formula 1 account.');
  }
  return res.json();
}

export async function fetchTelemetrySpeedMap({ year = 2023, gp = '1', sessionType = 'Q', driver = '' }) {
  const url = buildApiUrl('/telemetry/speed-map', {
    year: year.toString(),
    gp: gp.toString(),
    session_type: sessionType,
    driver: driver || undefined
  });

  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Failed to load telemetry speed map (${res.status})`);
  }
  return res.json();
}
