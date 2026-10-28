import urllib.request

for fname in ['zandvoort.svg', 'zandvoort-1.svg', 'zandvoort-2.svg', 'zandvoort-3.svg', 'zandvoort-4.svg', 'zandvoort-5.svg', 'zandvoort-modern.svg']:
    url = f"https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/circuits/white/{fname}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            print(f"FOUND: {fname}")
    except Exception as e:
        print(f"NOT FOUND: {fname}")
