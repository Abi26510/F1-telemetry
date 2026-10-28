import urllib.request
import json

url = "https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/circuits.json"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    circuits_data = json.loads(resp.read().decode('utf-8'))

print(f"Total circuits: {len(circuits_data)}")
circuit_map = {}
for c in circuits_data:
    cid = c['id']
    name = c['name']
    # The latest layout is usually the last one in the layouts array
    latest_layout = c['layouts'][-1]
    layout_id = latest_layout['layoutId']
    seasons = latest_layout.get('seasons', '')
    circuit_map[cid] = {
        'name': name,
        'layout_id': layout_id,
        'seasons': seasons,
        'country': c.get('countryId', '')
    }

print("\nAll circuits in repository:")
for cid, info in sorted(circuit_map.items()):
    print(f"  {cid:20s} -> {info['layout_id']:25s} ({info['name']}) [{info['seasons']}]")
