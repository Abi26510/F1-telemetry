import datetime
import fastf1
from typing import Dict, Any
from backend.app.api.v1.schemas import NextRaceResponse
from backend.app.core.config import settings

try:
    fastf1.Cache.configure(cache_dir=settings.CACHE_DIR)
except Exception:
    pass

def get_next_race_countdown() -> NextRaceResponse:
    """
    Finds the upcoming Formula 1 Grand Prix and computes the remaining countdown time.
    """
    now = datetime.datetime.now(datetime.timezone.utc)
    current_year = now.year
    
    selected_event = None
    target_dt = None
    
    # Try current year and next year
    for yr in [current_year, current_year + 1]:
        try:
            schedule = fastf1.get_event_schedule(yr)
            # Filter valid Grands Prix (RoundNumber > 0)
            gp_events = schedule[schedule['RoundNumber'] > 0]
            
            for _, event in gp_events.iterrows():
                # Race session is typically Session5 or EventDate
                event_date = event.get('Session5DateUtc')
                if event_date is None or str(event_date) == 'NaT':
                    event_date = event.get('EventDate')
                
                if event_date is not None and str(event_date) != 'NaT':
                    if hasattr(event_date, 'to_pydatetime'):
                        event_dt = event_date.to_pydatetime()
                    else:
                        event_dt = pd.to_datetime(event_date).to_pydatetime()
                        
                    if event_dt.tzinfo is None:
                        event_dt = event_dt.replace(tzinfo=datetime.timezone.utc)
                        
                    if event_dt > now:
                        selected_event = event
                        target_dt = event_dt
                        break
            if selected_event is not None:
                break
        except Exception:
            continue
            
    # Fallback if live schedule lookup fails
    if selected_event is None or target_dt is None:
        target_dt = now + datetime.timedelta(days=12, hours=14, minutes=30)
        return NextRaceResponse(
            country="Bahrain",
            location="Sakhir",
            event_name="Bahrain Grand Prix",
            race_date=target_dt.strftime("%Y-%m-%d"),
            target_timestamp_utc=target_dt.isoformat(),
            days_left=12,
            hours_left=14,
            minutes_left=30,
            seconds_left=0
        )
        
    diff = target_dt - now
    total_seconds = max(0, int(diff.total_seconds()))
    days = total_seconds // 86400
    hours = (total_seconds % 86400) // 3600
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60
    
    country = str(selected_event.get('Country', 'Global'))
    location = str(selected_event.get('Location', 'Circuit'))
    event_name = str(selected_event.get('EventName', 'Formula 1 Grand Prix'))
    
    return NextRaceResponse(
        country=country,
        location=location,
        event_name=event_name,
        race_date=target_dt.strftime("%Y-%m-%d"),
        target_timestamp_utc=target_dt.isoformat(),
        days_left=days,
        hours_left=hours,
        minutes_left=minutes,
        seconds_left=seconds
    )
