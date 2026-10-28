import urllib.request
import json

url = "https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/circuits.json"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    circuits_data = json.loads(resp.read().decode('utf-8'))

for c in circuits_data:
    if c['id'] in ['bahrain', 'silverstone', 'monza', 'spa-francorchamps', 'yas-marina']:
        print(f"=== {c['id']} ===")
        for lay in c['layouts']:
            print("  ", lay)
