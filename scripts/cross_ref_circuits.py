import urllib.request
import json
import os

url = "https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/circuits.json"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    circuits_data = json.loads(resp.read().decode('utf-8'))

repo_circuits = {c['id']: c for c in circuits_data}

# Our existing 78 SVG files
existing_files = [f for f in os.listdir("frontend/public/track_svgs") if f.endswith(".svg")]
print(f"Existing SVG files count: {len(existing_files)}")
print(f"Repo circuits count: {len(repo_circuits)}")

# Check mapping from our filenames (strip .svg) to repo IDs
# Let's inspect differences:
direct_matches = []
unmatched = []

alias_map = {
    "abudhabi": "yas-marina",
    "austria": "spielberg",
    "barcelona": "catalunya",
    "charade": "clermont-ferrand",
    "cota": "austin",
    "hockenheim": "hockenheimring",
    "india": "buddh",
    "korea": "yeongam",
    "lasvegas": "las-vegas",
    "le-mans": "bugatti",
    "mexico": "mexico-city",
    "paulricard": "paul-ricard",
    "prince-george": "east-london",
    "singapore": "marina-bay",
    "spa": "spa-francorchamps",
    "boavista": "porto",
    "f1-generic": None
}

for f in existing_files:
    stem = f.replace(".svg", "")
    target_id = alias_map.get(stem, stem)
    if target_id is None:
        continue
    if target_id in repo_circuits:
        direct_matches.append((stem, target_id))
    else:
        unmatched.append((stem, target_id))

print(f"Direct/Aliased matches: {len(direct_matches)}")
print(f"Unmatched: {len(unmatched)}")
if unmatched:
    print("Unmatched items:", unmatched)
