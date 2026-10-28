import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.app.services.f1_service import authenticate_f1, logout_f1, get_auth_status

print("1. Initial Auth Status:")
s1 = get_auth_status()
print(f"   is_authenticated: {s1.is_authenticated}, username: {s1.username}")

print("\n2. Test Empty Login Attempt:")
res_empty = authenticate_f1("", "")
print(f"   success: {res_empty.success}, msg: {res_empty.message}")
assert res_empty.success is False

print("\n3. Test Valid Format Login (simulated or real F1 account):")
res_login = authenticate_f1("test_f1_user@example.com", "password123")
print(f"   success: {res_login.success}, is_authenticated: {res_login.is_authenticated}, msg: {res_login.message}")

print("\n4. Auth Status After Login:")
s2 = get_auth_status()
print(f"   is_authenticated: {s2.is_authenticated}, username: {s2.username}")
assert s2.is_authenticated is True

print("\n5. Test Logout:")
s3 = logout_f1()
print(f"   is_authenticated: {s3.is_authenticated}, msg: {s3.message}")
assert s3.is_authenticated is False

print("\nALL AUTH SERVICE TESTS PASSED!")
