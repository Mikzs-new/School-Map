const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const popup = document.getElementById("popup");
const roomImage = document.getElementById("roomImage");

/* USER LOCATION (CHANGE THIS) */
const user = {x:100, y:250};

/* ROOMS DATA */
const rooms = {
  admission: {
    x:(495+569)/2,
    y:(272+402)/2,
    img:"SchoolPicture/EMM 205 - Admission Office.jpg"
  
  },

  alumni: {
    x:(646+738)/2,
    y:(268+400)/2,
    img:"SchoolPicture/EMM 207 - Alumni Office.jpg"
  
  }
};

/* CLICK FUNCTION */
window.goToRoom = function(room){

  console.log("Clicked:", room); // DEBUG

  let r = rooms[room];

  if(!r){
    alert("Room not found!");
    return;
  }

  roomImage.src = r.img;
  popup.style.display = "block";

  drawPath(user.x,user.y,r.x,r.y);
}
/* DRAW NAVIGATION PATH */
function drawPath(x1,y1,x2,y2){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  const hallwayY = (404 + 451) / 2;

  ctx.beginPath();
  ctx.setLineDash([10,5]);

  ctx.moveTo(x1, hallwayY);

  /* MOVE STRAIGHT IN HALLWAY */
  ctx.lineTo(x2, hallwayY);

  /* GO UP/DOWN INTO ROOM */
  ctx.lineTo(x2, y2);

  ctx.strokeStyle="blue";
  ctx.lineWidth=4;
  ctx.stroke();

  drawArrowHead(x2, hallwayY, x2, y2);
}
/* ARROW HEAD */
function drawArrowHead(x1,y1,x2,y2){

  let angle = Math.atan2(y2-y1, x2-x1);
  let size = 10;

  ctx.beginPath();
  ctx.moveTo(x2,y2);

  ctx.lineTo(
    x2 - size*Math.cos(angle - Math.PI/6),
    y2 - size*Math.sin(angle - Math.PI/6)
  );

  ctx.lineTo(
    x2 - size*Math.cos(angle + Math.PI/6),
    y2 - size*Math.sin(angle + Math.PI/6)
  );

  ctx.closePath();
  ctx.fillStyle="blue";
  ctx.fill();
}