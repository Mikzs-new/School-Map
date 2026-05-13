let grid = [];
let detectedRooms = [];
let currentBuilding = null;
let currentFloor = null;
let userLocation = null;
let activeRoute = null;
let activeRouteStep = 0;

// ============================================================
// BUILDING IMAGES — shown in canvas when building is selected
// ============================================================
const buildingImages = {
    EMM:      "SchoolBlueprints/EMM BUILDING.png",
    FGM:      "SchoolBlueprints/FGM BUILDING.png",
    AGM:      "SchoolBlueprints/AGM.png",
    Library:  "SchoolBlueprints/LIBRARY BUILDING.png",
    Entrance: "SchoolBlueprints/ENTRANCE.png"
};

// Campus overview image — shown on Buildings list view
const CAMPUS_OVERVIEW_IMAGE = "SchoolBlueprints/School_Blue_Print.PNG";

// ============================================================
// BUILDING CONNECTIONS
// ============================================================
const buildingConnections = {
    EMM:      { exitFloor: "Floor 1", exitRoom: "EMM 1ST FLOOR HALLWAY" },
    FGM:      { exitFloor: "Floor 1", exitRoom: "FGM HALLWAY" },
    AGM:      { exitFloor: "Floor 1", exitRoom: "AGM HALLWAY" },
    Library:  { exitFloor: "Floor 1", exitRoom: "Library HALLWAY" },
    Entrance: { exitFloor: "Floor 1", exitRoom: "LOBBY Pavement Entrance" }
};

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
                {name: "EMM 307", x1: 643, y1: 291, x2: 768, y2: 421, img:"SchoolPicture/EMM FLOOR BUILDING/EMM 3RD FLOOR/EMM 307 Education Program.jpg"},
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
        "Floor 2": {
            map: "SchoolBlueprints/FGM 2ND.png",
            StartingPoint: { x1: 636, y1: 226, x2: 667, y2: 261 },
            rooms: [
                {name: "FGM 2ND FLOOR CENTER HALLWAY", x1: 619, y1: 504, x2: 656, y2: 543, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 2ND FLOOR/FGM 2ND FLOOR CENTER HALLWAY.jpg"},
                {name: "FGM 2nd Floor Stairs 1", x1: 198, y1: 117, x2: 249, y2: 150, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 2ND FLOOR/FGM 2nd Floor Stairs 1.jpg"},
                {name: "FGM 2nd Floor Way", x1: 633, y1: 305, x2: 665, y2: 495, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 2ND FLOOR/FGM 2nd Floor Way.jpg"},
                {name: "FGM 2ND FLOOR CR MEN", x1: 732, y1: 268, x2: 788, y2: 284, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 2ND FLOOR/FGM 2ND FLOOR CR MEN.jpg"},
                {name: "FGM 202 - Nursing Skills Lab 1", x1: 663, y1: 286, x2: 781, y2: 414, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 2ND FLOOR/FGM 202 - Nursing Skills Lab 1.jpg"},
                {name: "FGM 203 - Nursing Skills Lab 2", x1: 668, y1: 421, x2: 790, y2: 545, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 2ND FLOOR/FGM 203 - Nursing Skills Lab 2.jpg"},
                {name: "FGM 205 - Nursing Skills Lab 3", x1: 589, y1: 606, x2: 691, y2: 717, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 2ND FLOOR/FGM 205 - Nursing Skills Lab 3.jpg"},
                {name: "FGM 206 Anatomy Lab", x1: 469, y1: 518, x2: 580, y2: 603, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 2ND FLOOR/FGM 206 Anatomy Lab.jpg"},
                {name: "FGM 209 - Electrical Room", x1: 383, y1: 432, x2: 434, y2: 451, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 2ND FLOOR/FGM 209 - Electrical Room.jpg"},
                {name: "FGM 210 - Instrumentation Room & Pharma Lab Extension", x1: 270, y1: 326, x2: 371, y2: 423, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 2ND FLOOR/FGM 210 - Instrumentation Room & Pharma Lab Extension.jpg"},
                {name: "FGM 211 - Nursing Skills Lab 4", x1: 193, y1: 203, x2: 304, y2: 289, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 2ND FLOOR/FGM 211 - Nursin Skills Lab 4.jpg"}
            ]
        },
        "Floor 3": {
            map: "SchoolBlueprints/FGM 3RD.png",
            StartingPoint: { x1: 633, y1: 305, x2: 665, y2: 340 },
            rooms: [
                {name: "FGM 3rd Floor Hallway", x1: 638, y1: 289, x2: 672, y2: 467, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 3RD FLOOR/FGM 3rd Floor Hallway.jpg"},
                {name: "FGM 3rd Floor Stairs 1", x1: 707, y1: 240, x2: 758, y2: 282, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 3RD FLOOR/FGM 3rd Floor Stairs 1.jpg"},
                {name: "FGM 3rd Floor Stairs 2", x1: 235, y1: 136, x2: 286, y2: 173, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 3RD FLOOR/FGM 3rd Floor Stairs 2.jpg"},
                {name: "FGM 3rd Floor Elevator", x1: 707, y1: 541, x2: 739, y2: 580, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 3RD FLOOR/FGM 3rd Floor Elevator.jpg"},
                {name: "FGM 3rd Floor Electrical Room", x1: 413, y1: 427, x2: 455, y2: 448, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 3RD FLOOR/FGM 3rd Floor Electrical Room.jpg"},
                {name: "FGM 301 - CR Men", x1: 763, y1: 240, x2: 786, y2: 284, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 3RD FLOOR/FGM 301 - CR Men.jpg"},
                {name: "FGM 302 Room", x1: 670, y1: 296, x2: 790, y2: 407, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 3RD FLOOR/FGM 302 Room.jpg"},
                {name: "FGM 303 Room", x1: 675, y1: 416, x2: 783, y2: 529, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 3RD FLOOR/FGM 303 Room.jpg"},
                {name: "FGM 306 Room", x1: 603, y1: 599, x2: 689, y2: 680, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 3RD FLOOR/FGM 306 Room.jpg"},
                {name: "FGM 307 Room", x1: 501, y1: 506, x2: 591, y2: 599, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 3RD FLOOR/FGM 307 Room.jpg"},
                {name: "FGM 308 Room", x1: 385, y1: 508, x2: 464, y2: 566, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 3RD FLOOR/FGM 308 Room.jpg"}
            ]
        },
        "Floor 4": {
            map: "SchoolBlueprints/FGM 4TH.png",
            StartingPoint: { x1: 665, y1: 233, x2: 672, y2: 240 },
            StartingPoint: { x1: 286, y1: 92, x2: 297, y2: 106 },
            rooms: [
                {name: "FGM 4TH FLOOR CENTER HALLWAY", x1: 633, y1: 483, x2: 691, y2: 529, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 4TH FLOOR CENTER HALLWAY.jpg"},
                {name: "FGM 4TH FLOOR HALLWAY", x1: 661, y1: 279, x2: 691, y2: 471, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 4TH FLOOR HALLWAY.jpg"},
                {name: "FGM 4TH FLOOR CR MEN", x1: 786, y1: 219, x2: 811, y2: 256, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 4TH FLOOR CR MEN.jpg"},
                {name: "FGM 4TH FLOOR EMERGENCY EXIT HALLWAY", x1: 709, y1: 573, x2: 744, y2: 645, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 4TH FLOOR EMERGENCY EXIT HALLWAY.jpg"},
                {name: "FGM 4th Floor Elevator", x1: 719, y1: 532, x2: 758, y2: 576, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 4th Floor Evelator.jpg"},
                {name: "FGM 4th Floor Fire Exit", x1: 749, y1: 684, x2: 781, y2: 705, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 4th Floor Fire Exit.jpg"},
                {name: "FGM 4th Floor Stairs 1", x1: 721, y1: 201, x2: 779, y2: 249, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 4th Floor Stairs 1.jpg"},
                {name: "FGM 4TH FLOOR STAIRS 2", x1: 214, y1: 85, x2: 265, y2: 131, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 4TH FLOOR STAIRS 2.jpg"},
                {name: "FGM 4TH FLOOR TAMBAYAN", x1: 381, y1: 455, x2: 485, y2: 552, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 4TH FLOOR TAMBAYAN.jpg"},
                {name: "FGM 402 Room", x1: 693, y1: 268, x2: 807, y2: 395, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 402 ROOM.jpg"},
                {name: "FGM 403 Room", x1: 691, y1: 407, x2: 811, y2: 525, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 403 ROOM.jpg"},
                {name: "FGM 404 - Chemistry Laboratory", x1: 774, y1: 599, x2: 851, y2: 682, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 404 - Chemistry Laboratory.jpg"},
                {name: "FGM 405 Room", x1: 619, y1: 599, x2: 709, y2: 691, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 405 ROOM.jpg"},
                {name: "FGM 406 Room", x1: 494, y1: 490, x2: 610, y2: 599, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 406 ROOM.jpg"},
                {name: "FGM 407 - Stock Room", x1: 418, y1: 418, x2: 459, y2: 434, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 407 - Stock Room.jpg"},
                {name: "FGM 408 - Electrical Room", x1: 418, y1: 418, x2: 459, y2: 434, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 408 - Electrical Room.jpg"},
                {name: "FGM 409 Room", x1: 277, y1: 309, x2: 406, y2: 407, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 409 ROOM.jpg"},
                {name: "FGM 410 Room", x1: 210, y1: 185, x2: 330, y2: 259, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 4TH FLOOR/FGM 410 ROOM.jpg"}
            ]
        },
        "Floor 5": {
            map: "SchoolBlueprints/FGM 5TH.png",
            StartingPoint: { x1: 679, y1: 229, x2: 693, y2: 204 },
            StartingPoint: { x1: 265, y1: 90, x2: 279, y2: 97 },
            rooms: [
                {name: "FGM 5th Floor Hallway", x1: 665, y1: 296, x2: 693, y2: 476, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 5TH FLOOR/FGM 5th Floor Hall Way.jpg"},
                {name: "FGM 5th Floor Elevator", x1: 719, y1: 529, x2: 770, y2: 576, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 5TH FLOOR/FGM 5th Floor Elevator.jpg"},
                {name: "FGM 5th Floor Stairs 1", x1: 716, y1: 215, x2: 788, y2: 261, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 5TH FLOOR/FGM 5th Floor Stairs 1.jpg"},
                {name: "FGM 5th Floor Stairs 2", x1: 200, y1: 87, x2: 523, y2: 127, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 5TH FLOOR/FGM 5th Floor Stairs 2.jpg"},
                {name: "FGM 502 - Criminology Laboratory", x1: 700, y1: 282, x2: 816, y2: 520, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 5TH FLOOR/FGM 502 - Criminology Laboratory.jpg"},
                {name: "FGM 506 - Dark Room Forensic Photography", x1: 638, y1: 659, x2: 714, y2: 694, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 5TH FLOOR/FGM 506 - Dark Room Forensic Photography.jpg"},
                {name: "FGM 507 - Crime Scene Room", x1: 598, y1: 580, x2: 684, y2: 636, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 5TH FLOOR/FGM 507 - Crime Scene Room.jpg"},
                {name: "FGM 508 - Faculty Lounge", x1: 522, y1: 511, x2: 594, y2: 566, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 5TH FLOOR/FGM 508 - Faculty Lounge.jpg"},
                {name: "FGM 509 - Court Room", x1: 464, y1: 469, x2: 503, y2: 562, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 5TH FLOOR/FGM 509 - Court Room.jpg"},
                {name: "FGM 511 - Electrical Room", x1: 383, y1: 409, x2: 439, y2: 437, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 5TH FLOOR/FGM 511 - Electrical Room.jpg"},
                {name: "FGM 512 Room", x1: 277, y1: 312, x2: 390, y2: 397, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 5TH FLOOR/FGM 512 Room.jpg"},
                {name: "FGM 513 Room", x1: 196, y1: 175, x2: 309, y2: 272, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 5TH FLOOR/FGM 513 Room.jpg"}
            ]
        },
        "Floor 6": {
            map: "SchoolBlueprints/FGM 6TH.png",
            StartingPoint: { x1: 682, y1: 171, x2: 693, y2: 189 },
            StartingPoint: { x1: 267, y1: 90, x2: 279, y2: 97 },
            rooms: [
                {name: "FGM 6TH FLOOR CR MEN", x1: 804, y1: 141, x2: 846, y2: 224, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 6TH FLOOR/FGM 6TH FLOOR CR MEN.jpg"},
                {name: "FGM 6TH FLOOR Hallway", x1: 665, y1: 215, x2: 698, y2: 476, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 6TH FLOOR/FGM 6TH FLOOR.jpg"},
                {name: "FGM 6th Floor Elevator", x1: 705, y1: 488, x2: 779, y2: 539, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 6TH FLOOR/FGM 6th Floor Evelator.jpg"},
                {name: "FGM 6th Floor Stairs 1", x1: 732, y1: 136, x2: 802, y2: 210, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 6TH FLOOR/FGM 6th Floor Stairs 1.jpg"},
                {name: "FGM 602 Room", x1: 705, y1: 226, x2: 846, y2: 358, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 6TH FLOOR/FGM 602 ROOM.jpg"},
                {name: "FGM 603 Room", x1: 700, y1: 363, x2: 844, y2: 483, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 6TH FLOOR/FGM 603 ROOM.jpg"},
                {name: "FGM 604 Room", x1: 746, y1: 548, x2: 878, y2: 684, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 6TH FLOOR/FGM 604 ROOM.jpg"},
                {name: "FGM 605 Room", x1: 589, y1: 571, x2: 684, y2: 677, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 6TH FLOOR/FGM 605 Room.jpg"},
                {name: "FGM 606 Room", x1: 503, y1: 497, x2: 605, y2: 569, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 6TH FLOOR/FGM 606 ROOM.jpg"},
                {name: "FGM 607 Room", x1: 330, y1: 455, x2: 434, y2: 562, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 6TH FLOOR/FGM 607 ROOM.jpg"},
                {name: "FGM 608 Room", x1: 455, y1: 458, x2: 499, y2: 539, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 6TH FLOOR/FGM 608 ROOM.jpg"},
                {name: "FGM 609 - Electrical Room", x1: 374, y1: 407, x2: 427, y2: 425, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 6TH FLOOR/FGM 609 - Electrical Room.jpg"},
                {name: "FGM 610 Room", x1: 249, y1: 309, x2: 381, y2: 414, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 6TH FLOOR/FGM 610 ROOM.jpg"},
                {name: "FGM 611 Room", x1: 170, y1: 171, x2: 309, y2: 263, img:"SchoolPicture/FGM FLOORS BUILDING/FGM 6TH FLOOR/FGM 611 ROOM.jpg"}
            ]
        }
    },
    AGM: {
        "Floor 1": {
            map: "SchoolBlueprints/AGM 1ST FLOOR.png",
            StartingPoint: { x1: 418, y1: 448, x2: 448, y2: 467 },
            rooms: [
                {name: "AGM HALLWAY", x1: 409, y1: 312, x2: 469, y2: 460, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 1ST FLOOR/AGM 1st Floor Hallway.jpg"},
                {name: "AGM 1ST FLOOR STAIRS", x1: 832, y1: 205, x2: 892, y2: 240, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 1ST FLOOR/AGM 1st Floor Stairs 1.jpg"},
                {name: "AGM 2ND FLOOR STAIRS", x1: 115, y1: 395, x2: 145, y2: 434, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 1ST FLOOR/AGM 1st Floor Stairs 2.jpg"},
                {name: "AGM 101 Hydraulic Laboratory", x1: 103, y1: 455, x2: 240, y2: 548, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 1ST FLOOR/AGM 101 - Hydraulics Labaratory.jpg"},
                {name: "AGM-102 Material Testing Lab", x1: 154, y1: 349, x2: 404, y2: 432, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 1ST FLOOR/AGM 102 - Materials & Testing Labaratory.jpg"},
                {name: "AGM-103 CBE Office", x1: 228, y1: 309, x2: 404, y2: 340, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 1ST FLOOR/AGM 103 - CBE Office.jpg"},
                {name: "AGM-104 CAS Office", x1: 469, y1: 347, x2: 582, y2: 437, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 1ST FLOOR/AGM 104 - CAS Office.jpg"},
                {name: "AGM-105 Guidance Office", x1: 584, y1: 347, x2: 709, y2: 437, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 1ST FLOOR/AGM 105 - Guidance Office.jpg"},
                {name: "AGM-106 Counseling Office", x1: 707, y1: 344, x2: 774, y2: 434, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 1ST FLOOR/AGM 106 - Counseling Office.jpg"},
                {name: "AGM-SG S/G Room", x1: 466, y1: 314, x2: 582, y2: 344, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 1ST FLOOR/AGM 111 - Security Officers Office.jpg"},
                {name: "AGM-MAINT Maintenance Room", x1: 582, y1: 316, x2: 712, y2: 340, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 1ST FLOOR/"},
                {name: "AGM-107 Room", x1: 598, y1: 460, x2: 765, y2: 548, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 1ST FLOOR/AGM 107 Room.jpg"},
                {name: "AGM-108 CR", x1: 767, y1: 481, x2: 832, y2: 545, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 1ST FLOOR/"},
                {name: "ROAD VEHICLE ROAD", x1: 38, y1: 358, x2: 98, y2: 464, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 1ST FLOOR/ROAD Vehicle Road.jpg"},
                {name: "AGM Canteen", x1: 776, y1: 253, x2: 890, y2: 326, img:"SchoolPicture/AGM GROUND FLOOR/AGM 1ST FLOOR/AGM Canteen.jpg"}
            ]
        },
        "Floor 2": {
            map: "SchoolBlueprints/AGM 2ND FLOOR.png",
            StartingPoint: { x1: 804, y1: 312, x2: 820, y2: 323 },
            rooms: [
                {name: "AGM HALLWAY", x1: 226, y1: 309, x2: 844, y2: 335, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 2ND Floor Hallway.jpg"},
                {name: "AGM 2ND Floor Stairs 1", x1: 85, y1: 490, x2: 131, y2: 515, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 2ND Floor Stairs 1.jpg"},
                {name: "AGM 2ND Floor Stairs 2", x1: 807, y1: 333, x2: 830, y2: 381, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 2ND Floor Stairs 2.jpg"},
                {name: "AGM 200 - Electrical Room", x1: 76, y1: 522, x2: 155, y2: 575, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 200 - Electrical Room.jpg"},
                {name: "AGM 201 - Customs Administration Simulation Room", x1: 78, y1: 427, x2: 152, y2: 483, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 201 - Customs Administration Simulation Room.jpg"},
                {name: "AGM 202 Room", x1: 84, y1: 343, x2: 168, y2: 415, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 202 Room.jpg"},
                {name: "AGM 203 - Criminology Internship Unit", x1: 115, y1: 259, x2: 191, y2: 318, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 203 - Criminology Internship Unit.jpg"},
                {name: "AGM 204 - General Education Program", x1: 216, y1: 219, x2: 303, y2: 287, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 204 - General Education Program.jpg"},
                {name: "AGM 206 Room", x1: 315, y1: 217, x2: 426, y2: 298, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 206 Room.jpg"},
                {name: "AGM 207 - Psychology Labaratory", x1: 457, y1: 337, x2: 610, y2: 419, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 207 - Psychology Labaratory.jpg"},
                {name: "AGM 207 Room", x1: 400, y1: 334, x2: 459, y2: 419, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 207 - Psychology Labaratory.jpg"},
                {name: "AGM 208 Room", x1: 432, y1: 220, x2: 524, y2: 297, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 208 Room.jpg"},
                {name: "AGM 209 - Engineering Program", x1: 618, y1: 339, x2: 683, y2: 419, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 209 - Engineering Program.jpg"},
                {name: "AGM 210 Room", x1: 533, y1: 218, x2: 636, y2: 301, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 210 Room.jpg"},
                {name: "AGM 211 Room", x1: 691, y1: 337, x2: 798, y2: 422, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 211 Room.jpg"},
                {name: "AGM 212 - AB English Simulation Room", x1: 642, y1: 217, x2: 731, y2: 302, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 212 - AB English Simulation Room.jpg"},
                {name: "AGM 213 - Communication Hub", x1: 226, y1: 309, x2: 844, y2: 335, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 2ND Floor Hallway.jpg"},
                {name: "AGM 214 - Mass Communication Simulation Room", x1: 742, y1: 215, x2: 837, y2: 301, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 214 - Mass Communication Simulation Room.jpg"},
                {name: "AGM 216 - ETEEAP Office", x1: 840, y1: 220, x2: 907, y2: 301, img:"SchoolPicture/AGM FLOORS BUILDING/AGM 2ND FLOOR/AGM 216 - ETEEAP Office.jpg"}
            ]
        }
    },
    Library: {
        "Floor 1": {
            map: "SchoolBlueprints/LIBRARY 1ST FLOOR.png",
            StartingPoint: { x1: 120, y1: 205, x2: 814, y2: 272 },
            rooms: [
                {name: "Library HALLWAY", x1: 120, y1: 205, x2: 814, y2: 272, img:"SchoolPicture/LIBRARY FLOORS BUILDING/LIBRARY Pavement Entrance.jpg"},
                {name: "LIBRARY 2nd Floor Stairs", x1: 115, y1: 362, x2: 191, y2: 491, img:"SchoolPicture/LIBRARY FLOORS BUILDING/LIBRARY 2nd Floor Stairs.jpg"}
            ]
        },
        "Floor 2": {
            map: "SchoolBlueprints/LIBRARY 2ND FLOOR.png",
            StartingPoint: { x1: 113, y1: 454, x2: 194, y2: 493 },
            rooms: [
                {name: "Library HALLWAY", x1: 113, y1: 454, x2: 194, y2: 493, img:"SchoolPicture/LIBRARY FLOORS BUILDING/LIBRARY 2nd Floor Stairs.jpg"},
                {name: "LIBRARY 2nd Floor", x1: 113, y1: 281, x2: 194, y2: 360, img:"SchoolPicture/LIBRARY FLOORS BUILDING/LIBRARY 2nd Floor.jpg"}
            ]
        },
        "Floor 3": {
            map: "SchoolBlueprints/LIBRARY 3RD FLOOR.png",
            StartingPoint: { x1: 109, y1: 367, x2: 194, y2: 489 },
            rooms: [
                {name: "Library HALLWAY", x1: 109, y1: 367, x2: 194, y2: 489, img:"SchoolPicture/LIBRARY FLOORS BUILDING/LIBRARY 3rd Floor Stairs.jpg"},
                {name: "Library 3rd Floor", x1: 115, y1: 279, x2: 186, y2: 343, img:"SchoolPicture/LIBRARY FLOORS BUILDING/Library 3rd Floor.jpg"}
            ]
        },
        "Floor 4": {
            map: "SchoolBlueprints/LIBRARY 4TH FLOOR.png",
            StartingPoint: { x1: 115, y1: 376, x2: 193, y2: 493 },
            rooms: [
                {name: "Library HALLWAY", x1: 115, y1: 376, x2: 193, y2: 493, img:"SchoolPicture/LIBRARY FLOORS BUILDING/LIBRARY 4th Floor Stairs.jpg"},
                {name: "Library 4th Floor", x1: 115, y1: 279, x2: 193, y2: 354, img:"SchoolPicture/LIBRARY FLOORS BUILDING/LIBRARY Theatre.jpg"}
            ]
        }
    },
    Entrance: {
        "Floor 1": {
            map: "SchoolBlueprints/Entrance.png",
            StartingPoint: { x1: 469, y1: 594, x2: 501, y2: 619 },
            rooms: [
                {name: "LOBBY Emergency Exit", x1: 837, y1: 326, x2: 1017, y2: 423, img:"SchoolPicture/ENTRANCE/LOBBY Emergency Exit.jpg"},
                {name: "LOBBY Pavement Entrance", x1: 589, y1: 330, x2: 719, y2: 414, img:"SchoolPicture/ENTRANCE/LOBBY Pavement Entrance.jpg"}
            ]
        }
    }
};


// ============================================================
// SHOW OVERVIEW IMAGE — FIX: reset src first, assign handlers
// before setting src to avoid race condition with cached images
// ============================================================
function showOverviewImage(imagePath) {
    const fi = document.getElementById("floorImage");
    fi.onload  = null;
    fi.onerror = null;
    fi.src = "";
    fi.style.objectFit = "contain";

    fi.onerror = function () {
        console.error("❌ Failed to load image:", imagePath);
        fi.onerror = null;
    };
    fi.onload = function () {
        console.log("✅ Image loaded:", imagePath);
        fi.onload = null;
    };

    fi.src = imagePath;

    const canvas = document.getElementById("canvas");
    const ctx    = canvas.getContext("2d");
    const mc     = document.getElementById("mapContainer");
    canvas.width  = mc.clientWidth;
    canvas.height = mc.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.onclick = null;

    grid = [];
    detectedRooms = [];
}


// ============================================================
// ROUTE PLANNING
// ============================================================
function buildRoute(destBuilding, destFloor, destRoom) {
    if (!userLocation) return null;
    const srcBuilding = userLocation.building, srcFloor = userLocation.floor, srcRoom = userLocation.room;
    const steps = [];
    const isSameBuilding = srcBuilding === destBuilding;
    const isSameFloor    = isSameBuilding && srcFloor === destFloor;

    if (isSameFloor) {
        steps.push({ building: srcBuilding, floor: srcFloor, fromRoom: srcRoom, toRoom: destRoom, label: `Walk to ${destRoom.name}`, type: "destination" });
        return steps;
    }

    if (isSameBuilding) {
        const srcFloorNum  = parseInt(srcFloor.replace("Floor ", ""));
        const destFloorNum = parseInt(destFloor.replace("Floor ", ""));
        const srcStairs    = findStairsRoom(srcBuilding, srcFloor);
        if (srcStairs) steps.push({ building: srcBuilding, floor: srcFloor, fromRoom: srcRoom, toRoom: srcStairs, label: `Walk to stairs on ${srcFloor}`, type: "stairs" });
        const destStairs = findStairsRoom(srcBuilding, destFloor);
        const dir = destFloorNum > srcFloorNum ? "up ↑" : "down ↓";
        steps.push({
            building: srcBuilding, floor: destFloor,
            fromRoom: destStairs || data[srcBuilding][destFloor]?.StartingPoint,
            toRoom: destRoom,
            label: `Take stairs ${dir} to ${destFloor}, walk to ${destRoom.name}`,
            type: "destination"
        });
        return steps;
    }

    const srcFloorNum = parseInt(srcFloor.replace("Floor ", ""));
    if (srcFloorNum > 1) {
        const srcStairs = findStairsRoom(srcBuilding, srcFloor);
        if (srcStairs) steps.push({ building: srcBuilding, floor: srcFloor, fromRoom: srcRoom, toRoom: srcStairs, label: `Walk to stairs — ${srcBuilding} ${srcFloor}`, type: "stairs" });
        const exitRoom = findExitRoom(srcBuilding);
        steps.push({ building: srcBuilding, floor: "Floor 1", fromRoom: findStairsRoom(srcBuilding, "Floor 1") || null, toRoom: exitRoom || null, label: `Descend to Floor 1 and exit ${srcBuilding} Building`, type: "exit" });
    } else {
        const exitRoom = findExitRoom(srcBuilding);
        if (exitRoom) steps.push({ building: srcBuilding, floor: "Floor 1", fromRoom: srcRoom, toRoom: exitRoom, label: `Walk to exit — ${srcBuilding} Building`, type: "exit" });
    }

    steps.push({ building: null, floor: null, fromRoom: null, toRoom: null, label: `Walk across campus to ${destBuilding} Building`, type: "transit" });

    const destFloorNum  = parseInt(destFloor.replace("Floor ", ""));
    const destEntrance  = findExitRoom(destBuilding);
    if (destFloorNum > 1) {
        if (destEntrance) steps.push({ building: destBuilding, floor: "Floor 1", fromRoom: destEntrance, toRoom: findStairsRoom(destBuilding, "Floor 1") || null, label: `Enter ${destBuilding} Building and go to stairs`, type: "enter" });
        const destStairs = findStairsRoom(destBuilding, destFloor);
        steps.push({ building: destBuilding, floor: destFloor, fromRoom: destStairs || null, toRoom: destRoom, label: `Take stairs up ↑ to ${destFloor}, walk to ${destRoom.name}`, type: "destination" });
    } else {
        steps.push({ building: destBuilding, floor: "Floor 1", fromRoom: destEntrance || null, toRoom: destRoom, label: `Walk to ${destRoom.name} — ${destBuilding} Building`, type: "destination" });
    }
    return steps;
}

function findStairsRoom(building, floor) {
    return (data[building]?.[floor]?.rooms || []).find(r => r.name.toLowerCase().includes("stair")) || null;
}
function findExitRoom(building) {
    const conn = buildingConnections[building];
    if (!conn?.exitRoom) return null;
    return (data[building]?.[conn.exitFloor]?.rooms || []).find(r => r.name === conn.exitRoom) || null;
}

// ============================================================
// ROUTE UI
// ============================================================
const stepIcons  = { start: "🟢", stairs: "🪜", exit: "🚪", transit: "🚶", enter: "🏢", destination: "🏁" };
const stepColors = { start: "type-start", stairs: "type-stairs", exit: "type-exit", transit: "type-transit", enter: "type-enter", destination: "type-destination" };

function showRoutePanel(steps, destRoom) {
    activeRoute      = steps;
    activeRouteStep  = 0;

    const fromText = userLocation ? `${userLocation.room.name} · ${userLocation.building} ${userLocation.floor}` : "Your location";
    const toText   = `${destRoom.name} · ${steps[steps.length-1]?.building || ""} ${steps[steps.length-1]?.floor || ""}`;
    document.getElementById("rpFrom").textContent = fromText;
    document.getElementById("rpTo").textContent   = toText;

    const list = document.getElementById("routeStepsList");
    list.innerHTML = "";

    steps.forEach((step, i) => {
        const isTransit = step.type === "transit";
        const el = document.createElement("div");
        el.className = `rs-item${isTransit ? " rs-transit" : ""}`;
        el.id = `rsItem${i}`;
        if (!isTransit) el.onclick = () => viewRouteStep(i);

        const iconClass = stepColors[step.type] || "type-destination";
        const icon      = stepIcons[step.type]  || "➡️";
        const subBadge  = step.building && step.floor ? `<span class="rs-sub-badge">${step.building} · ${step.floor}</span>` : "";

        el.innerHTML = `
            <div class="rs-left">
                <div class="rs-icon-wrap ${iconClass}" id="rsIcon${i}">${icon}</div>
                <div class="rs-line" id="rsLine${i}"></div>
            </div>
            <div class="rs-body">
                <div class="rs-step-num">Step ${i + 1}</div>
                <div class="rs-label">${step.label}</div>
                <div class="rs-sub">${subBadge}</div>
                <div class="rs-view-hint">👆 Viewing on map</div>
            </div>
        `;
        list.appendChild(el);
    });

    const dotsEl = document.getElementById("rpDots");
    dotsEl.innerHTML = steps.map((_, i) => `<div class="rp-dot" id="rpDot${i}"></div>`).join("");

    document.getElementById("routePanel").style.display = "flex";
    updateRouteStepUI(0);
    viewRouteStep(0);
}

function updateRouteStepUI(idx) {
    if (!activeRoute) return;
    const total = activeRoute.length;
    document.getElementById("rpStepCounter").textContent = `Step ${idx + 1} of ${total}`;
    document.getElementById("rpPrevBtn").disabled = idx === 0;
    document.getElementById("rpNextBtn").disabled = idx === total - 1;

    document.querySelectorAll(".rs-item").forEach((el, i) => { el.classList.toggle("rs-active", i === idx); });
    document.querySelectorAll(".rp-dot").forEach((dot, i) => { dot.className = "rp-dot" + (i === idx ? " active" : i < idx ? " done" : ""); });
    document.querySelectorAll(".rs-line").forEach((line, i) => { line.classList.toggle("done", i < idx); });

    const activeEl = document.getElementById(`rsItem${idx}`);
    if (activeEl) activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ============================================================
// VIEW ROUTE STEP
// ============================================================
async function viewRouteStep(idx) {
    if (!activeRoute) return;
    const step = activeRoute[idx];
    if (!step) return;

    activeRouteStep = idx;
    updateRouteStepUI(idx);

    if (!step.building || !step.floor) {
        const label = document.getElementById("mapStepLabel");
        label.style.display = "block";
        label.textContent = step.label;
        return;
    }

    const label = document.getElementById("mapStepLabel");
    label.style.display = "block";
    label.textContent = `${step.building} · ${step.floor}`;

    showRooms(step.building);
    await loadGrid(step.building, step.floor);
    showFloor(step.building, step.floor);

    const floorImage = document.getElementById("floorImage");

    const doHighlight = () => {
        const canvas = document.getElementById("canvas");
        const ctx    = canvas.getContext("2d");
        const scaleX = canvas.width / 1024;
        const scaleY = canvas.height / 768;
        const floorData = data[step.building][step.floor];
        const rooms = floorData.rooms;

        rooms.forEach(r => { r.scaled = { x: r.x1 * scaleX, y: r.y1 * scaleY, w: (r.x2 - r.x1) * scaleX, h: (r.y2 - r.y1) * scaleY }; });

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rooms.forEach(r => {
            ctx.strokeStyle = "rgba(0,100,220,0.4)"; ctx.lineWidth = 1.5; ctx.setLineDash([]); ctx.strokeRect(r.scaled.x, r.scaled.y, r.scaled.w, r.scaled.h);
        });

        const fromRoom = step.fromRoom;
        const toRoom   = step.toRoom;
        if (!toRoom) return;

        const toScaled = { x: toRoom.x1 * scaleX, y: toRoom.y1 * scaleY, w: (toRoom.x2 - toRoom.x1) * scaleX, h: (toRoom.y2 - toRoom.y1) * scaleY };

        ctx.fillStyle = "rgba(249,115,22,0.2)"; ctx.fillRect(toScaled.x, toScaled.y, toScaled.w, toScaled.h);
        ctx.strokeStyle = "rgba(249,115,22,0.9)"; ctx.lineWidth = 2.5; ctx.setLineDash([]); ctx.strokeRect(toScaled.x, toScaled.y, toScaled.w, toScaled.h);
        ctx.fillStyle = "rgba(249,115,22,0.95)"; ctx.font = "bold 10px Inter,sans-serif"; ctx.textAlign = "center";
        ctx.fillText("▶ DESTINATION", toScaled.x + toScaled.w / 2, toScaled.y - 5); ctx.textAlign = "left";

        if (fromRoom && fromRoom !== toRoom) {
            const fromScaled = { x: fromRoom.x1 * scaleX, y: fromRoom.y1 * scaleY, w: (fromRoom.x2 - fromRoom.x1) * scaleX, h: (fromRoom.y2 - fromRoom.y1) * scaleY };
            ctx.fillStyle = "rgba(34,197,94,0.15)"; ctx.fillRect(fromScaled.x, fromScaled.y, fromScaled.w, fromScaled.h);
            ctx.strokeStyle = "rgba(34,197,94,0.8)"; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); ctx.strokeRect(fromScaled.x, fromScaled.y, fromScaled.w, fromScaled.h); ctx.setLineDash([]);
        }

        let spForPath;
        if (fromRoom && fromRoom.x1 !== undefined) {
            const cx = (fromRoom.x1 + fromRoom.x2) / 2;
            const cy = (fromRoom.y1 + fromRoom.y2) / 2;
            spForPath = { x1: cx, y1: cy, x2: cx, y2: cy };
        } else {
            spForPath = floorData.StartingPoint;
        }

        toRoom.scaled = toScaled;
        drawPath(ctx, toScaled, spForPath, scaleX, scaleY, true);
    };

    if (floorImage.complete && floorImage.naturalWidth > 0) {
        setTimeout(doHighlight, 80);
    } else {
        floorImage.addEventListener("load", () => setTimeout(doHighlight, 80), { once: true });
    }
}

function closeRoutePanel() {
    document.getElementById("routePanel").style.display = "none";
    document.getElementById("mapStepLabel").style.display = "none";
    activeRoute     = null;
    activeRouteStep = 0;
}

function prevRouteStep() { if (activeRouteStep > 0) viewRouteStep(activeRouteStep - 1); }
function nextRouteStep() { if (activeRoute && activeRouteStep < activeRoute.length - 1) viewRouteStep(activeRouteStep + 1); }

// ============================================================
// USER LOCATION
// ============================================================
function getEffectiveStartingPoint(building, floor, floorData) {
    if (userLocation?.building === building && userLocation?.floor === floor && userLocation?.room) {
        const r  = userLocation.room;
        const cx = (r.x1 + r.x2) / 2;
        const cy = (r.y1 + r.y2) / 2;
        return { x1: cx, y1: cy, x2: cx, y2: cy };
    }
    return floorData.StartingPoint;
}

function openLocationModal() {
    document.getElementById("locationModal").style.display = "flex";
    const bSel = document.getElementById("locBuilding");
    bSel.innerHTML = '<option value="">— Select a building —</option>';
    Object.keys(data).forEach(b => {
        const opt = document.createElement("option");
        opt.value = b; opt.textContent = `${b} Building`;
        bSel.appendChild(opt);
    });
    if (userLocation) {
        bSel.value = userLocation.building; onLocBuildingChange();
        setTimeout(() => {
            document.getElementById("locFloor").value = userLocation.floor; onLocFloorChange();
            setTimeout(() => {
                const rooms = data[userLocation.building]?.[userLocation.floor]?.rooms || [];
                const idx   = rooms.findIndex(r => r.name === userLocation.room?.name);
                if (idx >= 0) document.getElementById("locRoom").value = idx;
                updateConfirmBtn();
            }, 0);
        }, 0);
    } else {
        document.getElementById("locFloor").innerHTML = '<option value="">— Select a floor —</option>';
        document.getElementById("locFloor").disabled  = true;
        document.getElementById("locRoom").innerHTML  = '<option value="">— Select a room or area —</option>';
        document.getElementById("locRoom").disabled   = true;
        document.getElementById("locConfirmBtn").disabled = true;
    }
}
function closeLocationModal() { document.getElementById("locationModal").style.display = "none"; }

function onLocBuildingChange() {
    const b    = document.getElementById("locBuilding").value;
    const fSel = document.getElementById("locFloor");
    const rSel = document.getElementById("locRoom");
    fSel.innerHTML = '<option value="">— Select a floor —</option>';
    rSel.innerHTML = '<option value="">— Select a room or area —</option>';
    fSel.disabled = !b; rSel.disabled = true;
    document.getElementById("locConfirmBtn").disabled = true;
    if (!b) return;
    Object.keys(data[b]).forEach(f => {
        const opt = document.createElement("option"); opt.value = f; opt.textContent = f; fSel.appendChild(opt);
    });
}

function onLocFloorChange() {
    const b    = document.getElementById("locBuilding").value;
    const f    = document.getElementById("locFloor").value;
    const rSel = document.getElementById("locRoom");
    rSel.innerHTML = '<option value="">— Select a room or area —</option>';
    rSel.disabled  = !f;
    document.getElementById("locConfirmBtn").disabled = true;
    if (!b || !f) return;
    const rooms = data[b]?.[f]?.rooms || [];
    if (rooms.length === 0) {
        const opt = document.createElement("option"); opt.value = ""; opt.textContent = "No rooms defined yet"; opt.disabled = true; rSel.appendChild(opt); return;
    }
    rooms.forEach((r, i) => {
        const opt = document.createElement("option"); opt.value = i; opt.textContent = r.name; rSel.appendChild(opt);
    });
    rSel.onchange = updateConfirmBtn;
}

function updateConfirmBtn() {
    const b = document.getElementById("locBuilding").value;
    const f = document.getElementById("locFloor").value;
    const r = document.getElementById("locRoom").value;
    document.getElementById("locConfirmBtn").disabled = !(b && f && r !== "");
}

function confirmLocation() {
    const b   = document.getElementById("locBuilding").value;
    const f   = document.getElementById("locFloor").value;
    const idx = parseInt(document.getElementById("locRoom").value);
    const room = data[b]?.[f]?.rooms?.[idx];
    if (!b || !f || !room) return;
    userLocation = { building: b, floor: f, room };
    localStorage.setItem("userLocation", JSON.stringify({ building: b, floor: f, roomName: room.name }));
    updateLocationStatus(); closeLocationModal();
    if (currentBuilding === b && currentFloor === f) showFloor(b, f);
}

function clearLocation() {
    userLocation = null;
    localStorage.removeItem("userLocation");
    updateLocationStatus(); closeLocationModal();
    if (currentBuilding && currentFloor) showFloor(currentBuilding, currentFloor);
}

function updateLocationStatus() {
    const s = document.getElementById("locationStatus");
    const t = document.getElementById("locationStatusText");
    if (userLocation) {
        s.className = "set";
        t.textContent = `📍 ${userLocation.room.name} · ${userLocation.building} ${userLocation.floor}`;
    } else {
        s.className = "";
        t.textContent = "No location set — using default start";
    }
}

function restoreUserLocation() {
    try {
        const saved = JSON.parse(localStorage.getItem("userLocation"));
        if (saved?.building && saved?.floor && saved?.roomName) {
            const room = (data[saved.building]?.[saved.floor]?.rooms || []).find(r => r.name === saved.roomName);
            if (room) { userLocation = { building: saved.building, floor: saved.floor, room }; updateLocationStatus(); }
        }
    } catch(e) {}
}

// ============================================================
// STATE PERSISTENCE
// ============================================================
function saveState() { localStorage.setItem("navState", JSON.stringify({ building: currentBuilding, floor: currentFloor })); }

function restoreState() {
    try {
        const s = JSON.parse(localStorage.getItem("navState"));
        if (s?.building && s?.floor && data[s.building]?.[s.floor]) { showRooms(s.building); showFloor(s.building, s.floor); return; }
        if (s?.building && !s?.floor && data[s.building]) { showRooms(s.building); return; }
    } catch(e) {}
    showBuildings();
}

// ============================================================
// CLEAR MAP HELPER
// ============================================================
function clearMap() {
    const fi = document.getElementById("floorImage");
    fi.onload  = null;
    fi.onerror = null;
    fi.src     = "";
    const canvas = document.getElementById("canvas");
    canvas.width  = canvas.width;
    canvas.height = canvas.height;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    canvas.onclick = null;
    grid = [];
    detectedRooms = [];
}

// ============================================================
// NAV: BUILDINGS
// ============================================================
function showBuildings() {
    currentBuilding = null; currentFloor = null; saveState();
    showOverviewImage(CAMPUS_OVERVIEW_IMAGE);

    const list = document.getElementById("buildingList"); list.innerHTML = "";
    Object.keys(data).forEach((b, i) => {
        const item = document.createElement("div"); item.className = "room-item"; item.style.cursor = "pointer";
        item.innerHTML = `<div class="room-number">${i+1}</div><div class="room-info"><div class="room-title">${b} Building</div></div>`;
        item.onclick = () => showRooms(b);
        list.appendChild(item);
    });
    document.getElementById("sidebarTitle").innerHTML = `Buildings <span class="room-count">buildings</span>`;
}

// ============================================================
// NAV: ROOMS/FLOORS
// ============================================================
function showRooms(building) {
    currentBuilding = building;
    currentFloor    = null;
    saveState();

    const bImg = buildingImages[building];
    if (bImg) { showOverviewImage(bImg); } else { clearMap(); }

    const bd = data[building]; if (!bd) return;
    const floors = Object.keys(bd);
    const list = document.getElementById("buildingList"); list.innerHTML = "";

    const back = document.createElement("div"); back.className = "room-item";
    back.style.cssText = "cursor:pointer;background:#eef3f8;border-color:#d0deed;";
    back.innerHTML = `<div class="room-number" style="background:#d0deed;color:#1e3a5f;font-size:1rem;">←</div><div class="room-info"><div class="room-title" style="color:#2b4b6f;font-size:0.9rem;">Back to Buildings</div></div>`;
    back.onclick = () => showBuildings();
    list.appendChild(back);

    floors.forEach((f, i) => {
        const item = document.createElement("div"); item.className = "room-item"; item.style.cursor = "pointer";
        item.setAttribute("data-floor", f);
        const pin = userLocation?.building === building && userLocation?.floor === f ? ' <span style="font-size:0.75rem;">📍</span>' : '';
        item.innerHTML = `<div class="room-number">${i+1}</div><div class="room-info"><div class="room-title">${f}${pin}</div></div>`;
        item.onclick = () => showFloor(building, f);
        list.appendChild(item);
    });

    document.getElementById("sidebarTitle").innerHTML = `${building} <span class="room-count">floors</span>`;
    saveState();
}

// ============================================================
// NAV: FLOOR
// ============================================================
function showFloor(building, floor) {
    currentFloor = floor; saveState();
    const fd = data[building]?.[floor]; if (!fd?.map) return;
    document.querySelectorAll("#buildingList .room-item[data-floor]").forEach(el => { el.style.background = ""; el.style.borderColor = ""; });
    const ae = document.querySelector(`#buildingList .room-item[data-floor="${floor}"]`);
    if (ae) { ae.style.background = "#e6f0fb"; ae.style.borderColor = "#a8c8f0"; }

    const fi = document.getElementById("floorImage");
    fi.onload  = null;
    fi.onerror = null;
    fi.src     = "";
    fi.style.objectFit = "fill";
    fi.src = fd.map;

    fi.onload = function() {
        const mc = document.getElementById("mapContainer");
        const cv = document.getElementById("canvas");
        cv.width  = mc.clientWidth;
        cv.height = mc.clientHeight;
        cv.getContext("2d").clearRect(0, 0, cv.width, cv.height);
        drawRooms(building, floor);
    };
    if (fi.complete && fi.naturalWidth > 0) fi.onload();

    if (!activeRoute) loadGrid(building, floor);
}

function closeRoom() { document.getElementById("roomOverlay").style.display = "none"; }
function onOpenCvReady() { console.log("✅ OpenCV ready"); }

// ============================================================
// GRID
// ============================================================
function loadGrid(building, floor) {
    const base = floor.replace(/ /g, "_");
    const file1 = `grids/${building}_${base}.json`;
    const file2 = `grids/${building.toUpperCase()}_${base}.json`;
    return fetch(file1)
        .then(r => r.ok ? r : fetch(file2))
        .then(r => { if (!r.ok) throw new Error("not found"); return r.json(); })
        .then(j => { grid = j.grid; detectedRooms = j.rooms; })
        .catch(() => { grid = []; detectedRooms = []; });
}

// ============================================================
// DRAW ROOMS
// ============================================================
function drawRooms(building, floor) {
    const canvas = document.getElementById("canvas");
    const ctx    = canvas.getContext("2d");
    const mc     = document.getElementById("mapContainer");
    canvas.width  = mc.clientWidth;
    canvas.height = mc.clientHeight;
    const fd    = data[building][floor];
    const rooms = fd.rooms;
    const SP    = getEffectiveStartingPoint(building, floor, fd);
    const sX    = canvas.width / 1024;
    const sY    = canvas.height / 768;
    rooms.forEach(r => { r.scaled = { x: r.x1*sX, y: r.y1*sY, w: (r.x2-r.x1)*sX, h: (r.y2-r.y1)*sY }; });

    function redraw(hl) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (userLocation?.building === building && userLocation?.floor === floor) {
            const r  = userLocation.room;
            const sx = r.x1 * sX, sy = r.y1 * sY, sw = (r.x2 - r.x1) * sX, sh = (r.y2 - r.y1) * sY;
            ctx.fillStyle = "rgba(34,197,94,0.12)"; ctx.fillRect(sx, sy, sw, sh);
            ctx.strokeStyle = "#16a34a"; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); ctx.strokeRect(sx, sy, sw, sh); ctx.setLineDash([]);
            ctx.fillStyle = "#16a34a"; ctx.font = "bold 10px Inter,sans-serif"; ctx.textAlign = "center";
            ctx.fillText("YOU ARE HERE", sx + sw / 2, sy - 4); ctx.textAlign = "left";
        }
        rooms.forEach(r => {
            ctx.strokeStyle = "rgba(0,100,220,0.45)"; ctx.lineWidth = 1.5; ctx.setLineDash([]); ctx.strokeRect(r.scaled.x, r.scaled.y, r.scaled.w, r.scaled.h);
        });
        if (hl) { ctx.fillStyle = "rgba(0,120,255,0.18)"; ctx.fillRect(hl.scaled.x, hl.scaled.y, hl.scaled.w, hl.scaled.h); }
    }

    redraw(null);
    canvas.onclick = function(e) {
        const rect = canvas.getBoundingClientRect();
        const mx   = e.clientX - rect.left;
        const my   = e.clientY - rect.top;
        let hit = null;
        for (let i = 0; i < rooms.length; i++) {
            const r = rooms[i].scaled;
            if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) { hit = rooms[i]; break; }
        }
        if (!hit) { redraw(null); return; }
        redraw(hit);
        if (hit.img) showRoom(hit.img);
        if (userLocation && !(userLocation.building === building && userLocation.floor === floor && userLocation.room.name === hit.name)) {
            if (userLocation.building !== building || userLocation.floor !== floor) {
                const steps = buildRoute(building, floor, hit);
                if (steps?.length > 0) { showRoutePanel(steps, hit); return; }
            }
        }
        drawPath(ctx, hit.scaled, SP, sX, sY, false);
    };
}

// ============================================================
// PATHFINDING
// ============================================================
function findNearestWalkable(g, p, radius = 30) {
    const rows = g.length, cols = g[0].length;
    const cp = {
        x: Math.max(0, Math.min(cols - 1, Math.round(p.x))),
        y: Math.max(0, Math.min(rows - 1, Math.round(p.y)))
    };
    if (g[cp.y][cp.x] === 0) return cp;
    for (let r = 1; r <= radius; r++) {
        for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {
                if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
                const nx = cp.x + dx, ny = cp.y + dy;
                if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && g[ny][nx] === 0) return { x: nx, y: ny };
            }
        }
    }
    return cp;
}

function findPath(g, start, end) {
    const rows = g.length, cols = g[0].length;
    if (!g[start.y] || !g[end.y]) return [];
    if (g[start.y][start.x] !== 0 || g[end.y][end.x] !== 0) return [];
    const open = [], cf = {};
    const gs = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const fs = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const key = p => `${p.x},${p.y}`;
    gs[start.y][start.x] = 0;
    fs[start.y][start.x] = Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
    open.push(start);
    let it = 0;
    while (open.length > 0) {
        if (++it > 50000) return [];
        open.sort((a, b) => fs[a.y][a.x] - fs[b.y][b.x]);
        const cur = open.shift();
        if (cur.x === end.x && cur.y === end.y) {
            const p = [cur]; let c = cur;
            while (cf[key(c)]) { c = cf[key(c)]; p.unshift(c); }
            return p;
        }
        [{ x:1,y:0 }, { x:-1,y:0 }, { x:0,y:1 }, { x:0,y:-1 }].forEach(d => {
            const nx = cur.x + d.x, ny = cur.y + d.y;
            if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && g[ny][nx] === 0) {
                const tg = gs[cur.y][cur.x] + 1;
                if (tg < gs[ny][nx]) {
                    cf[key({ x:nx, y:ny })] = cur;
                    gs[ny][nx] = tg;
                    fs[ny][nx] = tg + Math.abs(nx - end.x) + Math.abs(ny - end.y);
                    if (!open.find(p => p.x === nx && p.y === ny)) open.push({ x:nx, y:ny });
                }
            }
        });
    }
    return [];
}

// ============================================================
// DRAW PATH
// ============================================================
function drawPath(ctx, room, SP, scaleX, scaleY, isRoute = false) {
    const sx = ((SP.x1 + SP.x2) / 2) * scaleX;
    const sy = ((SP.y1 + SP.y2) / 2) * scaleY;
    const ex = room.x + room.w / 2;
    const ey = room.y + room.h / 2;

    let pathDrawn = false;

    if (grid && grid.length > 0 && grid[0] && grid[0].length > 0) {
        const rows = grid.length;
        const cols = grid[0].length;
        const cW = ctx.canvas.width  / cols;
        const cH = ctx.canvas.height / rows;
        const clamp = (v, max) => Math.max(0, Math.min(max - 1, Math.floor(v)));
        const startGridX = clamp(sx / cW, cols);
        const startGridY = clamp(sy / cH, rows);
        const endGridX   = clamp(ex / cW, cols);
        const endGridY   = clamp(ey / cH, rows);
        const ss = findNearestWalkable(grid, { x: startGridX, y: startGridY });
        const se = findNearestWalkable(grid, { x: endGridX,   y: endGridY   });
        const path = findPath(grid, ss, se);
        if (path.length > 1) {
            ctx.setLineDash([]);
            ctx.strokeStyle = "#22c55e"; ctx.lineWidth = 3; ctx.lineJoin = "round"; ctx.lineCap = "round";
            ctx.beginPath();
            path.forEach((p, i) => {
                const px = p.x * cW + cW / 2;
                const py = p.y * cH + cH / 2;
                i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
            });
            ctx.stroke();
            if (path.length >= 2) {
                const last = path[path.length - 1];
                const prev = path[path.length - 2];
                const angle = Math.atan2(last.y - prev.y, last.x - prev.x);
                arrowHead(ctx, last.x * cW + cW / 2, last.y * cH + cH / 2, angle, "#22c55e");
            }
            pathDrawn = true;
        }
    }

    if (!pathDrawn) { fallbackPath(ctx, sx, sy, ex, ey); }

    ctx.beginPath();
    ctx.arc(sx, sy, 8, 0, Math.PI * 2);
    ctx.fillStyle   = (userLocation && !isRoute) ? "#f59e0b" : "#16a34a";
    ctx.fill();
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 2.5; ctx.setLineDash([]); ctx.stroke();
    ctx.fillStyle = (userLocation && !isRoute) ? "#78350f" : "#14532d";
    ctx.font = "bold 9px Inter,sans-serif"; ctx.textAlign = "center";
    ctx.fillText(userLocation && !isRoute ? "YOU" : "START", sx, sy - 13);
    ctx.textAlign = "left";

    ctx.beginPath();
    ctx.arc(ex, ey, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#2563eb"; ctx.fill();
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
}

function fallbackPath(ctx, sx, sy, ex, ey) {
    ctx.setLineDash([8, 5]);
    ctx.strokeStyle = "#2563eb"; ctx.lineWidth = 3; ctx.lineJoin = "round"; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.setLineDash([]);
    arrowHead(ctx, ex, ey, Math.atan2(ey - sy, ex - sx), "#2563eb");
}

function arrowHead(ctx, x, y, angle, color) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(angle); ctx.setLineDash([]);
    ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-12, -6); ctx.lineTo(-12, 6); ctx.closePath(); ctx.fill();
    ctx.restore();
}

function showRoom(img) {
    if (!img) return;
    document.getElementById("roomImg").src = img;
    document.getElementById("roomOverlay").style.display = "flex";
}

// ============================================================
// SEARCH
// ============================================================
function buildSearchIndex() {
    const idx = [];
    Object.keys(data).forEach(b => {
        idx.push({ type: "building", label: `${b} Building`, building: b, floor: null, room: null });
        Object.keys(data[b]).forEach(f => {
            idx.push({ type: "floor", label: `${b} – ${f}`, building: b, floor: f, room: null });
            (data[b][f].rooms || []).forEach(r => idx.push({ type: "room", label: `${r.name} (${b} ${f})`, building: b, floor: f, room: r }));
        });
    });
    return idx;
}

function handleSearch(q) {
    const dd = document.getElementById("searchDropdown"); dd.innerHTML = "";
    const v  = q.trim().toLowerCase(); if (!v) { dd.style.display = "none"; return; }
    const res = buildSearchIndex().filter(i => i.label.toLowerCase().includes(v)).slice(0, 10);
    if (!res.length) { dd.innerHTML = `<div class="search-no-result">No results found</div>`; dd.style.display = "block"; return; }
    res.forEach(item => {
        const el   = document.createElement("div"); el.className = "search-result-item";
        const icon = item.type === "building" ? "🏢" : item.type === "floor" ? "🏗️" : "🚪";
        el.innerHTML = `<span style="font-size:1rem;flex-shrink:0">${icon}</span><span style="flex:1">${item.label}</span>`;
        el.onclick = () => { document.getElementById("searchInput").value = ""; dd.style.display = "none"; navigateToResult(item); };
        dd.appendChild(el);
    });
    dd.style.display = "block";
}

function navigateToResult(item) {
    if (item.type === "building") { showRooms(item.building); return; }
    showRooms(item.building); showFloor(item.building, item.floor);
    if (item.type === "room" && item.room) {
        if (userLocation && (userLocation.building !== item.building || userLocation.floor !== item.floor)) {
            const steps = buildRoute(item.building, item.floor, item.room);
            if (steps?.length > 0) { showRoutePanel(steps, item.room); return; }
        }
        const fi = document.getElementById("floorImage");
        const doHL = () => {
            const cv  = document.getElementById("canvas");
            const ctx = cv.getContext("2d");
            const sX  = cv.width / 1024, sY = cv.height / 768;
            const fd  = data[item.building][item.floor];
            const r   = item.room;
            const sc  = { x: r.x1*sX, y: r.y1*sY, w: (r.x2-r.x1)*sX, h: (r.y2-r.y1)*sY };
            ctx.clearRect(0, 0, cv.width, cv.height);
            fd.rooms.forEach(rr => {
                rr.scaled = { x: rr.x1*sX, y: rr.y1*sY, w: (rr.x2-rr.x1)*sX, h: (rr.y2-rr.y1)*sY };
                ctx.strokeStyle = "rgba(0,100,220,0.4)"; ctx.lineWidth = 1.5; ctx.setLineDash([]); ctx.strokeRect(rr.scaled.x, rr.scaled.y, rr.scaled.w, rr.scaled.h);
            });
            ctx.fillStyle   = "rgba(249,115,22,0.25)"; ctx.fillRect(sc.x, sc.y, sc.w, sc.h);
            ctx.strokeStyle = "rgba(249,115,22,0.9)"; ctx.lineWidth = 2.5; ctx.setLineDash([]); ctx.strokeRect(sc.x, sc.y, sc.w, sc.h);
            r.scaled = sc;
            drawPath(ctx, sc, getEffectiveStartingPoint(item.building, item.floor, fd), sX, sY, false);
            if (r.img) showRoom(r.img);
        };
        if (fi.complete && fi.naturalWidth > 0) setTimeout(doHL, 80);
        else fi.addEventListener("load", () => setTimeout(doHL, 80), { once: true });
    }
}

// ============================================================
// DOM READY
// ============================================================
document.addEventListener("DOMContentLoaded", function() {
    localStorage.removeItem("navState");

    document.getElementById("roomOverlay").addEventListener("click", e => { if (e.target.id === "roomOverlay") closeRoom(); });
    document.getElementById("locationModal").addEventListener("click", e => { if (e.target === document.getElementById("locationModal")) closeLocationModal(); });
    const si = document.getElementById("searchInput");
    si.addEventListener("input", () => handleSearch(si.value));
    document.addEventListener("click", e => { if (!e.target.closest(".search-wrapper")) document.getElementById("searchDropdown").style.display = "none"; });
    si.addEventListener("keydown", e => { if (e.key === "Escape") { document.getElementById("searchDropdown").style.display = "none"; si.blur(); } });
    restoreUserLocation();
    restoreState();
});