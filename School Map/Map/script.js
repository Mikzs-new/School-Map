// ✅ GLOBAL — called from HTML onclick attributes
let grid = [];
let gridSize = 6;
let detectedRooms = [];
let currentBuilding = null;

// ============================================================
// DATA
// ============================================================
const data = {
    EMM: {
        "Floor 1": {
            map: "SchoolBlueprints/EMM 1ST FLOOR.png",
            StartingPoint: { x1: 42, y1: 384, x2: 877, y2: 430 },
            rooms: [
                {name: "EMM 1ST FLOOR STAIRS", x1: 44, y1: 384, x2: 83, y2: 441, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM 1st Floor Stairs 1.jpg"},
                {name: "EMM 1ST FLOOR STAIR", x1: 743, y1: 326, x2: 778, y2: 381, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM 1st Floor Stairs 2.jpg"},
                {name: "EMM 1ST FLOOR HALLWAY", x1: 90, y1: 379, x2: 729, y2: 439, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM 1st Floor Hallway.jpg"},
                {name: "EMM 101", x1: 44, y1: 247, x2: 236, y2: 384, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM Computer Lab A.jpg"},
                {name: "EMM 102", x1: 236, y1: 245, x2: 391, y2: 381, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM Computer Lab B.jpg"},
                {name: "EMM 103", x1: 389, y1: 247, x2: 502, y2: 379, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM MIS.jpg"},
                {name: "EMM 104", x1: 502, y1: 245, x2: 574, y2: 377, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM ITE Department.jpg"},
                {name: "EMM 105", x1: 574, y1: 245, x2: 741, y2: 379, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM Computer Lab C.jpg"},
                {name: "EMM 106", x1: 812, y1: 245, x2: 875, y2: 379, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM IT Clinic.jpg"}
            ]
        },
        "Floor 2": {
            map: "SchoolBlueprints/EMM 2ND FLOOR.png",
            StartingPoint: { x1: 93, y1: 404, x2: 912, y2: 455 },
            rooms: [
                {name: "EMM 2ND FLOOR STAIRS", x1: 35, y1: 404, x2: 76, y2: 453, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 2nd Floor Stairs 1.jpg"},
                {name: "EMM 2ND FLOOR STAIRS", x1: 738, y1: 305, x2: 817, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 2nd Floor Stairs 2.jpg"},
                {name: "EMM 2ND FLOOR HALLWAY", x1: 93, y1: 404, x2: 919, y2: 455, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 2nd Floor Hallway.jpg"},
                {name: "EMM 201", x1: 37, y1: 266, x2: 130, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 201 Room.jpg"},
                {name: "EMM 202", x1: 132, y1: 270, x2: 299, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 202 - BSCrim Office.jpg"},
                {name: "EMM 203", x1: 301, y1: 270, x2: 382, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 203 - Marketing and Office Promotion.jpg"},
                {name: "EMM 204", x1: 387, y1: 270, x2: 495, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 204 - Student Service Offices & Supreme Student Council.jpg"},
                {name: "EMM 205", x1: 493, y1: 270, x2: 569, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 205 - Admission Office.jpg"},
                {name: "EMM 206", x1: 574, y1: 270, x2: 646, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 206 - TVET.jpg"},
                {name: "EMM 207", x1: 648, y1: 270, x2: 738, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 207 - Alumni Office.jpg"},
                {name: "EMM 208", x1: 817, y1: 270, x2: 877, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 208 - BECED Simulation Room.jpg"}
            ]
        },
        "Floor 3": {
            map: "SchoolBlueprints/EMM 3RD FLOOR.png",
            StartingPoint: { x1: 104, y1: 425, x2: 907, y2: 476 },
            rooms: [
                {name: "EMM 3RD FLOOR STAIRS", x1: 49, y1: 421, x2: 81, y2: 476, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 3rd Floor Stairs 1.jpg"},
                {name: "EMM 3RD FLOOR STAIRS", x1: 766, y1: 335, x2: 842, y2: 425, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 3RD FLOOR STAIRS.jpg"},
                {name: "EMM 3RD FLOOR HALLWAY", x1: 104, y1: 425, x2: 907, y2: 476, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 3RD FLOOR HALLWAY.jpg"},
                {name: "EMM 301", x1: 44, y1: 289, x2: 169, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 301 ROOM.jpg"},
                {name: "EMM 302", x1: 174, y1: 291, x2: 280, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 302 ROOM.jpg"},
                {name: "EMM 303", x1: 282, y1: 291, x2: 398, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 303 ROOM.jpg"},
                {name: "EMM 304", x1: 393, y1: 291, x2: 454, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 304 ROOM.jpg"},
                {name: "EMM 305", x1: 458, y1: 291, x2: 514, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 305 ROOM.jpg"},
                {name: "EMM 306", x1: 516, y1: 291, x2: 643, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 306 - Secondary Education Simulation Room.jpg"},
                {name: "EMM 307", x1: 461, y1: 291, x2: 768, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 307 Education Program.jpg"},
                {name: "EMM 308", x1: 842, y1: 291, x2: 903, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 308 - Elementary Education S.R..jpg"}
            ]
        },
        "Floor 4": {
            map: "SchoolBlueprints/EMM 4TH FLOOR.png",
            StartingPoint: { x1: 93, y1: 404, x2: 912, y2: 455 },
            rooms: [
                {name: "EMM 4TH FLOOR STAIRS", x1: 42, y1: 409, x2: 93, y2: 460, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 4TH FLOOR/EMM 4th Floor Stairs 1.jpg"},
                {name: "EMM 4TH FLOOR STAIRS", x1: 778, y1: 316, x2: 852, y2: 414, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 4TH FLOOR STAIRS 2.jpg"},
                {name: "EMM 4TH FLOOR HALLWAY", x1: 109, y1: 411, x2: 921, y2: 462, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 4TH FLOOR HALLWAY.jpg"},
                {name: "EMM 401", x1: 49, y1: 279, x2: 280, y2: 407, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 4TH FLOOR/EMM 401 - CAS Laboratory.jpg"},
                {name: "EMM 402", x1: 289, y1: 279, x2: 493, y2: 407, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 4TH FLOOR/EMM 402 - Physics Laboratory.jpg"},
                {name: "EMM 403", x1: 488, y1: 279, x2: 569, y2: 407, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 4TH FLOOR/EMM 403 - Laboratory Control Office.jpg"},
                {name: "EMM 404", x1: 574, y1: 279, x2: 778, y2: 407, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 4TH FLOOR/EMM 403 ROOM.jpg"},
                {name: "EMM 405", x1: 854, y1: 279, x2: 914, y2: 407, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 4TH FLOOR/EMM 404 ROOM.jpg"},
                {name: "EMM 406", x1: 953, y1: 282, x2: 1004, y2: 356, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 4TH FLOOR/EMM 405 ROOM.jpg"}
            ]
        }
    },
    FGM: {
        "Floor 1": {
            map: "SchoolBlueprints/FGM 1ST.png",
            StartingPoint: { x1: 451, y1: 166, x2: 509, y2: 201 },
            rooms: [
                {name: "FGM HALLWAY", x1: 451, y1: 231, x2: 692, y2: 390, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 1st Floor Hallway.jpg"},
                {name: "FGM 1ST FLOOR STAIR", x1: 697, y1: 159, x2: 824, y2: 231, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 1st Floor Stairs 1.jpg"},
                {name: "FGM 102 FACULTY & STAFF CR", x1: 803, y1: 245, x2: 900, y2: 314, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 102 - Faculty & Staff CR.jpg"},
                {name: "FGM 109", x1: 178, y1: 136, x2: 280, y2: 245, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 109 - REEDO.jpg"},
                {name: "FGM 108", x1: 252, y1: 272, x2: 363, y2: 379, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 108 - Conference Room.jpg"},
                {name: "FGM 107", x1: 333, y1: 411, x2: 444, y2: 488, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 1st Floor Hallway.jpg"},
                {name: "FGM ELEVATOR", x1: 743, y1: 536, x2: 808, y2: 580, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 1st Floor Elevator.jpg"},
                {name: "FGM REGISTRAR", x1: 717, y1: 319, x2: 903, y2: 407, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM Registrar's Office.jpg"},
                {name: "FGM CASHIER", x1: 759, y1: 617, x2: 861, y2: 721, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM Cashier.jpg"},
                {name: "FGM FINANCE", x1: 711, y1: 421, x2: 877, y2: 527, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 105 - Finance Office.jpg"}
            ]
        },
        "Floor 2": { map: "SchoolBlueprints/FGM 2ND.png", StartingPoint: { x1: 636, y1: 226, x2: 667, y2: 261 }, rooms: [] },
        "Floor 3": { map: "SchoolBlueprints/FGM 3RD.png", StartingPoint: { x1: 0, y1: 0, x2: 0, y2: 0 }, rooms: [] },
        "Floor 4": { map: "SchoolBlueprints/FGM 4TH.png", StartingPoint: { x1: 0, y1: 0, x2: 0, y2: 0 }, rooms: [] },
        "Floor 5": { map: "SchoolBlueprints/FGM 5TH.png", StartingPoint: { x1: 0, y1: 0, x2: 0, y2: 0 }, rooms: [] }
    }
};

// ============================================================
// ✅ GLOBAL — must be global so HTML onclick can call them
// ============================================================
function showRooms(building) {
    currentBuilding = building;
    const buildingData = data[building];
    if (!buildingData) return;

    const floors = Object.keys(buildingData);

    const list = document.getElementById("buildingList");
    list.innerHTML = "";

    floors.forEach((floor, index) => {
        const item = document.createElement("div");
        item.className = "room-item";
        item.style.cursor = "pointer";
        item.innerHTML = `
            <div class="room-number">${index + 1}</div>
            <div class="room-info">
                <div class="room-title">${floor}</div>
            </div>
        `;
        item.onclick = () => showFloor(building, floor);
        list.appendChild(item);
    });

    showFloor(building, floors[0]);
}

function showFloor(building, floor) {
    const floorData = data[building] && data[building][floor];
    if (!floorData || !floorData.map) {
        console.warn("No map for", building, floor);
        return;
    }

    const floorImage = document.getElementById("floorImage");
    floorImage.src = floorData.map;

    floorImage.onload = function () {
        const container = document.getElementById("mapContainer");
        const canvas = document.getElementById("canvas");
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRooms(building, floor);
    };

    if (floorImage.complete && floorImage.naturalWidth > 0) {
        floorImage.onload();
    }

    loadGrid(building, floor);
}

function closeRoom() {
    document.getElementById("roomOverlay").style.display = "none";
}

function onOpenCvReady() {
    console.log("✅ OpenCV ready");
}

// ============================================================
// LOAD GRID
// ============================================================
async function loadGrid(building, floor) {
    const file = `grids/${building}_${floor.replace(/ /g, "_")}.json`;
    try {
        const res = await fetch(file);
        if (!res.ok) throw new Error("Not found");
        const jsonData = await res.json();
        grid = jsonData.grid;
        detectedRooms = jsonData.rooms;
        console.log("✅ Grid loaded:", file, `(${grid[0]?.length}x${grid.length})`);
    } catch (err) {
        console.warn("⚠️ No grid file, fallback L-path will be used:", file);
        grid = [];
        detectedRooms = [];
    }
}

// ============================================================
// DRAW ROOMS
// ============================================================
function drawRooms(building, floor) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const container = document.getElementById("mapContainer");

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const floorData = data[building][floor];
    const rooms = floorData.rooms;
    const StartingPoint = floorData.StartingPoint;

    const scaleX = canvas.width / 1024;
    const scaleY = canvas.height / 768;

    rooms.forEach(room => {
        room.scaled = {
            x: room.x1 * scaleX,
            y: room.y1 * scaleY,
            w: (room.x2 - room.x1) * scaleX,
            h: (room.y2 - room.y1) * scaleY
        };
        ctx.strokeStyle = "rgba(0, 100, 220, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(room.scaled.x, room.scaled.y, room.scaled.w, room.scaled.h);
    });

    canvas.onclick = function (e) {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        rooms.forEach(room => {
            ctx.strokeStyle = "rgba(0, 100, 220, 0.5)";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(room.scaled.x, room.scaled.y, room.scaled.w, room.scaled.h);
        });

        rooms.forEach(room => {
            const r = room.scaled;
            if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
                ctx.fillStyle = "rgba(0, 120, 255, 0.2)";
                ctx.fillRect(r.x, r.y, r.w, r.h);
                if (room.img) showRoom(room.img);
                drawPath(ctx, r, StartingPoint, scaleX, scaleY);
            }
        });
    };
}

// ============================================================
// ✅ FIND NEAREST WALKABLE CELL
// grid uses: 0 = walkable, 1 = wall
// ============================================================
function findNearestWalkable(grid, point, radius = 10) {
    const rows = grid.length;
    const cols = grid[0].length;

    for (let r = 0; r <= radius; r++) {
        for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {
                // Only check the perimeter at each radius step
                if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
                const nx = point.x + dx;
                const ny = point.y + dy;
                if (
                    ny >= 0 && ny < rows &&
                    nx >= 0 && nx < cols &&
                    grid[ny][nx] === 0   // ✅ 0 = walkable
                ) {
                    return { x: nx, y: ny };
                }
            }
        }
    }
    return point; // fallback: return original
}

// ============================================================
// A* PATHFINDING
// grid: 0 = walkable, 1 = wall
// ============================================================
function findPath(grid, start, end) {
    const rows = grid.length;
    const cols = grid[0].length;

    // Safety check
    if (
        grid[start.y]?.[start.x] !== 0 ||
        grid[end.y]?.[end.x] !== 0
    ) {
        console.warn("⚠️ Start or end is on a wall — snapping failed");
        return [];
    }

    const openSet = [];
    const cameFrom = {};

    const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const fScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));

    function key(p) { return `${p.x},${p.y}`; }

    gScore[start.y][start.x] = 0;
    fScore[start.y][start.x] = heuristic(start, end);

    openSet.push(start);

    let iterations = 0;
    const MAX_ITERATIONS = 50000; // prevent infinite loop on large grids

    while (openSet.length > 0) {
        if (++iterations > MAX_ITERATIONS) {
            console.warn("⚠️ A* exceeded max iterations — no path found");
            return [];
        }

        openSet.sort((a, b) => fScore[a.y][a.x] - fScore[b.y][b.x]);
        const current = openSet.shift();

        if (current.x === end.x && current.y === end.y) {
            return reconstructPath(cameFrom, current);
        }

        const neighbors = getNeighbors(current, grid);

        neighbors.forEach(n => {
            const tentative = gScore[current.y][current.x] + 1;

            if (tentative < gScore[n.y][n.x]) {
                cameFrom[key(n)] = current;
                gScore[n.y][n.x] = tentative;
                fScore[n.y][n.x] = tentative + heuristic(n, end);

                if (!openSet.find(p => p.x === n.x && p.y === n.y)) {
                    openSet.push(n);
                }
            }
        });
    }

    return [];
}

function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// ✅ FIXED: grid[ny][nx] === 0 means walkable (not wall)
function getNeighbors(node, grid) {
    const dirs = [
        {x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}
    ];

    const result = [];

    dirs.forEach(d => {
        const nx = node.x + d.x;
        const ny = node.y + d.y;

        if (
            ny >= 0 && ny < grid.length &&
            nx >= 0 && nx < grid[0].length &&
            grid[ny][nx] === 0   // ✅ 0 = walkable, 1 = wall
        ) {
            result.push({x: nx, y: ny});
        }
    });

    return result;
}

function reconstructPath(cameFrom, current) {
    const path = [current];
    while (cameFrom[`${current.x},${current.y}`]) {
        current = cameFrom[`${current.x},${current.y}`];
        path.unshift(current);
    }
    return path;
}

// ============================================================
// DRAW PATH
// ============================================================
function drawPath(ctx, room, StartingPoint, scaleX, scaleY) {
    const startX = StartingPoint.x1 * scaleX;
    const startY = ((StartingPoint.y1 + StartingPoint.y2) / 2) * scaleY;

    const endX = room.x + room.w / 2;
    const endY = room.y + room.h / 2;

    if (grid.length > 0) {
        const cols = grid[0].length;
        const rows = grid.length;

        const cellW = ctx.canvas.width / cols;
        const cellH = ctx.canvas.height / rows;

        // ✅ Clamp coordinates to grid bounds
        const clamp = (val, max) => Math.max(0, Math.min(max - 1, Math.floor(val)));

        const rawStart = {
            x: clamp(startX / cellW, cols),
            y: clamp(startY / cellH, rows)
        };

        const rawEnd = {
            x: clamp(endX / cellW, cols),
            y: clamp(endY / cellH, rows)
        };

        // ✅ Snap to nearest walkable cell (grid value === 0)
        const snappedStart = findNearestWalkable(grid, rawStart);
        const snappedEnd   = findNearestWalkable(grid, rawEnd);

        console.log("Start cell:", snappedStart, "value:", grid[snappedStart.y]?.[snappedStart.x]);
        console.log("End cell:  ", snappedEnd,   "value:", grid[snappedEnd.y]?.[snappedEnd.x]);

        const path = findPath(grid, snappedStart, snappedEnd);

        if (path.length > 0) {
            ctx.setLineDash([]);
            ctx.strokeStyle = "#22c55e";
            ctx.lineWidth = 3;
            ctx.beginPath();

            path.forEach((p, i) => {
                const px = p.x * cellW + cellW / 2;
                const py = p.y * cellH + cellH / 2;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });

            ctx.stroke();

            // Draw arrow head at end of path
            if (path.length >= 2) {
                const last  = path[path.length - 1];
                const prev  = path[path.length - 2];
                const ex = last.x * cellW + cellW / 2;
                const ey = last.y * cellH + cellH / 2;
                const angle = Math.atan2(
                    last.y - prev.y,
                    last.x - prev.x
                );
                drawArrowHead(ctx, ex, ey, angle, "#22c55e");
            }

        } else {
            console.warn("⚠️ No path found — falling back to L-path");
            drawFallbackPath(ctx, startX, startY, endX, endY);
        }

    } else {
        drawFallbackPath(ctx, startX, startY, endX, endY);
    }

    // Start dot (green)
    ctx.beginPath();
    ctx.arc(startX, startY, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#16a34a";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.stroke();

    // End dot (blue)
    ctx.beginPath();
    ctx.arc(endX, endY, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#2563eb";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();
}

// ============================================================
// FALLBACK L-SHAPED PATH (when no grid available)
// ============================================================
function drawFallbackPath(ctx, startX, startY, endX, endY) {
    const path = [
        { x: startX, y: startY },
        { x: startX, y: endY },
        { x: endX,   y: endY }
    ];

    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Arrow at end
    const angle = Math.atan2(endY - path[1].y, endX - path[1].x);
    drawArrowHead(ctx, endX, endY, angle, "#2563eb");
}

// ============================================================
// ARROW HEAD HELPER
// ============================================================
function drawArrowHead(ctx, x, y, angle, color) {
    const size = 12;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.setLineDash([]);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-size, -size / 2);
    ctx.lineTo(-size,  size / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// ============================================================
// SHOW ROOM IMAGE
// ============================================================
function showRoom(img) {
    document.getElementById("roomImg").src = img;
    document.getElementById("roomOverlay").style.display = "flex";
}

// ============================================================
// DOM READY
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("roomOverlay").addEventListener("click", function (e) {
        if (e.target.id === "roomOverlay") closeRoom();
    });
});