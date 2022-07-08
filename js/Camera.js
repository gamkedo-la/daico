var cameraPanX = 0;
var cameraPanY = 0;
var zoomLevel = 1.5;

function cameraEnforceBounds() {
	var cameraRightBoundary = ROOM_COLS * TILE_W - canvas.width;
	var cameraBottomBoundary = ROOM_ROWS * TILE_H - canvas.height + 50;
	if (cameraPanX < 0) {
		cameraPanX = 0;
	}
	if (cameraPanX > cameraRightBoundary) {
		cameraPanX = cameraRightBoundary;
	}
	if (cameraPanY < 0) {
		cameraPanY = 0;
	}
	if (cameraPanY > cameraBottomBoundary) {
		cameraPanY = cameraBottomBoundary;
	}
}

function cameraPan() {
	var cameraPanXWas = cameraPanX;
	var cameraPanYWas = cameraPanY;
	var cameraSmooth = 0.05;
	var cameraSmoothInverse = 1.0-cameraSmooth;
	cameraPanX = (p1.x - canvas.width/2) * cameraSmooth + cameraPanX *cameraSmoothInverse;
	cameraPanY = (p1.y - canvas.height/2) * cameraSmooth + cameraPanY *cameraSmoothInverse;
	cameraEnforceBounds();

    
	canvasContext.save();
	if (!editorMode) {
		canvasContext.translate(Math.floor(-cameraPanX), Math.floor(-cameraPanY));
		canvasContext.translate(Math.floor(p1.x), Math.floor(p1.y));
		canvasContext.scale(zoomLevel, zoomLevel);
		canvasContext.translate(Math.floor(-p1.x), Math.floor(-p1.y));
	}
}

function endCameraPan() {
    canvasContext.restore();
} 

