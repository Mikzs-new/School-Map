import cv2
import numpy as np
import json
import os

# 🔧 SETTINGS
GRID_SIZE = 8
OUTPUT_DIR = "grids"

# 📁 INPUT DATA
data = {
    "FGM": {
        "Floor 1": "SchoolBlueprints/FGM 1ST.png",
        "Floor 2": "SchoolBlueprints/FGM 2ND.png",
        "Floor 3": "SchoolBlueprints/FGM 3RD.png",
        "Floor 4": "SchoolBlueprints/FGM 4TH.png",
        "Floor 5": "SchoolBlueprints/FGM 5TH.png",
        "Floor 5": "SchoolBlueprints/FGM 6TH.png"
    },
    "EMM": {
        "Floor 1": "SchoolBlueprints/EMM 1ST FLOOR.png",
        "Floor 2": "SchoolBlueprints/EMM 2ND FLOOR.png",
        "Floor 3": "SchoolBlueprints/EMM 3RD FLOOR.png",
        "Floor 4": "SchoolBlueprints/EMM 4TH FLOOR.png"
    },
    "AGM": {
        "Floor 1": "SchoolBlueprints/AGM 1ST FLOOR.png",
        "Floor 2": "SchoolBlueprints/AGM 2ND FLOOR.png",
    },
    "LIBRARY": {
        "Floor 1": "SchoolBlueprints/LIBRARY 1ST FLOOR.png",
        "Floor 2": "SchoolBlueprints/LIBRARY 2ND FLOOR.png",
        "Floor 3": "SchoolBlueprints/LIBRARY 3RD FLOOR.png",
        "Floor 4": "SchoolBlueprints/LIBRARY 4TH FLOOR.png",
    },
    "ENTRANCE": {
        "Floor 1": "SchoolBlueprints/ENTRANCE.png"
    }
}

os.makedirs(OUTPUT_DIR, exist_ok=True)


