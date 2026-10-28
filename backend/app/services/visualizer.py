import io
import base64
import os
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.collections import LineCollection
from typing import Dict, Any, Optional

def generate_circuit_speed_map(
    telemetry_df,
    circuit_name: str = "Circuit",
    driver_name: str = "Driver",
    lap_time_str: str = "",
    colormap: str = "plasma",
    save_path: Optional[str] = None
) -> Dict[str, Any]:
    """
    Generate a colored speed map for a circuit lap using Matplotlib LineCollection.
    Returns a dictionary containing base64 data URI, stats, and markers.
    """
    x = telemetry_df['X'].values
    y = telemetry_df['Y'].values
    speed = telemetry_df['Speed'].values
    brake = telemetry_df['Brake'].values if 'Brake' in telemetry_df.columns else np.zeros(len(x))
    
    # Calculate stats
    min_speed = float(np.min(speed))
    max_speed = float(np.max(speed))
    avg_speed = float(np.mean(speed))
    max_idx = int(np.argmax(speed))
    
    # Reshape points for LineCollection
    points = np.array([x, y]).T.reshape(-1, 1, 2)
    segments = np.concatenate([points[:-1], points[1:]], axis=1)
    
    # Dark modern F1 telemetry theme
    fig, ax = plt.subplots(figsize=(10, 6), facecolor='#111116')
    ax.set_facecolor('#111116')
    
    # Colored speed line
    norm = plt.Normalize(min_speed, max_speed)
    cmap = plt.get_cmap(colormap)
    lc = LineCollection(segments, cmap=cmap, norm=norm, linewidth=4.5, alpha=0.95, zorder=3)
    lc.set_array(speed[:-1])
    ax.add_collection(lc)
    
    # 1. High Speed Marker / Top Speed
    ax.scatter(
        [x[max_idx]], [y[max_idx]],
        color='#00ffc4', s=120, edgecolors='#ffffff', linewidths=1.5,
        zorder=6, label=f'Max Speed: {max_speed:.1f} km/h'
    )
    
    # 2. Braking Zones (heavy braking points)
    braking = brake > 0
    if np.any(braking):
        ax.scatter(
            x[braking], y[braking],
            color='#ef4444', s=18, alpha=0.65,
            zorder=4, label='Braking Zones'
        )
        braking_pct = float(np.sum(braking) / len(braking) * 100)
    else:
        braking_pct = 0.0

    # 3. High Speed Sections (> 280 km/h or top 15%)
    high_speed_threshold = max(280.0, max_speed * 0.90)
    high_speed_mask = speed >= high_speed_threshold
    if np.any(high_speed_mask):
        ax.scatter(
            x[high_speed_mask], y[high_speed_mask],
            color='#38bdf8', s=10, alpha=0.4,
            zorder=5, label=f'High Speed (>{int(high_speed_threshold)} km/h)'
        )

    # 4. Start / Finish line
    ax.scatter(
        [x[0]], [y[0]],
        color='#ffffff', s=110, marker='X', edgecolors='#000000', linewidths=1.5,
        zorder=7, label='Start / Finish'
    )
    
    ax.autoscale()
    ax.set_aspect('equal')
    ax.axis('off')
    
    # Sleek Colorbar
    cb = fig.colorbar(lc, ax=ax, orientation='horizontal', pad=0.03, fraction=0.04, aspect=32)
    cb.set_label('Speed (km/h)', color='#e2e8f0', fontsize=11, labelpad=6)
    cb.ax.tick_params(labelsize=9, colors='#cbd5e1')
    cb.outline.set_edgecolor('#334155')
    
    title_text = f"{circuit_name} — {driver_name}"
    if lap_time_str:
        title_text += f" ({lap_time_str})"
    ax.set_title(title_text, color='#f8fafc', fontsize=13, fontweight='bold', pad=12)
    
    ax.legend(
        facecolor='#1e1e28',
        edgecolor='#334155',
        labelcolor='#f1f5f9',
        loc='upper right',
        fontsize=9,
        framealpha=0.9
    )
    
    plt.tight_layout()
    
    # Save to buffer
    buf = io.BytesIO()
    plt.savefig(buf, format='png', dpi=160, facecolor=fig.get_facecolor(), bbox_inches='tight')
    plt.close(fig)
    buf.seek(0)
    
    image_bytes = buf.getvalue()
    base64_str = base64.b64encode(image_bytes).decode('utf-8')
    data_uri = f"data:image/png;base64,{base64_str}"
    
    if save_path:
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        with open(save_path, "wb") as f:
            f.write(image_bytes)
            
    return {
        "image_data_uri": data_uri,
        "min_speed": round(min_speed, 1),
        "max_speed": round(max_speed, 1),
        "avg_speed": round(avg_speed, 1),
        "braking_percentage": round(braking_pct, 1),
        "data_points": len(x)
    }
