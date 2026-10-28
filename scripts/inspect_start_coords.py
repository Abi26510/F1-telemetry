import urllib.request
import re

test_circuits = ['monza-6', 'silverstone-8', 'spa-francorchamps-4', 'monaco-5', 'bahrain-1']

for cid in test_circuits:
    url = f"https://cdn.jsdelivr.net/gh/MisterSix2295/f1-circuits-svg@master/circuits/white/{cid}.svg"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        svg_text = resp.read().decode('utf-8')
        m = re.search(r'd="M\s*([\d\.\-]+)\s+([\d\.\-]+)', svg_text)
        if m:
            print(f"{cid}: Start point = ({m.group(1)}, {m.group(2)})")
        else:
            print(f"{cid}: No M match")