# ============================================================
# 🧱 WALL DETECTION — improved for blueprints with dark text/fills
#
# Strategy:
#   1. Convert to grayscale
#   2. Use VERY strict threshold (only near-black = true walls)
#   3. Use morphological CLOSING to connect broken wall lines
#   4. Remove thin lines (text strokes) with area filtering
#   5. Dilate walls slightly to block navigation through them
# ============================================================
def detect_walls(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Step 1: Only keep truly BLACK pixels (walls are near-black, <50)
    # Raise this if walls aren't detected; lower if too much is red
    _, dark_only = cv2.threshold(gray, 50, 255, cv2.THRESH_BINARY_INV)

    # Step 2: Remove tiny noise — text dots, hatching, small marks
    # Open with 2x2 removes isolated pixels/thin strokes
    kernel_open = np.ones((2, 2), np.uint8)
    cleaned = cv2.morphologyEx(dark_only, cv2.MORPH_OPEN, kernel_open)

    # Step 3: Keep only LARGE connected dark regions (actual wall segments)
    # This removes text characters which are small disconnected blobs
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(cleaned, connectivity=8)
    wall_mask = np.zeros_like(cleaned)
    for i in range(1, num_labels):
        area = stats[i, cv2.CC_STAT_AREA]
        w    = stats[i, cv2.CC_STAT_WIDTH]
        h    = stats[i, cv2.CC_STAT_HEIGHT]
        # Keep blobs that are either:
        #   - Large area (real wall segment)
        #   - Long and thin (wall lines)
        #   - Wide or tall (wall boundaries)
        is_long_line = (w > 40 or h > 40)
        is_large     = area > 300
        if is_large and is_long_line:
            wall_mask[labels == i] = 255

    # Step 4: Close small gaps in wall lines (connect broken segments)
    kernel_close = np.ones((3, 3), np.uint8)
    closed = cv2.morphologyEx(wall_mask, cv2.MORPH_CLOSE, kernel_close)

    # Step 5: Dilate slightly so walls fully block their grid cells
    kernel_dilate = np.ones((3, 3), np.uint8)
    thick = cv2.dilate(closed, kernel_dilate, iterations=1)

    return thick


# ============================================================
# 🧩 GRID GENERATION
# A cell is a wall only if it has significant dark wall coverage
# ============================================================
def build_grid(thresh, img_shape):
    h, w = img_shape[:2]
    grid = []

    rows = (h + GRID_SIZE - 1) // GRID_SIZE
    cols = (w + GRID_SIZE - 1) // GRID_SIZE

    for gy in range(rows):
        row = []
        for gx in range(cols):
            y0 = gy * GRID_SIZE
            x0 = gx * GRID_SIZE
            y1 = min(y0 + GRID_SIZE, h)
            x1 = min(x0 + GRID_SIZE, w)

            cell = thresh[y0:y1, x0:x1]
            if cell.size == 0:
                row.append(0)
                continue

            wall_ratio = np.sum(cell > 0) / cell.size

            # Raised threshold: need >40% wall pixels to count as wall
            # This prevents text/hatching from blocking navigation
            is_wall = wall_ratio > 0.40

            row.append(1 if is_wall else 0)

        grid.append(row)

    return grid


# ============================================================
# 🏠 ROOM DETECTION
# ============================================================
def detect_rooms(thresh):
    inv = cv2.bitwise_not(thresh)
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(inv)
    rooms = []
    for i in range(1, num_labels):
        x    = stats[i, cv2.CC_STAT_LEFT]
        y    = stats[i, cv2.CC_STAT_TOP]
        w    = stats[i, cv2.CC_STAT_WIDTH]
        h    = stats[i, cv2.CC_STAT_HEIGHT]
        area = stats[i, cv2.CC_STAT_AREA]
        if area > 5000:
            rooms.append({"x1": int(x), "y1": int(y), "x2": int(x + w), "y2": int(y + h)})
    return rooms


# ============================================================
# 🎨 DEBUG OVERLAY — walls shown in red, walkable in green tint
# ============================================================
def save_debug_overlay(img, grid, file_name):
    overlay = img.copy()
    h, w = overlay.shape[:2]

    for gy, row in enumerate(grid):
        for gx, cell in enumerate(row):
            px = gx * GRID_SIZE
            py = gy * GRID_SIZE
            x2 = min(px + GRID_SIZE, w)
            y2 = min(py + GRID_SIZE, h)
            if cell == 1:
                # Red = wall
                cv2.rectangle(overlay, (px, py), (x2, y2), (0, 0, 200), -1)
            else:
                # Light green tint = walkable (subtle)
                cv2.rectangle(overlay, (px, py), (x2, y2), (200, 255, 200), -1)

    debug = cv2.addWeighted(overlay, 0.4, img, 0.6, 0)
    cv2.imwrite(file_name, debug)


# ============================================================
# 🚀 MAIN PROCESS
# ============================================================
def process_all():
    for building, floors in data.items():
        print(f"\n🏢 {building}")

        for floor, path in floors.items():
            print(f"  ➜ {floor}")

            img = cv2.imread(path)
            if img is None:
                print(f"  ❌ Missing: {path}")
                continue

            thresh = detect_walls(img)
            grid   = build_grid(thresh, img.shape)
            rooms  = detect_rooms(thresh)

            # 📊 Stats
            total    = sum(len(row) for row in grid)
            walls    = sum(cell for row in grid for cell in row)
            walkable = total - walls
            pct      = int((walkable / total) * 100) if total > 0 else 0

            print(f"     Grid: {len(grid[0])}x{len(grid)}")
            print(f"     Walls: {walls} | Walkable: {walkable} ({pct}%)")

            if pct < 50:
                print(f"  ⚠️  Only {pct}% walkable — too many walls detected!")
                print(f"       → Lower threshold in detect_walls() (try 30 or 40)")
                print(f"       → Or lower wall_ratio in build_grid() (try 0.5 or 0.6)")
            elif pct > 95:
                print(f"  ⚠️  {pct}% walkable — walls may not be fully detected")
                print(f"       → Raise threshold in detect_walls() (try 60 or 70)")
            else:
                print(f"  ✅ Walkable ratio looks good ({pct}%)")

            # 💾 Save JSON
            file_name = f"{building}_{floor.replace(' ', '_')}.json"
            with open(os.path.join(OUTPUT_DIR, file_name), "w") as f:
                json.dump({"grid": grid, "rooms": rooms}, f)

            # 🖼 Save debug images
            thresh_path = os.path.join(OUTPUT_DIR, file_name.replace(".json", "_thresh.png"))
            grid_path   = os.path.join(OUTPUT_DIR, file_name.replace(".json", "_grid.png"))

            cv2.imwrite(thresh_path, thresh)
            save_debug_overlay(img, grid, grid_path)

            print(f"  ✅ Saved: {file_name}")

    print("\n✅ DONE!")
    print("Check the _grid.png files:")
    print("  🔴 Red   = wall (blocked)")
    print("  🟢 Green = walkable (path can go here)")
    print("\nIf rooms are red (blocked), adjust these two values:")
    print("  1. Threshold in detect_walls():  cv2.threshold(gray, 50, ...)  ← lower number = stricter")
    print("  2. wall_ratio in build_grid():   is_wall = wall_ratio > 0.40   ← higher number = fewer walls")


# ▶️ RUN
if __name__ == "__main__":
    process_all()