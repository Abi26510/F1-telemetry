import urllib.request
import json
import os

url = "https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/circuits.json"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    circuits_data = json.loads(resp.read().decode('utf-8'))

print(f"Total circuits in MisterSix2295 repo: {len(circuits_data)}")
print("Type of data:", type(circuits_data))

if isinstance(circuits_data, list):
    for i in range(min(5, len(circuits_data))):
        print(f"Sample [{i}]:", circuits_data[i])
elif isinstance(circuits_data, dict):
    for k in list(circuits_data.keys())[:5]:
        print(f"Key '{k}':", circuits_data[k])
