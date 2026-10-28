import os
import json
import re
import urllib.request

SVG_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "track_svgs"))
os.makedirs(SVG_DIR, exist_ok=True)

# 1. Fetch circuits.json from repository
circuits_json_url = "https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/circuits.json"
req = urllib.request.Request(circuits_json_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    circuits_data = json.loads(resp.read().decode('utf-8'))

repo_circuits = {c['id']: c for c in circuits_data}

# Mapping of our 78 filenames (without .svg) to repository circuit ID and preferred layout
# For modern circuits, we select the 2023/current Grand Prix layout
FILENAME_TO_REPO = {
    # 2023 Season Championship Circuits
    "bahrain": ("bahrain", "bahrain-1"),               # Sakhir Grand Prix Track
    "jeddah": ("jeddah", "jeddah-1"),                 # Jeddah Corniche
    "melbourne": ("melbourne", "melbourne-2"),         # Albert Park (modern faster layout)
    "baku": ("baku", "baku-1"),                       # Baku City Circuit
    "miami": ("miami", "miami-1"),                     # Miami Autodrome
    "monaco": ("monaco", "monaco-5"),                 # Circuit de Monaco
    "barcelona": ("catalunya", "catalunya-6"),         # Circuit de Barcelona-Catalunya (no chicane)
    "montreal": ("montreal", "montreal-6"),           # Circuit Gilles Villeneuve
    "austria": ("spielberg", "spielberg-3"),           # Red Bull Ring
    "silverstone": ("silverstone", "silverstone-8"),   # Silverstone Arena Circuit
    "hungaroring": ("hungaroring", "hungaroring-3"),   # Hungaroring
    "spa": ("spa-francorchamps", "spa-francorchamps-4"), # Spa-Francorchamps
    "zandvoort": ("zandvoort", "zandvoort-5"),         # Circuit Zandvoort (modern banked)
    "monza": ("monza", "monza-6"),                     # Autodromo Nazionale Monza
    "singapore": ("marina-bay", "marina-bay-4"),       # Marina Bay (modern 2023 layout)
    "suzuka": ("suzuka", "suzuka-2"),                 # Suzuka Figure-8 Circuit
    "lusail": ("lusail", "lusail-1"),                 # Lusail International Circuit
    "cota": ("austin", "austin-1"),                   # Circuit of the Americas
    "mexico": ("mexico-city", "mexico-city-3"),       # Autódromo Hermanos Rodríguez
    "interlagos": ("interlagos", "interlagos-2"),     # Autódromo José Carlos Pace
    "lasvegas": ("las-vegas", "las-vegas-1"),         # Las Vegas Strip Circuit
    "abudhabi": ("yas-marina", "yas-marina-2"),       # Yas Marina (modern fast hairpin)

    # Historic & Global Circuits
    "adelaide": ("adelaide", "adelaide-1"),
    "aida": ("aida", "aida-1"),
    "ain-diab": ("ain-diab", "ain-diab-1"),
    "aintree": ("aintree", "aintree-1"),
    "anderstorp": ("anderstorp", "anderstorp-1"),
    "avus": ("avus", "avus-1"),
    "boavista": ("porto", "porto-1"),
    "brands-hatch": ("brands-hatch", "brands-hatch-2"),
    "bremgarten": ("bremgarten", "bremgarten-1"),
    "buenos-aires": ("buenos-aires", "buenos-aires-4"),
    "caesars-palace": ("caesars-palace", "caesars-palace-1"),
    "charade": ("clermont-ferrand", "clermont-ferrand-1"),
    "dallas": ("dallas", "dallas-1"),
    "detroit": ("detroit", "detroit-2"),
    "dijon": ("dijon", "dijon-2"),
    "donington": ("donington", "donington-1"),
    "estoril": ("estoril", "estoril-2"),
    "fuji": ("fuji", "fuji-2"),
    "hockenheim": ("hockenheimring", "hockenheimring-4"),
    "imola": ("imola", "imola-3"),
    "india": ("buddh", "buddh-1"),
    "indianapolis": ("indianapolis", "indianapolis-2"),
    "istanbul": ("istanbul", "istanbul-1"),
    "jacarepagua": ("jacarepagua", "jacarepagua-1"),
    "jarama": ("jarama", "jarama-2"),
    "jerez": ("jerez", "jerez-2"),
    "korea": ("yeongam", "yeongam-1"),
    "kyalami": ("kyalami", "kyalami-2"),
    "le-mans": ("bugatti", "bugatti-1"),
    "long-beach": ("long-beach", "long-beach-3"),
    "magny-cours": ("magny-cours", "magny-cours-3"),
    "monsanto": ("monsanto", "monsanto-1"),
    "mont-tremblant": ("mont-tremblant", "mont-tremblant-1"),
    "montjuic": ("montjuic", "montjuic-1"),
    "mosport": ("mosport", "mosport-1"),
    "mugello": ("mugello", "mugello-1"),
    "nivelles": ("nivelles", "nivelles-1"),
    "nurburgring": ("nurburgring", "nurburgring-4"),
    "paulricard": ("paul-ricard", "paul-ricard-3"),
    "pedralbes": ("pedralbes", "pedralbes-1"),
    "pescara": ("pescara", "pescara-1"),
    "phoenix": ("phoenix", "phoenix-2"),
    "portimao": ("portimao", "portimao-1"),
    "prince-george": ("east-london", "east-london-1"),
    "reims": ("reims", "reims-2"),
    "riverside": ("riverside", "riverside-1"),
    "rouen": ("rouen", "rouen-2"),
    "sebring": ("sebring", "sebring-1"),
    "sepang": ("sepang", "sepang-1"),
    "shanghai": ("shanghai", "shanghai-1"),
    "sochi": ("sochi", "sochi-1"),
    "valencia": ("valencia", "valencia-1"),
    "watkins-glen": ("watkins-glen", "watkins-glen-3"),
    "zeltweg": ("zeltweg", "zeltweg-1"),
    "zolder": ("zolder", "zolder-2")
}

print(f"Total mapping entries configured: {len(FILENAME_TO_REPO)}")

success_count = 0
failed = []

for stem, (repo_id, layout_id) in FILENAME_TO_REPO.items():
    svg_url = f"https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/circuits/white/{layout_id}.svg"
    try:
        req = urllib.request.Request(svg_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            raw_svg = resp.read().decode('utf-8')

        # Extract path d attribute
        m_path = re.search(r'd="([^"]+)"', raw_svg)
        if not m_path:
            raise ValueError(f"No d attribute in SVG for {layout_id}")
        
        path_d = m_path.group(1)

        # Extract start coordinate M X Y
        m_start = re.search(r'M\s*([\d\.\-]+)\s+([\d\.\-]+)', path_d)
        if m_start:
            sx, sy = m_start.group(1), m_start.group(2)
            start_marker = f'<circle cx="{sx}" cy="{sy}" r="7" fill="#ffffff" stroke="#e10600" stroke-width="3" />'
        else:
            start_marker = ''

        # Build clean, high-precision SVG with F1 Red stroke and crisp responsive viewBox
        styled_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <!-- Formula 1 Official Track Geometry -->
  <path d="{path_d}" 
        fill="none" 
        stroke="#e10600" 
        stroke-width="14" 
        stroke-linecap="round" 
        stroke-linejoin="round" />
  <!-- Start / Finish Line Marker -->
  {start_marker}
</svg>
'''
        out_path = os.path.join(SVG_DIR, f"{stem}.svg")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(styled_svg)

        success_count += 1
    except Exception as e:
        print(f"ERROR downloading {stem} ({layout_id}): {e}")
        failed.append((stem, layout_id, str(e)))

# Also create f1-generic.svg using Silverstone or Monza geometry
generic_src = os.path.join(SVG_DIR, "silverstone.svg")
if os.path.exists(generic_src):
    with open(generic_src, "r", encoding="utf-8") as f:
        generic_content = f.read()
    with open(os.path.join(SVG_DIR, "f1-generic.svg"), "w", encoding="utf-8") as f:
        f.write(generic_content)
    print("Created f1-generic.svg from official reference layout.")

print(f"\nFinished: Successfully generated {success_count}/77 authentic F1 circuit SVGs!")
if failed:
    print(f"Failed count: {len(failed)}")
    for item in failed:
        print("  ", item)
