function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorLine(p1X, p1Y, p2X, p2Y, lineColor) {
  canvasContext.beginPath();
  canvasContext.moveTo(p1X, p1Y);
  canvasContext.lineTo(p2X, p2Y);
  canvasContext.strokeStyle = lineColor;
  canvasContext.stroke();
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}
  
function colorText(showWords, textX, textY, fontSize, fillColor) {
	canvasContext.font = font = fontSize + "px Arial";
	  canvasContext.fillStyle = fillColor;
	  canvasContext.fillText(showWords, textX, textY);
  }
function drawBitmapCenteredAtLocationWithRotation(graphic,atX,atY,withAngle,alpha) {
  if (!graphic) return;
  canvasContext.save(); // allows us to undo translate movement and rotate spin
  canvasContext.translate(atX,atY); // sets the point where our graphic will go
  canvasContext.rotate(withAngle); // sets the rotation
  if (alpha!=undefined) canvasContext.globalAlpha = alpha;
  canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
  if (alpha!=undefined) canvasContext.globalAlpha = 1;
  canvasContext.restore(); // undo the translation movement and rotation since save()
}

function mapRectOutline(topLeftX, topLeftY, boxWidth, boxHeight, strokeColor) {
	canvasContext.strokeStyle = strokeColor;
	canvasContext.strokeRect(topLeftX+2, topLeftY+2, boxWidth-4, boxHeight-4);
}
function mapRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	miniMapCanvasContext.fillStyle = fillColor;
	miniMapCanvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}