import urllib.request

patterns = [
    "https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/circuits/white-outline/adelaide-1.svg",
    "https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/circuits/white/adelaide-1.svg",
    "https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/circuits/black-outline/adelaide-1.svg",
    "https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/white-outline/adelaide-1.svg",
    "https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/svg/adelaide-1.svg",
    "https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/adelaide-1.svg",
]

for url in patterns:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            print(f"FOUND! {url} - {len(resp.read())} bytes")
    except Exception as e:
        print(f"Failed {url}: {e}")
