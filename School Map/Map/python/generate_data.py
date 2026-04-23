import cv2
import numpy as np
import json
import os

# 🔧 SETTINGS
GRID_SIZE = 8        # Slightly larger cells = less noise
OUTPUT_DIR = "grids"

# 📁 INPUT DATA
data = {
    "FGM": {
        "Floor 1": "SchoolBlueprints/FGM 1ST.png",
        "Floor 2": "SchoolBlueprints/FGM 2ND.png",
        "Floor 3": "SchoolBlueprints/FGM 3RD.png",
        "Floor 4": "SchoolBlueprints/FGM 4TH.png",
        "Floor 5": "SchoolBlueprints/FGM 5TH.png"
    },
    "EMM": {
        "Floor 1": "SchoolBlueprints/EMM 1ST FLOOR.png",
        "Floor 2": "SchoolBlueprints/EMM 2ND FLOOR.png",
        "Floor 3": "SchoolBlueprints/EMM 3RD FLOOR.png",
        "Floor 4": "SchoolBlueprints/EMM 4TH FLOOR.png"
    }
}

os.makedirs(OUTPUT_DIR, exist_ok=True)


# ============================================================
# 🧱 WALL DETECTION — only detect DARK wall lines
# Blueprint backgrounds are white/light; walls are thick dark lines
# ============================================================
def detect_walls(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Step 1: Threshold — only keep VERY dark pixels (actual wall lines)
    # Walls in blueprints are typically near-black (< 80 brightness)
    _, dark_only = cv2.threshold(gray, 80, 255, cv2.THRESH_BINARY_INV)

    # Step 2: Remove small noise dots (text, tiny marks)
    # Only keep structures that are at least 3x3 pixels
    kernel_open = np.ones((3, 3), np.uint8)
    cleaned = cv2.morphologyEx(dark_only, cv2.MORPH_OPEN, kernel_open)

    # Step 3: Dilate slightly so walls cover their grid cells properly
    kernel_dilate = np.ones((4, 4), np.uint8)
    thick = cv2.dilate(cleaned, kernel_dilate, iterations=1)

    return thick


# ============================================================
# 🧩 GRID GENERATION
# A cell is a wall only if it has SIGNIFICANT dark coverage
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

            # Only mark as wall if >30% of the cell is dark
            # This prevents light-colored room fills from being marked as walls
            is_wall = wall_ratio > 0.30

            row.append(1 if is_wall else 0)

        grid.append(row)

    return grid


# ============================================================
# 🏠 ROOM DETECTION (unchanged)
# ============================================================
def detect_rooms(thresh):
    inv = cv2.bitwise_not(thresh)
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(inv)
    rooms = []
    for i in range(1, num_labels):
        x = stats[i, cv2.CC_STAT_LEFT]
        y = stats[i, cv2.CC_STAT_TOP]
        w = stats[i, cv2.CC_STAT_WIDTH]
        h = stats[i, cv2.CC_STAT_HEIGHT]
        area = stats[i, cv2.CC_STAT_AREA]
        if area > 5000:
            rooms.append({"x1": int(x), "y1": int(y), "x2": int(x+w), "y2": int(y+h)})
    return rooms


# ============================================================
# 🎨 DEBUG OVERLAY — walls shown in red
# ============================================================
def save_debug_overlay(img, grid, file_name):
    overlay = img.copy()
    h, w = overlay.shape[:2]

    for gy, row in enumerate(grid):
        for gx, cell in enumerate(row):
            if cell == 1:
                px = gx * GRID_SIZE
                py = gy * GRID_SIZE
                cv2.rectangle(
                    overlay,
                    (px, py),
                    (min(px + GRID_SIZE, w), min(py + GRID_SIZE, h)),
                    (0, 0, 255),
                    -1
                )

    debug = cv2.addWeighted(overlay, 0.5, img, 0.5, 0)
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
            grid = build_grid(thresh, img.shape)
            rooms = detect_rooms(thresh)

            # 📊 Stats
            total = sum(len(row) for row in grid)
            walls = sum(cell for row in grid for cell in row)
            walkable = total - walls
            pct = int((walkable / total) * 100) if total > 0 else 0

            print(f"     Grid: {len(grid[0])}x{len(grid)}")
            print(f"     Walls: {walls} | Walkable: {walkable} ({pct}%)")

            if pct < 40:
                print(f"  ⚠️  Only {pct}% walkable — try lowering the threshold in detect_walls()")
            elif pct > 90:
                print(f"  ⚠️  {pct}% walkable — walls may not be detected, try raising the threshold")
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

    print("\n DONE! Check the _grid.png files — red = wall, original = walkable.")
    print("If too much is red, lower the threshold in detect_walls() (line: '_, dark_only = ...')")
    print("Try values between 60–120. Lower = stricter (less wall), Higher = more wall.")


# ▶️ RUN
if __name__ == "__main__":
    process_all()