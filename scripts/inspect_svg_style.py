import urllib.request

for style in ["white", "white-outline"]:
    url = f"https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/circuits/{style}/adelaide-1.svg"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode('utf-8')
        print(f"=== STYLE: {style} ===")
        print(content[:500])
        print("...")
