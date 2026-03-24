let currentBuilding = null;
let currentFloor = null;

const data = {
    EMM: {
        "Floor 1": {
            map: "SchoolBlueprints/EMM 1ST FLOOR.png",

            StartingPoint: { x1: 42, y1: 384, x2: 877, y2: 430 }, //Starting point or the location pin point

            rooms: [
                {name: "EMM 1ST FLOOR STAIRS", x1: 44, y1: 384, x2: 83, y2: 441, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM 1st Floor Stairs 1.jpg"},
                {name: "EMM 1ST FLOOR STAIR", x1: 743, y1: 326, x2: 778, y2: 381, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM 1st Floor Stairs 2.jpg"},
                {name: "EMM 1ST FLOOR HALLWAY",x1: 90, y1: 379, x2: 729, y2: 439, img: "SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM 1st Floor Hallway.jpg"},
                { name: "EMM 101", x1: 44, y1: 247, x2: 236, y2: 384, img: "SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM Computer Lab A.jpg" },
                { name: "EMM 102", x1: 236, y1: 245, x2: 391, y2: 381, img: "SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM Computer Lab B.jpg" },
                { name: "EMM 103", x1: 389, y1: 247, x2: 502, y2: 379, img: "SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM MIS.jpg" },
                { name: "EMM 104", x1: 502, y1: 245, x2: 574, y2: 377, img: "SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM ITE Department.jpg" },
                { name: "EMM 105", x1: 574, y1: 245, x2: 741, y2: 379, img: "SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM Computer Lab C.jpg", },
                { name: "EMM 106", x1: 812, y1: 245, x2: 875, y2: 379, img: "SchoolPicture/EMM FLOOR BUILDING/EMM 1ST FLOOR/EMM IT Clinic.jpg", }
            ]
        },
        "Floor 2":{
            map: "SchoolBlueprints/EMM 2ND FLOOR.png",

            StartingPoint: { x1: 93, y1: 404, x2: 912, y2: 455},

            rooms:[{name: "EMM 2ND FLOOR STAIRS", x1: 35, y1: 404, x2: 76, y2: 453, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 2nd Floor Stairs 1.jpg"},
                {name: "EMM 2ND FLOOR STAIRS", x1: 738, y1: 305, x2: 817, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 2nd Floor Stairs 2.jpg"},
                {name: "EMM 2ND FLOOR HALLWAY", x1: 93, y1: 404, x2: 919, y2: 455, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 2nd Floor Hallway.jpg"},
                {name: "EMM 201", x1: 37, y1: 266, x2: 130, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 201 Room.jpg"},
                {name: "EMM 202", x1: 132, y1: 270, x2: 299, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 202 - BSCrim Office.jpg"},
                {name: "EMM 203", x1: 301, y1: 270, x2: 382, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 203 - Marketing and Office Promotion.jpg"},
                {name: "EMM 204", x1: 387, y1: 270, x2: 495, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 204 - Student Service Offices & Supreme Student Council.jpg"},
                {name: "EMM 205", x1: 493, y1: 270, x2: 569, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 205 - Admission Office.jpg"},
                {name: "EMM 206", x1: 574, y1: 270, x2: 646, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 206 - TVET.jpg"},
                {name: "EMM 207", x1: 648, y1: 270, x2: 738, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 207 - Alumni Office.jpg"},
                {name: "EMM 208", x1: 817, y1: 270, x2: 877, y2: 400, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 208 - BECED Simulation Room.jpg"},
            ]



        },
        "Floor 3":{
            map: "SchoolBlueprints/EMM 3RD FLOOR.png",

            StartingPoint: { x1: 104, y1: 425, x2: 907, y2: 476},

            rooms:[{name: "EMM 3RD FLOOR STAIRS", x1: 49, y1: 421, x2: 81, y2: 476, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 3rd Floor Stairs 1.jpg"},
                {name: "EMM 3RD FLOOR STAIRS", x1: 766, y1: 335, x2: 842, y2: 425, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 3RD FLOOR STAIRS.jpg"},
                {name: "EMM 3RD FLOOR HALLWAY", x1: 104, y1: 425, x2: 907, y2: 476, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 3RD FLOOR HALLWAY.jpg"},
                {name: "EMM 301", x1: 44, y1: 289, x2: 169, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 301 ROOM.jpg"},
                {name: "EMM 302", x1: 174, y1: 291, x2: 280, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 302 ROOM.jpg"},
                {name: "EMM 303", x1: 282, y1: 291, x2: 398, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 303 ROOM.jpg"},
                {name: "EMM 304", x1: 393, y1: 291, x2: 454, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 304 ROOM.jpg"},
                {name: "EMM 305", x1: 458, y1: 291, x2: 514, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 305 ROOM.jpg"},
                {name: "EMM 306", x1: 516, y1: 291, x2: 643, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 306 - Secondary Education Simulation Room.jpg"},
                {name: "EMM 307", x1: 461, y1: 291, x2: 768, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 307 Education Program.jpg"},
                {name: "EMM 308", x1: 842, y1: 291, x2: 903, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 308 - Elementary Education S.R..jpg"},
            ]



        },"Floor 4":{
            map: "SchoolBlueprints/EMM 4TH FLOOR.png",

            StartingPoint: { x1: 93, y1: 404, x2: 912, y2: 455},

            rooms:[{name: "EMM 4TH FLOOR STAIRS", x1: 42, y1: 409, x2: 93, y2: 460, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 4TH FLOOR/EMM 4th Floor Stairs 1.jpg"},
                {name: "EMM 4TH FLOOR STAIRS", x1: 778, y1: 316, x2: 852, y2: 414, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 4TH FLOOR STAIRS 2.jpg"},
                {name: "EMM 4TH FLOOR HALLWAY", x1: 109, y1: 411, x2: 921, y2: 462, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 2ND FLOOR/EMM 4TH FLOOR HALLWAY.jpg"},
                {name: "EMM 401", x1: 49, y1: 279, x2: 280, y2: 407, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 4TH FLOOR/EMM 401 - CAS Laboratory.jpg"},
                {name: "EMM 402", x1: 289, y1: 279, x2: 493, y2: 407, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 4TH FLOOR/EMM 402 - Physics Laboratory.jpg"},
                {name: "EMM 403", x1: 488, y1: 279, x2: 569, y2: 407, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 4TH FLOOR/EMM 403 - Laboratory Control Office.jpg"},
                {name: "EMM 404", x1: 574, y1: 279, x2: 778, y2: 407, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 4TH FLOOR/EMM 403 ROOM.jpg"},
                {name: "EMM 405", x1: 854, y1: 279, x2: 914, y2: 407, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 4TH FLOOR/EMM 404 ROOM.jpg"},
                {name: "EMM 406", x1: 953, y1: 282, x2: 1004, y2: 356, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 4TH FLOOR/EMM 405 ROOM.jpg"},
                
            ]



        }

    },
    FGM: 
    {
        "Floor 1":{
            map: "SchoolBlueprints/FGM 1ST.png",
            StartingPoint:{x1: 451,y1: 166,x2: 509,y2: 201},
            rooms:[{name: "FGM HALLWAY", x1: 451, y1:231, x2:692,y2:390, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 1st Floor Hallway.jpg" },
                {name: "FGM 1ST FLOOR STAIR", x1: 697,y1: 159,x2: 824,y2: 231, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 1st Floor Stairs 1.jpg" },
                {name: "FGM 102 FACULTY & STAFF CR", x1: 803,y1: 245,x2: 900,y2: 314, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 102 - Faculty & Staff CR.jpg" },
                {name: "FGM 109", x1: 178,y1: 136,x2: 280,y2: 245, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 109 - REEDO.jpg" },
                {name: "FGM 108", x1: 252,y1: 272,x2: 363,y2: 379, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 108 - Conference Room.jpg" },
                {name: "FGM 107", x1:333,y1: 411,x2: 444,y2: 488, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 1st Floor Hallway.jpg" },
                {name: "FGM ELEVATOR", x1: 743,y1: 536,x2: 808,y2: 580, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 1st Floor Elevator.jpg" },
                {name: "FGM REGISTRAR", x1: 717,y1: 319,x2: 903,y2: 407, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM Registrar's Office.jpg" },
                {name: "FGM CASHIER", x1: 759,y1: 617,x2: 861,y2: 721
, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM Cashier.jpg" },
                {name: "FGM FINANCE", x1: 711,y1: 421,x2: 877,y2: 527, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 1ST FLOOR/FGM 105 - Finance Office.jpg" },
            ]
            

        },"Floor 2":{
            map:"SchoolBlueprints/FGM 2ND.png",
            StartingPoint: {x1: 636,y1: 226,x2: 667,y2: 261},
            rooms:[{name: ""}]


    },"Floor 3":{
        map:"SchoolBlueprints/FGM 3RD.png"

    },"Floor 4":{
        map:"SchoolBlueprints/FGM 4TH.png"

    },"Floor 5":{
        map:"SchoolBlueprints/FGM 5TH.png"

    },"Floor 6":{

    }

    }


    
};

function showRooms(building) {
    const container = document.getElementById("buildingList");

    container.innerHTML = `
        <div class="room-item" onclick="location.reload()">
            <div class="room-number">←</div>
            <div class="room-title">Back</div>
        </div>
    `;

    Object.keys(data[building]).forEach((floor, i) => {
        container.innerHTML += `
            <div class="room-item" onclick="showFloor('${building}','${floor}')">
                <div class="room-number">${i + 1}</div>
                <div class="room-title">${floor}</div>
            </div>
        `;
    });
}

function showFloor(building, floor) {
    currentBuilding = building;
    currentFloor = floor;

    const floorImg = document.getElementById("floorImage");

    floorImg.onload = () => {
        drawRooms(building, floor);
    };

    floorImg.src = data[building][floor].map;
}

function drawRooms(building, floor) {
    console.log("Current Floor:", floor);
    console.log(data[building][floor]);
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const container = document.getElementById("mapContainer");
    

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const rooms = data[building][floor].rooms;
    const StartingPoint = data[building][floor].StartingPoint;

    const originalWidth = 1024;
    const originalHeight = 768;

    const scaleX = canvas.width / originalWidth;
    const scaleY = canvas.height / originalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ✅ SAVE CLICK AREAS
    rooms.forEach(room => {
        const x = room.x1 * scaleX;
        const y = room.y1 * scaleY;
        const w = (room.x2 - room.x1) * scaleX;
        const h = (room.y2 - room.y1) * scaleY;

        room.scaled = { x, y, w, h };
    });

    // ✅ CLICK HANDLER
    canvas.onclick = function (e) {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        rooms.forEach(room => {
            const r = room.scaled;

            if (
                mx >= r.x &&
                mx <= r.x + r.w &&
                my >= r.y &&
                my <= r.y + r.h
            ) {
                showRoom(room.img);
                drawPath(ctx, r, StartingPoint, scaleX, scaleY);
            }
        });
    };
}

function showRoom(img) {
    const overlay = document.getElementById("roomOverlay");
    const image = document.getElementById("roomImg");

    image.src = img;
    overlay.style.display = "flex"; // ✅ center image
}

function closeRoom() {
    document.getElementById("roomOverlay").style.display = "none";
}

document.getElementById("roomOverlay").addEventListener("click", function(e) {
    if (e.target.id === "roomOverlay") {
        closeRoom();
    }
});

// ✅ L-SHAPED NAVIGATION PATH (LIKE YOUR IMAGE)
function drawPath(ctx, room, StartingPoint, scaleX, scaleY) {

    const endX = room.x + room.w / 2;
    const endY = room.y + room.h / 2;

    const hx1 = StartingPoint.x1 * scaleX;
    const hy1 = StartingPoint.y1 * scaleY;
    const hx2 = StartingPoint.x2 * scaleX;
    const hy2 = StartingPoint.y2 * scaleY;

    const startX = hx1 + 20;
    const startY = (hy1 + hy2) / 2;

    const turnX = endX;
    const turnY = startY;

    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(turnX, turnY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    ctx.setLineDash([]);

    // ✅ ARROW HEAD
    const angle = Math.atan2(endY - turnY, endX - turnX);
    const size = 12;

    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
        endX - size * Math.cos(angle - Math.PI / 6),
        endY - size * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
        endX - size * Math.cos(angle + Math.PI / 6),
        endY - size * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fill();
}

// ✅ AUTO FIX ON RESIZE / ZOOM
const observer = new ResizeObserver(() => {
    if (currentBuilding && currentFloor) {
        drawRooms(currentBuilding, currentFloor);
    }
});

observer.observe(document.getElementById("mapContainer"));