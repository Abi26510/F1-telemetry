import urllib.request
import json

urls_to_try = [
    "https://raw.githubusercontent.com/MisterSix2295/f1-circuits-svg/main/circuits.json",
    "https://raw.githubusercontent.com/MisterSix2295/f1-circuits-svg/master/circuits.json",
    "https://raw.githubusercontent.com/bacinger/f1-circuits/master/f1-circuits.geojson"
]

for url in urls_to_try:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            print(f"SUCCESS {url} - {len(data)} bytes")
            if url.endswith(".json"):
                parsed = json.loads(data)
                print(f"Parsed keys/count: {len(parsed) if isinstance(parsed, (list, dict)) else type(parsed)}")
                if isinstance(parsed, list) and len(parsed) > 0:
                    print("Sample item:", parsed[0])
                elif isinstance(parsed, dict) and len(parsed) > 0:
                    first_key = list(parsed.keys())[0]
                    print(f"Sample key '{first_key}':", parsed[first_key])
            elif url.endswith(".geojson"):
                parsed = json.loads(data)
                print(f"GeoJSON features count: {len(parsed.get('features', []))}")
                if parsed.get('features'):
                    print("Sample feature properties:", parsed['features'][0].get('properties'))
    except Exception as e:
        print(f"FAILED {url}: {e}")
