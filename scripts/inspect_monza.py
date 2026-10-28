import urllib.request

for style in ["white", "white-outline", "black", "black-outline"]:
    url = f"https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/circuits/{style}/monza-6.svg"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode('utf-8')
        print(f"=== {style} ===")
        print(content[:300])
