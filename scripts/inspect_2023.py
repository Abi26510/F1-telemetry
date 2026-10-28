import fastf1

fastf1.Cache.configure(cache_dir='backend/cache')
sched = fastf1.get_event_schedule(2023)
valid = sched[sched['RoundNumber'] > 0]
print(f"Total 2023 Rounds: {len(valid)}")
for _, r in valid.iterrows():
    print(f"R{r['RoundNumber']}: {r['EventName']} | Location: {r['Location']} | Country: {r['Country']}")
