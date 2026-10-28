from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

tests = [
    ('POST', '//auth/login', {'username': 'test@example.com', 'password': 'pw'}),
    ('POST', '/auth/login', {'username': 'test@example.com', 'password': 'pw'}),
    ('POST', '/api/v1/auth/login', {'username': 'test@example.com', 'password': 'pw'}),
    ('POST', '//api/v1/auth/login/', {'username': 'test@example.com', 'password': 'pw'}),
    ('GET', '//auth/status', None),
    ('GET', '/auth/status', None),
    ('GET', '/api/v1/auth/status', None),
    ('GET', '//schedule/next', None),
    ('GET', '/schedule/next', None),
    ('GET', '/api/v1/schedule/next', None),
    ('GET', '//circuits?year=2023', None),
    ('GET', '/api/v1/circuits?year=2023', None),
    ('GET', '/', None),
    ('GET', '/health', None),
    ('GET', '//health/', None),
]

passed = 0
for method, path, data in tests:
    url = f'http://testserver{path}'
    if method == 'POST':
        r = client.post(url, json=data)
    else:
        r = client.get(url)
    status = r.status_code
    is_ok = (200 <= status < 300)
    if is_ok:
        passed += 1
    tag = "PASS" if is_ok else "FAIL"
    print(f"[{method}] {path:<30} -> {status} [{tag}]")

print(f"\nTotal passed: {passed}/{len(tests)}")
if passed != len(tests):
    raise SystemExit(1)
print("All deployment route test cases passed successfully!")
